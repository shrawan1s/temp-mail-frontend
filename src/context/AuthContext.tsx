'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useTheme } from 'next-themes';
import { authApi, tokenStorage } from '@/lib/auth';
import { IAuthContextType } from '@/interfaces';
import { IUser } from '@/interfaces';

const AuthContext = createContext<IAuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<IUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { setTheme } = useTheme();

    const isAuthenticated = !!user;

    const syncSettings = useCallback(async () => {
        try {
            const response = await authApi.getSettings();
            if (response.success && response.data?.settings) {
                if (response.data.settings.dark_mode !== undefined) {
                    setTheme(response.data.settings.dark_mode ? 'dark' : 'light');
                }
            }
        } catch (error) {
            console.error('Failed to sync settings:', error);
        }
    }, [setTheme]);

    const login = async (accessToken: string, refreshToken: string, userData: IUser) => {
        tokenStorage.setTokens(accessToken, refreshToken);
        setUser(userData);
        await syncSettings();
    };

    const logout = async () => {
        try {
            await authApi.logout();
        } catch {
            // Ignore error, clear tokens anyway
        }
        tokenStorage.clearTokens();
        setUser(null);
    };

    const refreshUser = async () => {
        if (!tokenStorage.hasTokens()) {
            setUser(null);
            return;
        }

        try {
            const response = await authApi.getMe();
            if (response.success && response.data?.user) {
                setUser(response.data?.user);
            } else {
                tokenStorage.clearTokens();
                setUser(null);
            }
        } catch {
            tokenStorage.clearTokens();
            setUser(null);
        }
    };

    // Check auth status on mount
    useEffect(() => {
        const initAuth = async () => {
            setIsLoading(true);
            await refreshUser();
            setIsLoading(false);
        };
        initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                isLoading,
                login,
                logout,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
