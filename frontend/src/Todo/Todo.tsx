import React, { useState, useCallback, useMemo } from 'react';
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';

import { fetchTodos, selectTodos, createTodo, updateTodo, deleteTodo } from './Todo.ducks';
import { TodoType } from './Todo.types';
import { TodoUI } from './ui';

const QUERY_KEY = 'todos';
// Sets the cache as stale, forcing it to request todos again
const invalidateTodos = (queryClient: QueryClient) => queryClient.invalidateQueries(QUERY_KEY);


export const Todo: React.FC = () => {
  const [searchString, setSearchString] = useState('');
  const queryClient = useQueryClient();
  const { data: todos, isLoading } = useQuery(QUERY_KEY, fetchTodos, {
    initialData: {
      todos: []
    },
    select: selectTodos,
  });
  const { mutate: addTodo } = useMutation(createTodo, {
    onSuccess: () => invalidateTodos(queryClient),
  });
  const { mutate: editTodo } = useMutation(updateTodo, {
    onSuccess: () => invalidateTodos(queryClient),
  });
  const { mutate: removeTodo } = useMutation(deleteTodo, {
    onSuccess: () => invalidateTodos(queryClient),
  });

  const onSearchChange = useCallback(
    (newString: string) => {
      setSearchString(newString);
    },
    [setSearchString],
  );

  const searchedTodos = useMemo(
    () =>
      todos?.filter((todo: TodoType) =>
        todo.title.toLowerCase().includes(searchString.toLowerCase()),
      ) || [],
    [searchString, todos],
  );
  return (
    <TodoUI
      isLoading={isLoading}
      todos={searchedTodos}
      addTodo={addTodo}
      removeTodo={removeTodo}
      editTodo={editTodo}
      searchString={searchString}
      onSearchChange={onSearchChange}
    />
  );
};
