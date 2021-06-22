// Import mocks for the backend api
import { restoreDefaultTodos } from '../../_mocks/Todo.ducks.mock';

import React, { ReactElement } from 'react';
import {
  cleanup,
  render as defaultRender,
  RenderOptions,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Todo } from '../Todo';

const queryClient = new QueryClient();

const Providers: React.FC = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

const render = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) =>
  defaultRender(ui, { wrapper: Providers, ...options });

beforeEach(() => {
  // Restores the todos to their default state in the mock backend
  restoreDefaultTodos();
});

afterEach(() => {
  cleanup();
});

const timeWait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const STARTER_TODO = { title: 'Test TODO', description: 'This is my test todo' };

describe('TODO', () => {
  test('Renders todos', async () => {
    render(<Todo />);
    const todoTitle = await screen.findByRole('heading', { name: 'Test TODO' });
    const todoDescription = await screen.findByText(STARTER_TODO.description);
    expect(todoTitle).toBeInTheDocument();
    expect(todoDescription).toBeInTheDocument();
  });

  test('Adds todo', async () => {
    const NEW_TITLE = 'New Todo';
    const NEW_DESC = 'New Todo Description';

    render(<Todo />);

    const titleField = screen.getByLabelText('Title:') as HTMLInputElement;
    const descriptionField = screen.getByLabelText('Description:') as HTMLInputElement;

    // Fill in fields and click add button
    userEvent.type(titleField, NEW_TITLE);
    userEvent.type(descriptionField, NEW_DESC);
    userEvent.click(screen.getByRole('button', { name: 'Add item' }));

    //Wait for text to appear
    const todoTitle = await screen.findByRole('heading', { name: NEW_TITLE });
    const todoDescription = await screen.findByText(NEW_DESC);
    expect(todoTitle).toBeInTheDocument();
    expect(todoDescription).toBeInTheDocument();

    //Check that the title and desc fields are now empty
    expect(titleField.value).toEqual('');
    expect(descriptionField.value).toEqual('');
  });

  test('Start editing and then cancel returns to initial state', async () => {
    const EDITED_TODO_TITLE = 'My new todo title';
    const EDITED_TODO_DESC = 'My new todo description';

    render(<Todo />);

    // Click edit on the todo item
    userEvent.click(await screen.findByRole('button', { name: 'Edit' }));
    const titleField = screen.getByLabelText('Title:') as HTMLInputElement;
    const descriptionField = screen.getByLabelText('Description:') as HTMLInputElement;

    // Check that title and description fields have the values of the todo in them
    expect(titleField.value).toEqual(STARTER_TODO.title);
    expect(descriptionField.value).toEqual(STARTER_TODO.description);

    // Fill in fields
    userEvent.clear(titleField);
    userEvent.type(titleField, EDITED_TODO_TITLE);
    userEvent.clear(descriptionField);
    userEvent.type(descriptionField, EDITED_TODO_DESC);

    // Cancel editing
    userEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    // Check that title and description fields have empty values
    expect(titleField.value).toEqual('');
    expect(descriptionField.value).toEqual('');

    // Check that submission button has changed back to add item
    expect(screen.queryByRole('button', { name: 'Add item' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Edit item' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Cancel' })).not.toBeInTheDocument();

    // Wait and make sure the edits don't appear as TODOs
    await timeWait(1000);
    expect(screen.queryByRole('heading', { name: EDITED_TODO_TITLE })).not.toBeInTheDocument();
  });

  test('Edits todo', async () => {
    const EDITED_TODO_TITLE = 'My new todo title';
    const EDITED_TODO_DESC = 'My new todo description';

    render(<Todo />);

    const editTodoButton = await screen.findByRole('button', { name: 'Edit' });
    // Click edit on the todo item
    userEvent.click(editTodoButton);
    const titleField = screen.getByLabelText('Title:') as HTMLInputElement;
    const descriptionField = screen.getByLabelText('Description:') as HTMLInputElement;

    // Check that title and description fields have the values of the todo in them
    expect(screen.getByDisplayValue(STARTER_TODO.title)).toEqual(titleField);
    expect(screen.getByDisplayValue(STARTER_TODO.description)).toEqual(descriptionField);

    // Fill in fields and click edit button
    userEvent.clear(titleField);
    userEvent.type(titleField, EDITED_TODO_TITLE);
    userEvent.clear(descriptionField);
    userEvent.type(descriptionField, EDITED_TODO_DESC);
    userEvent.click(screen.getByRole('button', { name: 'Edit item' }));

    const todoTitle = await screen.findByRole('heading', { name: EDITED_TODO_TITLE });
    const todoDescription = await screen.findByText(EDITED_TODO_DESC);

    expect(todoTitle).toBeInTheDocument();
    expect(todoDescription).toBeInTheDocument();

    //Check that the title and desc fields are now empty
    expect(titleField.value).toEqual('');
    expect(descriptionField.value).toEqual('');
  });

  test('Deletes todo', async () => {
    render(<Todo />);

    const todoTitle = await screen.findByRole('heading', { name: STARTER_TODO.title });
    // Check that the todo is there
    expect(todoTitle).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: 'Remove' }));
    await waitForElementToBeRemoved(todoTitle);
    expect(screen.queryByRole('heading', { name: STARTER_TODO.title })).not.toBeInTheDocument();
  });
});
