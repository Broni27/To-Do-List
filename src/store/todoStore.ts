import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Todo, FilterType, Theme } from '../types/todo';

interface TodoStore {
  todos: Todo[];
  filter: FilterType;
  searchQuery: string;
  theme: Theme;
  addTodo: (text: string, description?: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, text: string, description?: string) => void;
  setFilter: (filter: FilterType) => void;
  setSearchQuery: (query: string) => void;
  clearCompleted: () => void;
  reorderTodos: (startIndex: number, endIndex: number) => void;
  toggleTheme: () => void;
  getFilteredTodos: () => Todo[];
}

const STORAGE_KEY = 'todo-app-storage';

export const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      todos: [],
      filter: 'all',
      searchQuery: '',
      theme: 'light',

      addTodo: (text: string, description: string = '') => {
        const activeTodos = get().todos.filter((todo) => !todo.completed);
        const newTodo: Todo = {
          id: crypto.randomUUID(),
          text: text.trim(),
          description: description.trim(),
          completed: false,
          createdAt: Date.now(),
          order: activeTodos.length,
        };
        set((state) => {
          // Separate active and completed todos
          const active = state.todos.filter((todo) => !todo.completed);
          const completed = state.todos.filter((todo) => todo.completed);
          // Add new todo to active todos
          return {
            todos: [...active, newTodo, ...completed],
          };
        });
      },

      toggleTodo: (id: string) => {
        set((state) => {
          const updatedTodos = state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          );
          // Separate active and completed todos, move completed to end
          const active = updatedTodos.filter((todo) => !todo.completed);
          const completed = updatedTodos.filter((todo) => todo.completed);
          // Reorder todos: active first, then completed
          const reordered = [...active, ...completed].map((todo, index) => ({
            ...todo,
            order: index,
          }));
          return { todos: reordered };
        });
      },

      deleteTodo: (id: string) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }));
      },

      updateTodo: (id: string, text: string, description?: string) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? {
                  ...todo,
                  text: text.trim(),
                  description: description !== undefined ? description.trim() : todo.description,
                }
              : todo
          ),
        }));
      },

      setFilter: (filter: FilterType) => {
        set({ filter });
      },

      setSearchQuery: (query: string) => {
        set({ searchQuery: query });
      },

      clearCompleted: () => {
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed),
        }));
      },

      reorderTodos: (startIndex: number, endIndex: number) => {
        const { todos, filter, searchQuery } = get();
        
        // Only allow drag & drop when viewing all todos without search
        if (filter !== 'all' || searchQuery.trim()) {
          return;
        }
        
        // Get filtered todos (which already has completed at end)
        const filtered = get().getFilteredTodos();
        
        // Reorder within the filtered list
        const reordered = Array.from(filtered);
        const [removed] = reordered.splice(startIndex, 1);
        reordered.splice(endIndex, 0, removed);
        
        // Update order property for all todos
        const reorderedTodos = reordered.map((todo, index) => ({
          ...todo,
          order: index,
        }));
        
        set({ todos: reorderedTodos });
      },

      toggleTheme: () => {
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        }));
      },

      getFilteredTodos: () => {
        const { todos, filter, searchQuery } = get();
        let filtered = todos;

        // Apply search filter (search in both text and description)
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          filtered = filtered.filter(
            (todo) =>
              todo.text.toLowerCase().includes(query) ||
              todo.description.toLowerCase().includes(query)
          );
        }

        // Apply status filter
        if (filter === 'active') {
          filtered = filtered.filter((todo) => !todo.completed);
        } else if (filter === 'completed') {
          filtered = filtered.filter((todo) => todo.completed);
        }

        // Sort: active todos by order, then completed todos by order
        // Completed todos always go to the end
        return filtered.sort((a, b) => {
          if (a.completed !== b.completed) {
            return a.completed ? 1 : -1;
          }
          return a.order - b.order;
        });
      },
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        todos: state.todos,
        theme: state.theme,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Migrate todos on load
          state.todos = state.todos.map((todo) => ({
            ...todo,
            description: todo.description || '',
          }));
        }
      },
    }
  )
);

