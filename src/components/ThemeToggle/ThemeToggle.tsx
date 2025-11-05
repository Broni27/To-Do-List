import { useTodoStore } from '../../store/todoStore';
import styles from '../../styles/ThemeToggle.module.css';

const ThemeToggle = () => {
  const theme = useTodoStore((state) => state.theme);
  const toggleTheme = useTodoStore((state) => state.toggleTheme);

  return (
    <button
      onClick={toggleTheme}
      className={styles.themeToggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      <span className={styles.icon}>{theme === 'light' ? '🌙' : '☀️'}</span>
    </button>
  );
};

export default ThemeToggle;

