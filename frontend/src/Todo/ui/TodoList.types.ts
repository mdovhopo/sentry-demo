import React from 'react';
import { TodoType } from '../Todo.types';
import { SearchTodoProps } from './SearchTodo/SearchTodo.types';

export type TodoListProps = {
  isLoading: boolean;
  todos: Array<TodoType>;
  addTodo: (todo: Omit<TodoType, 'id'>) => void;
  removeTodo: (id: TodoType['id']) => void;
  editTodo: (todo: TodoType) => void;
} & SearchTodoProps;

export type TodoListComponent = React.FC<TodoListProps>;

export type TodoItemProps = { todo: TodoType; removeItem: () => void; editItem: () => void };

export type TodoItemComponent = React.FC<TodoItemProps>;
