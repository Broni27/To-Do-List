import { useTodoStore } from '../../store/todoStore';
import styles from '../../styles/SearchBar.module.css';

const SearchBar = () => {
  const searchQuery = useTodoStore((state) => state.searchQuery);
  const setSearchQuery = useTodoStore((state) => state.setSearchQuery);

  return (
    <div className={styles.searchBar}>
      <input
        type="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search todos..."
        className={styles.input}
        aria-label="Search todos"
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          className={styles.clearButton}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SearchBar;

