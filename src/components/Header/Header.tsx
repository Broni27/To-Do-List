import styles from '../../styles/Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>To-Do App</h1>
      <p className={styles.subtitle}>Stay organized and productive</p>
    </header>
  );
};

export default Header;

