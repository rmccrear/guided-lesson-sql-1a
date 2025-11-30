export interface SqlResult {
  columns: string[];
  values: any[][];
  error?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  instructions: string;
  initialQuery: string;
  expectedResultPattern?: RegExp; // Simple validation for demo
  hint: string;
  solution: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

// Global augmentation for SQL.js loaded via script tag
declare global {
  interface Window {
    initSqlJs: (config?: any) => Promise<any>;
  }
}