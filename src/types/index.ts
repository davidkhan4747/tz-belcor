// Command types
export type Command = 'Л' | 'П' | 'В' | 'Н' | 'О' | 'Б';

// Position interface
export interface Position {
  x: number;
  y: number;
}

// Sample interface
export interface Sample {
  id: string;
  position: Position;
  isPickedUp: boolean;
}

// Command history interface
export interface CommandHistory {
  id: string;
  originalCommand: string;
  optimizedCommand: string;
  date: string;
  samplesBeforeState: Sample[];
  samplesAfterState: Sample[];
}

// User interface
export interface User {
  username: string;
  isAuthenticated: boolean;
}

// Auth credentials
export const AUTH_CREDENTIALS = {
  username: 'admin',
  password: 'admin'
};
