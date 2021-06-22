import axios from 'axios';
import { TodoType } from './Todo.types';

export const todosApi = axios.create({ baseURL: 'http://yourapi/' });

type fetchTodosResponse = { todos: TodoType[] }
export const fetchTodos = async (): Promise<fetchTodosResponse> => {
  const request = await todosApi.get<fetchTodosResponse>('/todos');
  return request.data;
};

export const selectTodos = (data: { todos: TodoType[] }): TodoType[] => data.todos;

export const createTodo = async (todoContent: Omit<TodoType, 'id'>): Promise<TodoType> => {
  const request = await todosApi.post('/todo', todoContent);
  return request.data;
};

export const updateTodo = async (editedTodo: TodoType): Promise<TodoType> => {
  const request = await todosApi.post(`/todo/${editedTodo.id}`, editedTodo);
  return request.data;
};

export const deleteTodo = (todoId: TodoType['id']): Promise<void> =>
  todosApi.delete(`/todo/${todoId}`);
