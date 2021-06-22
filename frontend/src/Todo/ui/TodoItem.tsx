import { useIntl } from 'react-intl';
import { Icon, Flexbox, Button, Typography, Card, Tooltip } from '@hiiretail/synergy-ui';

import todoMessages from 'Todo/Todo.messages';
import { TodoItemComponent } from './TodoList.types';

export const TodoItem: TodoItemComponent = ({ todo, editItem, removeItem }) => {
  const intl = useIntl();

  return (
    <Card header={todo.title} width="260px">
      <Flexbox container direction="column" gutter={4} justifyContent="space-between" >
        <Typography variant="body1">
          {todo.description}
        </Typography>

        <Flexbox container justifyContent="flex-end">
          <Tooltip
            title={<Typography color={() => '#ffffff'}>{intl.formatMessage(todoMessages.edit)}</Typography>}
            placement="auto">
            <Button variant="icon" onClick={editItem}>
              <Icon.Edit />
            </Button>
          </Tooltip>
          <Tooltip
            title={<Typography color={() => '#ffffff'}>{intl.formatMessage(todoMessages.remove)}</Typography>}
            placement="auto">
            <Button variant="icon" onClick={removeItem}>
              <Icon.Delete />
            </Button>
          </Tooltip>
        </Flexbox>
      </Flexbox>

    </Card>
  )
};
