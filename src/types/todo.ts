export interface Todo {
  id: string;
  text: string;
  description: string;
  completed: boolean;
  createdAt: number;
  order: number;
}

export type FilterType = 'all' | 'active' | 'completed';

export type Theme = 'light' | 'dark';

