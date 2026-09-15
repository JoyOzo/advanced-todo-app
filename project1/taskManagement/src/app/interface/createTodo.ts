export interface CreateTodo {
  taskName: String;
  dueDate: string;
  tags: string[];
}

export interface Task extends CreateTodo {
  id: number;
}
