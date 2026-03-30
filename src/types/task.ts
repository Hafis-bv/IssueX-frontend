export interface Task {
  assigneeId: string;
  createdAt: string;
  description: string;
  id: string;
  projectId: string;
  status: string;
  title: string;
}

export interface TaskError {
  title: string | null;
  description: string | null;
  projectId: string | null;
}
