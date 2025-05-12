// Типы для манипулятора
export type Command = 'Л' | 'П' | 'В' | 'Н' | 'О' | 'Б';

export interface Position {
  x: number;
  y: number;
}

export interface Sample {
  id: string;
  position: Position;
  isPickedUp: boolean;
}

export interface ManipulatorState {
  position: Position;
  samples: Sample[];
  animationSpeed: number;
  isHoldingSample: boolean;
}

// Типы для пользователя
export interface User {
  username: string;
  isAuthenticated: boolean;
}

// Константа с учетными данными для авторизации
export const AUTH_CREDENTIALS = {
  username: 'admin',
  password: 'admin'
};

// Типы для истории
export interface CommandHistory {
  id: string;
  originalCommand: string;
  optimizedCommand: string;
  date: string;
  samplesBeforeState: Sample[];
  samplesAfterState: Sample[];
}

// Типы для форм
export interface CommandFormInputs {
  commandString: string;
}

export interface LoginFormInputs {
  username: string;
  password: string;
}
