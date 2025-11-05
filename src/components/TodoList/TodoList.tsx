import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useTodoStore } from '../../store/todoStore';
import TodoItem from '../TodoItem/TodoItem';
import styles from '../../styles/TodoList.module.css';

const TodoList = () => {
  const filteredTodos = useTodoStore((state) => state.getFilteredTodos());
  const reorderTodos = useTodoStore((state) => state.reorderTodos);
  const filter = useTodoStore((state) => state.filter);
  const searchQuery = useTodoStore((state) => state.searchQuery);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    // Only allow drag and drop when viewing all todos without search
    // Otherwise, reordering would be confusing with filtered/searched results
    if (filter !== 'all' || searchQuery.trim()) {
      return;
    }

    if (sourceIndex !== destinationIndex) {
      reorderTodos(sourceIndex, destinationIndex);
    }
  };

  if (filteredTodos.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyText}>No todos found</p>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="todos">
        {(provided, snapshot) => (
          <ul
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`${styles.todoList} ${
              snapshot.isDraggingOver ? styles.draggingOver : ''
            }`}
          >
            {filteredTodos.map((todo, index) => (
              <TodoItem key={todo.id} todo={todo} index={index} />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoList;

