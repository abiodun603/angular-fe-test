export interface TaskProps {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  priority: 'Low' | 'Medium' | 'High';
  status: 'To Do' | 'In Progress' | 'Completed';
}

export interface TaskGroupProps {
  status: string;
  tasks: TaskProps[];
}
