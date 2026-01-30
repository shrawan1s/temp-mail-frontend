import { IApiResponse } from './api.interface';

export interface IUser {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  plan: string;
  created_at: string;
  updated_at: string;
}

export interface IRegisterData {
  user_id?: string;
}

export interface IAuthData {
  access_token?: string;
  refresh_token?: string;
  user?: IUser;
  user_id?: string;
}

export interface IUserData {
  user: IUser;
}

export interface IUserSettings {
  dark_mode: boolean;
  auto_refresh: boolean;
  email_expiry: string;
  notifications: boolean;
  blocked_senders: string[];
}

export interface ISettingsData {
  settings: IUserSettings;
}

// Responses
export type IRegisterResponse = IApiResponse<IRegisterData | null>;
export type IAuthResponse = IApiResponse<IAuthData | null>;
export type ISimpleResponse = IApiResponse<null>;
export type IUserResponse = IApiResponse<IAuthData | null>; 

export type IUserResponseTyped = IApiResponse<IUserData | null>;

export type ISettingsResponse = IApiResponse<ISettingsData>;
