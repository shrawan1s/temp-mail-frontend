import { IUser } from "@/interfaces";

export interface IAuthContextType {
    user: IUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (accessToken: string, refreshToken: string, user: IUser) => Promise<void>;
    logout: () => void;
    refreshUser: () => Promise<void>;
}