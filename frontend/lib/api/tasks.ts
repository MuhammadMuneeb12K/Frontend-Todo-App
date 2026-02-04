import apiClient from './client';
import { PaginatedResponse, PaginationParams } from '@/types/api';
import { Task, CreateTaskRequest, UpdateTaskRequest } from '@/types/task';

export const getTasks = async (params?: PaginationParams): Promise<PaginatedResponse<Task>> => {
  const response = await apiClient.get('/api/v1/tasks', { params });
  return response.data;
};

export const createTask = async (task: CreateTaskRequest): Promise<Task> => {
  const response = await apiClient.post('/api/v1/tasks', task);
  return response.data;
};

export const updateTask = async (id: string, task: UpdateTaskRequest): Promise<Task> => {
  const response = await apiClient.put(`/api/v1/tasks/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await apiClient.delete(`/api/v1/tasks/${id}`);
};