'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi, tokenStorage } from '@/lib/auth';
import { IAuthContextType } from '@/interfaces';
import { IUser } from '@/interfaces';

const AuthContext = createContext<IAuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<IUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const isAuthenticated = !!user;

    const login = (accessToken: string, refreshToken: string, userData: IUser) => {
        tokenStorage.setTokens(accessToken, refreshToken);
        setUser(userData);
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
