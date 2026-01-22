export interface IUser {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  plan: string;
  created_at: string;
  updated_at: string;
}

export interface IRegisterResponse {
  success: boolean;
  message: string;
  user_id?: string;
}

export interface IAuthResponse {
  success: boolean;
  message: string;
  access_token?: string;
  refresh_token?: string;
  user?: IUser;
}

export interface ISimpleResponse {
  success: boolean;
  message: string;
}

export interface IUserResponse {
  success: boolean;
  message: string;
  user?: IUser;
}

// Settings interfaces
export interface IUserSettings {
  dark_mode: boolean;
  auto_refresh: boolean;
  email_expiry: string;
  notifications: boolean;
  blocked_senders: string[];
}

export interface ISettingsResponse {
  success: boolean;
  message: string;
  settings?: IUserSettings;
}
