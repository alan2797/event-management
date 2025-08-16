import axios from "axios";
import type { Task } from "../types/Task";

// URL de tu proyecto en mockapi.io
const API_URL = "https://68a0b19c6e38a02c58196f80.mockapi.io/api/tasks";

export const getTasks = async (): Promise<Task[]> => {
  const { data } = await axios.get(API_URL);
  return data;
};

export const getTaskById = async (id: number): Promise<Task> => {
  const { data } = await axios.get(`${API_URL}/${id}`);
  return data;
};

export const createTask = async (task: Omit<Task, "id">): Promise<Task> => {
  const { data } = await axios.post(API_URL, task);
  return data;
};

export const updateTask = async (
  id: number,
  task: Partial<Task>
): Promise<Task> => {
  const { data } = await axios.put(`${API_URL}/${id}`, task);
  return data;
};

export const deleteTaskApi = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};
