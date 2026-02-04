"use client";

import React, { useState } from "react";
import { useTasks } from "@/lib/hooks/useTasks";
import { useToast } from "@/lib/hooks/useToast";
import { Task, TaskFormData } from "@/types/task";
import Card from "@/components/ui/Card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TaskForm from "@/components/tasks/TaskForm";
import TaskList from "@/components/tasks/TaskList";
import TaskDeleteConfirm from "@/components/tasks/TaskDeleteConfirm";

export default function DashboardPage() {
  const { tasks, isLoading, error, createTask, updateTask, deleteTask, toggleTaskCompletion } =
    useTasks();
  const { showToast } = useToast();

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleCreateTask = async (data: TaskFormData) => {
    setFormError(null);
    const result = await createTask(data);
    if (result) {
      showToast("Task created successfully", "success");
    } else {
      setFormError("Failed to create task. Please try again.");
      showToast("Failed to create task", "error");
    }
  };

  const handleUpdateTask = async (data: TaskFormData) => {
    if (!editingTask) return;

    setFormError(null);
    const result = await updateTask(editingTask.id, data);
    if (result) {
      setEditingTask(null);
      showToast("Task updated successfully", "success");
    } else {
      setFormError("Failed to update task. Please try again.");
      showToast("Failed to update task", "error");
    }
  };

  const handleDeleteTask = async () => {
    if (!deletingTaskId) return;

    setIsDeleting(true);
    const success = await deleteTask(deletingTaskId);
    setIsDeleting(false);

    if (success) {
      setDeletingTaskId(null);
      showToast("Task deleted successfully", "success");
    } else {
      showToast("Failed to delete task", "error");
    }
  };

  const handleToggleTask = async (id: string, completed: boolean) => {
    const success = await toggleTaskCompletion(id, completed);
    if (success) {
      showToast(
        completed ? "Task marked as complete" : "Task marked as incomplete",
        "success"
      );
    } else {
      showToast("Failed to update task", "error");
    }
  };

  const deletingTask = tasks.find((t) => t.id === deletingTaskId);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Page Title - Mobile Optimized */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Tasks</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Manage your tasks efficiently
            </p>
          </div>

          {/* Task Form - Responsive Card */}
          <Card>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
              {editingTask ? "Edit Task" : "Create New Task"}
            </h2>
            <TaskForm
              onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
              editingTask={editingTask}
              onCancelEdit={() => {
                setEditingTask(null);
                setFormError(null);
              }}
            />
            {formError && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg" role="alert">
                <p className="text-sm text-red-600">{formError}</p>
              </div>
            )}
          </Card>

          {/* Error Display */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg" role="alert">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Task List - Responsive Card */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                Your Tasks ({tasks.length})
              </h2>
            </div>
            <TaskList
              tasks={tasks}
              isLoading={isLoading}
              onToggle={handleToggleTask}
              onEdit={setEditingTask}
              onDelete={setDeletingTaskId}
            />
          </Card>
        </div>
      </main>

      <Footer />

      {/* Delete Confirmation Modal */}
      <TaskDeleteConfirm
        isOpen={!!deletingTaskId}
        onClose={() => setDeletingTaskId(null)}
        onConfirm={handleDeleteTask}
        taskTitle={deletingTask?.title || ""}
        isDeleting={isDeleting}
      />
    </div>
  );
}
