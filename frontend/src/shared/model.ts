export interface Task {
  _id: string;
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  status: string;
}

export interface User {
  name: string,
  email: string,
  isAdmin: boolean
};
