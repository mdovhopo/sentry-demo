export type SearchTodoProps = {
  searchString: string;
  onSearchChange: (searchString: string) => void;
};

export type SearchTodosComponent = React.FC<SearchTodoProps>;
