"use client";

import React, { useState } from "react";
import { Task } from "@/types/task";
import { Edit2, Trash2, Check, Circle } from "lucide-react";
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
      className={`
        group relative p-4 rounded-xl border transition-all duration-300 animate-slide-in
        ${
          isCompleted
            ? "bg-gray-50 border-gray-200 hover:border-gray-300"
            : "bg-white border-gray-200 hover:border-indigo-300 hover:shadow-md"
        }
      `}
    >
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <button
          onClick={handleToggle}
          disabled={isToggling}
          className={`
            mt-1 flex-shrink-0 w-6 h-6 rounded-lg border-2 transition-all duration-200
            flex items-center justify-center
            ${
              isCompleted
                ? "bg-indigo-500 border-indigo-500"
                : "border-gray-300 hover:border-indigo-500 bg-white"
            }
            ${isToggling ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          `}
          aria-label={`Mark "${task.title}" as ${isCompleted ? "incomplete" : "complete"}`}
        >
          {isCompleted && <Check className="w-4 h-4 text-white" />}
        </button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <h3
            className={`
              text-base font-semibold mb-1 transition-all duration-200
              ${isCompleted ? "line-through text-gray-500" : "text-gray-900"}
            `}
          >
            {task.title}
          </h3>

          {task.description && (
            <p
              className={`
                text-sm mb-2 transition-all duration-200
                ${isCompleted ? "text-gray-400" : "text-gray-600"}
              `}
            >
              {task.description}
            </p>
          )}

          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Circle className="w-3 h-3" />
              Created {formatDate(task.created_at)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onEdit(task)}
            className="p-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
            aria-label={`Edit "${task.title}"`}
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
            aria-label={`Delete "${task.title}"`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
