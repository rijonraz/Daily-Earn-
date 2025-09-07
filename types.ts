export interface TelegramUser {
  id: number;
  is_bot?: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  photo_url?: string;
}

export interface WebAppInitData {
  user?: TelegramUser;
}

export interface ThemeParams {
  bg_color?: string;
  text_color?: string;
  hint_color?: string;
  link_color?: string;
  button_color?: string;
  button_text_color?: string;
  secondary_bg_color?: string;
}

export interface HapticFeedback {
  notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
  selectionChanged: () => void;
}

export interface WebApp {
  initDataUnsafe: WebAppInitData;
  themeParams: ThemeParams;
  ready: () => void;
  expand: () => void;
  close: () => void;
  HapticFeedback: HapticFeedback;
}

export type View = 'tasks' | 'profile';