import { useState, useEffect, useCallback } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '@/lib/api/tasks';
import { Task, CreateTaskRequest, UpdateTaskRequest, TaskFilterParams } from '@/types/task';
import { PaginatedResponse } from '@/types/api';
import { useAuth } from './useAuth';

export const useTasks = (initialFilters?: TaskFilterParams) => {
  const { isAuthenticated } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Omit<PaginatedResponse<Task>, 'items'> | null>(null);
  const [filters, setFilters] = useState<TaskFilterParams>(initialFilters || {});

  const fetchTasks = useCallback(async (page = 1, per_page = 10) => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await getTasks({ ...filters, page, per_page });
      setTasks(response.items);
      setPagination({
        total: response.total,
        page: response.page,
        per_page: response.per_page,
        pages: response.pages,
      });
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
      setError('Failed to load tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, filters]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = useCallback(async (taskData: CreateTaskRequest) => {
    try {
      setLoading(true);
      const newTask = await createTask(taskData);
      setTasks((prev) => [newTask, ...prev]);
      setLoading(false);
      return newTask;
    } catch (err) {
      console.error('Failed to add task:', err);
      setError('Failed to add task.');
      setLoading(false);
      throw err;
    }
  }, []);

  const editTask = useCallback(async (id: string, taskData: UpdateTaskRequest) => {
    try {
      setLoading(true);
      const updatedTask = await updateTask(id, taskData);
      setTasks((prev) => prev.map((task) => (task.id === id ? updatedTask : task)));
      setLoading(false);
      return updatedTask;
    } catch (err) {
      console.error('Failed to update task:', err);
      setError('Failed to update task.');
      setLoading(false);
      throw err;
    }
  }, []);

  const removeTask = useCallback(async (id: string) => {
    try {
      setLoading(true);
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      setLoading(false);
    } catch (err) {
      console.error('Failed to delete task:', err);
      setError('Failed to delete task.');
      setLoading(false);
      throw err;
    }
  }, []);

  const applyFilters = useCallback((newFilters: TaskFilterParams) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  return {
    tasks,
    loading,
    error,
    pagination,
    filters,
    fetchTasks,
    addTask,
    editTask,
    removeTask,
    applyFilters,
  };
};