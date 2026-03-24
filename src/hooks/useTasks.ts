"use client";

import { useAuth } from "@/context/userContext";
import { Task } from "@/types/task";
import API from "@/utils/api";
import { useEffect, useState } from "react";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchTasks() {
      setLoading(true);
      setError(null);
      try {
        if (!user) return;
        const res = await API.handleUserTask(user.id);
        setTasks(res);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          console.log(err);
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchTasks();
  }, [tasks]);
  return {
    tasks,
    error,
    loading,
  };
};
