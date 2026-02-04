"use client";

import React from "react";
import { Task } from "@/types/task";
import TaskItem from "./TaskItem";
import EmptyState from "./EmptyState";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  onToggle: (id: string, completed: boolean) => Promise<void>;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, isLoading, onToggle, onEdit, onDelete }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (tasks.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
