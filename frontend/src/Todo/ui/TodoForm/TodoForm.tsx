import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Flexbox, Button, Card } from '@hiiretail/synergy-ui';

import { TextField as HookFormField } from '@app/common/components/TextField';
import { TodoType } from 'Todo/Todo.types';
import todoMessages from 'Todo/Todo.messages';
import { TodoFormComponent, TodoFormSchema } from './TodoForm.types';

const initialValues = {
  description: '',
  title: '',
};

export const TodoForm: TodoFormComponent = ({ todoToEdit, addTodo, saveEdit, cancelEdit }) => {
  const intl = useIntl();
  const formProps = useForm({
    resolver: yupResolver(TodoFormSchema),
  });

  const { handleSubmit, setValue, reset } = formProps;

  const editMode = todoToEdit !== null;

  // Sets the title and description depending
  useEffect(() => {
    if (todoToEdit !== null) {
      setValue('title', todoToEdit.title, {
        shouldValidate: false,
        shouldDirty: false,
      });
      setValue('description', todoToEdit.description, {
        shouldValidate: false,
        shouldDirty: false,
      });
    }
  }, [setValue, todoToEdit]);

  const onEditCancel = () => {
    cancelEdit();
    reset(initialValues);
  };

  const onSubmitHandler = (values: TodoType) => {
    if (editMode) {
      saveEdit({ ...todoToEdit, ...values });
    } else {
      addTodo(values);
    }

    reset(initialValues);
  };

  return (
    <FormProvider {...formProps}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Card width="260px">
          <Flexbox container direction="column" gutter={4}>
            <HookFormField label={intl.formatMessage(todoMessages.title)} name="title" fullWidth />
            <HookFormField
              label={intl.formatMessage(todoMessages.description)}
              name="description"
              fullWidth
            />

            <Flexbox container gutter={3} justifyContent="flex-end">
              <Flexbox item>
                <Button type="submit">
                  {intl.formatMessage(editMode ? todoMessages.editItem : todoMessages.addItem)}
                </Button>
              </Flexbox>
              {editMode ? (
                <Flexbox item>
                  <Button onClick={onEditCancel} type="reset">
                    {intl.formatMessage(todoMessages.cancel)}
                  </Button>
                </Flexbox>
              ) : null}
            </Flexbox>
          </Flexbox>
        </Card>
      </form>
    </FormProvider>
  );
};
