import MockAdapter from 'axios-mock-adapter';
import { todosApi } from '../Todo/Todo.ducks';
import { TodoType } from '../Todo/Todo.types';

const mock = new MockAdapter(todosApi, { delayResponse: 300 });

const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

const DEFAULT_TODOS = [
  { id: generateId(), title: 'Test TODO', description: 'This is my test todo' },
];

let todos: TodoType[] = DEFAULT_TODOS.slice(0);

export const restoreDefaultTodos = (): void => {
  todos = DEFAULT_TODOS.slice(0);
};

mock.onGet('/todos').reply(() => {
  return [200, { todos }];
});

mock.onPost(/\/todo\/.*/).reply((config) => {
  const editedTodo = JSON.parse(config.data);
  const todoIndex = todos.findIndex((todo) => todo.id === editedTodo.id);
  const copy = todos.slice();
  copy[todoIndex] = editedTodo;
  todos = copy;
  return [200, editedTodo];
});

mock.onPost('/todo').reply((config) => {
  const todoContent = JSON.parse(config.data);
  const newTodo = { ...todoContent, id: generateId() };
  todos.push(newTodo);
  return [200, newTodo];
});

mock.onDelete(/\/todo\/.*/).reply((config) => {
  const todoId = config.url?.slice(config.url?.lastIndexOf('/') + 1);
  todos = todos.filter((todo) => todo.id !== todoId);
  return [200];
});
