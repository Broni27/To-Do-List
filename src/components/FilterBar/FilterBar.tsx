import { useTodoStore } from '../../store/todoStore';
import type { FilterType } from '../../types/todo';
import styles from '../../styles/FilterBar.module.css';

const FilterBar = () => {
  const filter = useTodoStore((state) => state.filter);
  const setFilter = useTodoStore((state) => state.setFilter);
  const todos = useTodoStore((state) => state.todos);
  const clearCompleted = useTodoStore((state) => state.clearCompleted);

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  const filters: FilterType[] = ['all', 'active', 'completed'];

  return (
    <div className={styles.filterBar}>
      <div className={styles.filters}>
        {filters.map((filterType) => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={`${styles.filterButton} ${
              filter === filterType ? styles.active : ''
            }`}
            aria-pressed={filter === filterType}
            aria-label={`Filter ${filterType} todos`}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          </button>
        ))}
      </div>
      <div className={styles.stats}>
        <span className={styles.stat}>
          Active: <strong>{activeCount}</strong>
        </span>
        <span className={styles.stat}>
          Completed: <strong>{completedCount}</strong>
        </span>
        {completedCount > 0 && (
          <button
            onClick={clearCompleted}
            className={styles.clearButton}
            aria-label="Clear completed todos"
          >
            Clear Completed
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;

