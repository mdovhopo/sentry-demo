import { useState } from 'react';
import { useIntl } from 'react-intl';
import { Flexbox, Typography } from '@hiiretail/synergy-ui';

import { TodoType } from 'Todo/Todo.types';
import todoMessages from 'Todo/Todo.messages';
import { SearchTodo } from './SearchTodo/SearchTodo';
import { TodoForm } from './TodoForm/TodoForm';
import { TodoItem } from './TodoItem';
import { TodoListComponent } from './TodoList.types';

export const TodoUI: TodoListComponent = ({
  todos,
  addTodo,
  removeTodo,
  editTodo,
  isLoading,
  searchString,
  onSearchChange,
}) => {
  const intl = useIntl();
  const [todoToEdit, setTodoToEdit] = useState<TodoType | null>(null);

  const onRemoveClick = (id: string) => removeTodo(id);
  const onItemEditClick = (todo: TodoType) => {
    setTodoToEdit(todo);
  };

  const saveEdit = (editedTodo: TodoType) => {
    editTodo(editedTodo);
    setTodoToEdit(null);
  };
  const cancelEdit = () => {
    setTodoToEdit(null);
  };

  return (
    <Flexbox container direction="column" gutter={3}>
      <Typography>
        If nothing happens when you click, you need to rename the "_mocks" to "mocks" and restart
        the dev server (Hot reload is not enough)
      </Typography>
      <SearchTodo searchString={searchString} onSearchChange={onSearchChange} />

      <Flexbox container gutter={3}>
        <TodoForm
          addTodo={addTodo}
          saveEdit={saveEdit}
          cancelEdit={cancelEdit}
          todoToEdit={todoToEdit}
        />

        {isLoading
          ? intl.formatMessage(todoMessages.loading)
          : todos.map((todo) => (
              <TodoItem
                key={`${todo.title}-${todo.description}`}
                removeItem={() => onRemoveClick(todo.id)}
                editItem={() => onItemEditClick(todo)}
                todo={todo}
              />
            ))}
      </Flexbox>
    </Flexbox>
  );
};
