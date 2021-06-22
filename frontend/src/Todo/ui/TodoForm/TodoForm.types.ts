import * as yup from "yup";
import { TodoType } from 'Todo/Todo.types';

export type TodoFormProps = {
  todoToEdit: TodoType | null;
  addTodo: (data: Pick<TodoType, 'title' | 'description'>) => void;
  saveEdit: (editedTodo: TodoType) => void;
  cancelEdit: () => void;
};

export type TodoFormComponent = React.FC<TodoFormProps>;

export const TodoFormSchema = yup.object().shape({
  title: yup.string().min(3).required(),
  description: yup.string().required(),
});
