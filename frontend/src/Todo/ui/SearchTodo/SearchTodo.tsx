import React from 'react';
import { useIntl } from 'react-intl';
import { Flexbox, Card, TextField } from '@hiiretail/synergy-ui';

import todoMessages from 'Todo/Todo.messages';
import { SearchTodosComponent } from './SearchTodo.types';

export const SearchTodo: SearchTodosComponent = ({ searchString, onSearchChange }) => {
  const intl = useIntl();

  return (
    <Card width="260px">
      <Flexbox container direction="column" gutter={4}>
        <form>
          <TextField
            value={searchString}
            onChange={(e) => onSearchChange(e.target.value)}
            label={intl.formatMessage(todoMessages.search)}
            name="search"
            fullWidth
          />
        </form>
      </Flexbox>
    </Card>
  );
};
