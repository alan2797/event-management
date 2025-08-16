import { useState, useEffect } from "react";
import type { Task } from "../types/Task";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTaskApi,
  getTaskById,
} from "../api/tasks";
import { notification } from "antd";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (
    title: string,
    description?: string,
    type?: string,
    startDate?: Date,
    endDate?: Date,
    direction?: string,
    startTime?: string,
    endTime?: string
  ) => {
    const newTask: Omit<Task, "id"> = {
      title,
      description,
      type,
      completed: false,
      startDate,
      endDate,
      direction,
      startTime,
      endTime,
    };
    const created = await createTask(newTask);
    setTasks((prev) => [...prev, created]);
    notification.success({ message: "Evento creada correctamente" });
  };

  const toggleTask = async (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    const updated = await updateTask(id, { completed: !task.completed });
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));

    notification.info({
      message: `Evento marcada como ${
        updated.completed ? "realizado" : "pendiente"
      }`,
    });
  };

  const deleteTask = async (id: number) => {
    await deleteTaskApi(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
    notification.success({ message: "Evento eliminada correctamente" });
  };

  const updateTaskById = async (id: number, updatedTask: Partial<Task>) => {
    const updated = await updateTask(id, updatedTask);
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    notification.success({ message: "Evento actualizada correctamente" });
  };

  // Obtener una Evento por id desde la API
  const getTask = async (id: number): Promise<Task | undefined> => {
    try {
      const task = await getTaskById(id);
      return task;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    fetchTasks,
    addTask,
    toggleTask,
    deleteTask,
    updateTask: updateTaskById,
    getTask,
    loading,
  };
};
