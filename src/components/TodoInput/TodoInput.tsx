import { useState, FormEvent } from 'react';
import { useTodoStore } from '../../store/todoStore';
import styles from '../../styles/TodoInput.module.css';

const TodoInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addTodo(inputValue, descriptionValue);
      setInputValue('');
      setDescriptionValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputs}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What needs to be done?"
          className={styles.input}
          aria-label="Todo title"
          required
        />
        <textarea
          value={descriptionValue}
          onChange={(e) => setDescriptionValue(e.target.value)}
          placeholder="Add description (optional)"
          className={styles.textarea}
          aria-label="Todo description"
          rows={2}
        />
      </div>
      <button
        type="submit"
        className={styles.button}
        aria-label="Add todo"
        disabled={!inputValue.trim()}
      >
        Add
      </button>
    </form>
  );
};

export default TodoInput;

