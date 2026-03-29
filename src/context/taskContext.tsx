"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Task } from "@/types/task";
import API from "@/utils/api";
import { useAuth } from "@/context/userContext";

interface CreateTaskInput {
  title: string;
  description: string;
  projectId: string;
}

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  deleteTask: (id: string) => Promise<void>;
  updateTask: (
    id: string,
    body: {
      title: string;
      description: string;
      status: string;
    },
  ) => Promise<void>;
  refetch: () => Promise<void>;
  addTask: (body: CreateTaskInput) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  async function fetchTasks() {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const res = await API.handleUserTask(user.id);
      setTasks(res);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, [user]);

  async function addTask(body: CreateTaskInput) {
    if (!user) return;
    try {
      const { task } = await API.hadleCreateTask({
        ...body,
        assigneeId: user.id,
      });
      setTasks([...tasks, task]);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteTask(id: string) {
    try {
      await API.handleDeleteTask(id);

      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  async function updateTask(
    id: string,
    body: {
      title: string;
      description: string;
      status: string;
    },
  ) {
    try {
      const updated = await API.handleUpdateTask(id, body);

      setTasks((prev) =>
        prev.map((t) =>
          t.id === id
            ? {
                ...t,
                ...updated.task,
              }
            : t,
        ),
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        deleteTask,
        updateTask,
        refetch: fetchTasks,
        addTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks must be used inside TaskProvider");
  }

  return context;
};
