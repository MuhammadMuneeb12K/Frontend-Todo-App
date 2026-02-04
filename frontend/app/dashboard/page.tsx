"use client";

import React, { useState } from "react";
import { useTasks } from "@/lib/hooks/useTasks";
import { useToastContext } from "@/contexts/ToastContext";
import { Task, TaskFormData } from "@/types/task";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import StatsCard from "@/components/dashboard/StatsCard";
import TaskFormEnhanced from "@/components/tasks/TaskFormEnhanced";
import TaskListEnhanced from "@/components/tasks/TaskListEnhanced";
import TaskDeleteConfirm from "@/components/tasks/TaskDeleteConfirm";
import { CheckSquare, ListTodo, Clock, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  const { tasks, isLoading, error, createTask, updateTask, deleteTask, toggleTaskCompletion } =
    useTasks();
  const { showToast } = useToastContext();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Calculate stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'done').length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleCreateTask = async (data: TaskFormData) => {
    const result = await createTask(data);
    if (result) {
      showToast("Task created successfully! 🎉", "success");
    } else {
      showToast("Failed to create task. Please try again.", "error");
    }
  };

  const handleUpdateTask = async (data: TaskFormData) => {
    if (!editingTask) return;

    const result = await updateTask(editingTask.id, data);
    if (result) {
      setEditingTask(null);
      showToast("Task updated successfully! ✨", "success");
    } else {
      showToast("Failed to update task. Please try again.", "error");
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
        completed ? "Task marked as complete! ✓" : "Task marked as incomplete",
        "success"
      );
    } else {
      showToast("Failed to update task", "error");
    }
  };

  const deletingTask = tasks.find((t) => t.id === deletingTaskId);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Navbar */}
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                Welcome back! 👋
              </h1>
              <p className="text-gray-600">
                Here's what's happening with your tasks today.
              </p>
            </div>

            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <StatsCard
                title="Total Tasks"
                value={totalTasks}
                icon={ListTodo}
                iconColor="text-blue-600"
                iconBgColor="bg-blue-100"
              />
              <StatsCard
                title="Completed"
                value={completedTasks}
                icon={CheckSquare}
                iconColor="text-green-600"
                iconBgColor="bg-green-100"
              />
              <StatsCard
                title="Pending"
                value={pendingTasks}
                icon={Clock}
                iconColor="text-amber-600"
                iconBgColor="bg-amber-100"
              />
              <StatsCard
                title="Completion Rate"
                value={`${completionRate}%`}
                icon={TrendingUp}
                iconColor="text-indigo-600"
                iconBgColor="bg-indigo-100"
              />
            </div>

            {/* Error Display */}
            {error && (
              <div
                className="p-4 bg-red-50 border border-red-200 rounded-xl animate-slide-in"
                role="alert"
              >
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Task Creation Form */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                {editingTask ? (
                  <>
                    <span>✏️</span> Edit Task
                  </>
                ) : (
                  <>
                    <span>➕</span> Create New Task
                  </>
                )}
              </h2>
              <TaskFormEnhanced
                onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                editingTask={editingTask}
                onCancelEdit={() => setEditingTask(null)}
              />
            </div>

            {/* Task List */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <span>📋</span> Your Tasks
                  <span className="text-sm font-normal text-gray-500">
                    ({tasks.length} total)
                  </span>
                </h2>
              </div>
              <TaskListEnhanced
                tasks={tasks}
                isLoading={isLoading}
                onToggle={handleToggleTask}
                onEdit={setEditingTask}
                onDelete={setDeletingTaskId}
              />
            </div>
          </div>
        </main>
      </div>

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
