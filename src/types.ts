export interface LoginProps {
  email: string;
  password: string;
}

export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export interface Pagination {
  page: number;
  rowsPerPage: number;
}
