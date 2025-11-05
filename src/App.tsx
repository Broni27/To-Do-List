import { useEffect } from 'react';
import { useTodoStore } from './store/todoStore';
import Header from './components/Header/Header';
import TodoInput from './components/TodoInput/TodoInput';
import TodoList from './components/TodoList/TodoList';
import FilterBar from './components/FilterBar/FilterBar';
import SearchBar from './components/SearchBar/SearchBar';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import styles from './styles/App.module.css';

function App() {
  const theme = useTodoStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <Header />
        <div className={styles.controls}>
          <div className={styles.controlsRow}>
            <SearchBar />
            <ThemeToggle />
          </div>
          <TodoInput />
          <FilterBar />
        </div>
        <TodoList />
      </div>
    </div>
  );
}

export default App;

