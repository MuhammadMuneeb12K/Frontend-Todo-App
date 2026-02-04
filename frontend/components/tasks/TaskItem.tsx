"use client";

import React, { useState } from "react";
import { Task } from "@/types/task";
import Button from "@/components/ui/Button";
import { formatDate } from "@/lib/utils/formatting";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string, completed: boolean) => Promise<void>;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onEdit, onDelete }) => {
  const [isToggling, setIsToggling] = useState(false);
  const isCompleted = task.status === 'done';

  const handleToggle = async () => {
    setIsToggling(true);
    await onToggle(task.id, !isCompleted);
    setIsToggling(false);
  };

  return (
    <div
      className={`p-4 border rounded-lg transition-all ${
        isCompleted ? "bg-gray-50 border-gray-300" : "bg-white border-gray-200"
      }`}
    >
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={handleToggle}
          disabled={isToggling}
          className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer disabled:cursor-not-allowed min-w-[20px]"
          aria-label={`Mark "${task.title}" as ${isCompleted ? "incomplete" : "complete"}`}
        />

        <div className="flex-1 min-w-0">
          <h3
            className={`text-base font-medium ${
              isCompleted ? "line-through text-gray-500" : "text-gray-900"
            }`}
          >
            {task.title}
          </h3>

          {task.description && (
            <p
              className={`mt-1 text-sm ${
                isCompleted ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {task.description}
            </p>
          )}

          <p className="mt-2 text-xs text-gray-500">
            Created {formatDate(task.created_at)}
          </p>
        </div>

        <div className="flex gap-2 flex-shrink-0">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onEdit(task)}
            aria-label={`Edit "${task.title}"`}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => onDelete(task.id)}
            aria-label={`Delete "${task.title}"`}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
