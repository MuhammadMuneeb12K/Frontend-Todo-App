import { useState, useEffect, useCallback } from 'react';
import { getTasks, createTask as apiCreateTask, updateTask as apiUpdateTask, deleteTask as apiDeleteTask } from '@/lib/api/tasks';
import { Task, CreateTaskRequest, UpdateTaskRequest, TaskFilterParams } from '@/types/task';
import { PaginatedResponse } from '@/types/api';
import { useAuth } from './useAuth';

export const useTasks = (initialFilters?: TaskFilterParams) => {
  const { isAuthenticated } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Omit<PaginatedResponse<Task>, 'items'> | null>(null);
  const [filters, setFilters] = useState<TaskFilterParams>(initialFilters || {});

  const fetchTasks = useCallback(async (page = 1, per_page = 10) => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
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
      setIsLoading(false);
    }
  }, [isAuthenticated, filters]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = useCallback(async (taskData: CreateTaskRequest) => {
    try {
      setIsLoading(true);
      const newTask = await apiCreateTask(taskData);
      setTasks((prev) => [newTask, ...prev]);
      setIsLoading(false);
      return newTask;
    } catch (err) {
      console.error('Failed to add task:', err);
      setError('Failed to add task.');
      setIsLoading(false);
      throw err;
    }
  }, []);

  const updateTask = useCallback(async (id: string, taskData: UpdateTaskRequest) => {
    try {
      setIsLoading(true);
      const updatedTask = await apiUpdateTask(id, taskData);
      setTasks((prev) => prev.map((task) => (task.id === id ? updatedTask : task)));
      setIsLoading(false);
      return updatedTask;
    } catch (err) {
      console.error('Failed to update task:', err);
      setError('Failed to update task.');
      setIsLoading(false);
      throw err;
    }
  }, []);

  const deleteTask = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      await apiDeleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      setIsLoading(false);
      return true;
    } catch (err) {
      console.error('Failed to delete task:', err);
      setError('Failed to delete task.');
      setIsLoading(false);
      return false;
    }
  }, []);

  const toggleTaskCompletion = useCallback(async (id: string, completed?: boolean) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return false;

    try {
      const newStatus = completed !== undefined
        ? (completed ? 'done' : 'todo')
        : (task.status === 'done' ? 'todo' : 'done');

      const updatedTask = await apiUpdateTask(id, {
        status: newStatus,
      });
      setTasks((prev) => prev.map((t) => (t.id === id ? updatedTask : t)));
      return true;
    } catch (err) {
      console.error('Failed to toggle task completion:', err);
      setError('Failed to update task.');
      return false;
    }
  }, [tasks]);

  const applyFilters = useCallback((newFilters: TaskFilterParams) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  return {
    tasks,
    isLoading,
    error,
    pagination,
    filters,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    applyFilters,
  };
};