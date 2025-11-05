import { useState, KeyboardEvent, useRef, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useTodoStore } from '../../store/todoStore';
import type { Todo } from '../../types/todo';
import styles from '../../styles/TodoItem.module.css';
import clsx from 'clsx';

interface TodoItemProps {
  todo: Todo;
  index: number;
}

const TodoItem = ({ todo, index }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editDescription, setEditDescription] = useState(todo.description);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const updateTodo = useTodoStore((state) => state.updateTodo);

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(todo.text);
    setEditDescription(todo.description);
  };

  const editContainerRef = useRef<HTMLDivElement>(null);

  const handleSave = () => {
    if (editText.trim()) {
      updateTodo(todo.id, editText, editDescription);
    } else {
      setEditText(todo.text);
      setEditDescription(todo.description);
    }
    setIsEditing(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isEditing &&
        editContainerRef.current &&
        !editContainerRef.current.contains(event.target as Node)
      ) {
        handleSave();
      }
    };

    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing]);

  const handleCancel = () => {
    setEditText(todo.text);
    setEditDescription(todo.description);
    setIsEditing(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided, snapshot) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={clsx(styles.todoItem, {
            [styles.completed]: todo.completed,
            [styles.dragging]: snapshot.isDragging,
          })}
        >
          <div className={styles.content}>
            <div className={styles.dragHandle} {...provided.dragHandleProps}>
              <span className={styles.dragIcon} aria-hidden="true">
                ⋮⋮
              </span>
            </div>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className={styles.checkbox}
              aria-label={`Toggle ${todo.text}`}
            />
            {isEditing ? (
              <div ref={editContainerRef} className={styles.editContainer}>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className={styles.editInput}
                  autoFocus
                  aria-label="Edit todo title"
                  placeholder="Todo title"
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className={styles.editDescription}
                  aria-label="Edit todo description"
                  placeholder="Description (optional)"
                  rows={2}
                />
                <div className={styles.editActions}>
                  <button
                    type="button"
                    onClick={handleSave}
                    className={styles.saveButton}
                    aria-label="Save changes"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className={styles.cancelButton}
                    aria-label="Cancel editing"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className={styles.textContainer}>
                <span
                  className={styles.text}
                  onDoubleClick={handleEdit}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleEdit();
                    }
                  }}
                  aria-label={`Edit ${todo.text}`}
                >
                  {todo.text}
                </span>
                {todo.description && (
                  <p className={styles.description}>{todo.description}</p>
                )}
              </div>
            )}
          </div>
          <div className={styles.actions}>
            {!isEditing && (
              <>
                <button
                  onClick={handleEdit}
                  className={styles.editButton}
                  aria-label={`Edit ${todo.text}`}
                >
                  ✏️
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className={styles.deleteButton}
                  aria-label={`Delete ${todo.text}`}
                >
                  🗑️
                </button>
              </>
            )}
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default TodoItem;

