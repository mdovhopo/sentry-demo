import { action } from '@storybook/addon-actions';
import { TodoUI } from './TodoUI';

const todos = [
  { id: '111abc', title: 'Todo Title', description: 'Todo Description' },
  { id: '222abc', title: 'Todo 2', description: 'This is my second todo on the list' },
  { id: '333abc', title: 'Todo 3', description: 'This is my third todo on the list' },
];

export default {
  title: 'TODO',
  component: TodoUI,
};

export const Base = () => (
  <TodoUI
    todos={todos}
    searchString=""
    onSearchChange={action('Search')}
    addTodo={action('Add')}
    editTodo={action('Edit')}
    removeTodo={action('Remove')}
    isLoading={false}
  />
);

export const Loading = () => (
  <TodoUI
    todos={todos}
    searchString=""
    onSearchChange={action('Search')}
    addTodo={action('Add')}
    editTodo={action('Edit')}
    removeTodo={action('remove')}
    isLoading={true}
  />
);
