"use client";

import React, { useState, useEffect } from "react";
import { Task, TaskFormData } from "@/types/task";
import { getTaskTitleError, getTaskDescriptionError } from "@/lib/utils/validation";
import { Plus, X, Save } from "lucide-react";

interface TaskFormEnhancedProps {
  onSubmit: (data: TaskFormData) => Promise<void>;
  editingTask: Task | null;
  onCancelEdit: () => void;
}

const TaskFormEnhanced: React.FC<TaskFormEnhancedProps> = ({
  onSubmit,
  editingTask,
  onCancelEdit,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || "");
    } else {
      setTitle("");
      setDescription("");
    }
    setErrors({});
  }, [editingTask]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const titleError = getTaskTitleError(title);
    const descriptionError = getTaskDescriptionError(description);

    if (titleError || descriptionError) {
      setErrors({
        title: titleError || undefined,
        description: descriptionError || undefined,
      });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    await onSubmit({ title, description: description || undefined });

    setIsSubmitting(false);

    if (!editingTask) {
      setTitle("");
      setDescription("");
    }
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setErrors({});
    onCancelEdit();
  };

  const descriptionLength = description.length;
  const maxDescriptionLength = 500;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title Input */}
      <div>
        <label htmlFor="task-title" className="block text-sm font-medium text-gray-700 mb-2">
          Task Title <span className="text-red-500">*</span>
        </label>
        <input
          id="task-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title..."
          className={`
            w-full px-4 py-3 rounded-lg border transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
            ${
              errors.title
                ? "border-red-300 bg-red-50"
                : "border-gray-300 bg-white hover:border-gray-400"
            }
          `}
          disabled={isSubmitting}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <span>⚠</span> {errors.title}
          </p>
        )}
      </div>

      {/* Description Input */}
      <div>
        <label htmlFor="task-description" className="block text-sm font-medium text-gray-700 mb-2">
          Description (Optional)
        </label>
        <textarea
          id="task-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add more details about this task..."
          rows={3}
          maxLength={maxDescriptionLength}
          className={`
            w-full px-4 py-3 rounded-lg border transition-all duration-200 resize-none
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
            ${
              errors.description
                ? "border-red-300 bg-red-50"
                : "border-gray-300 bg-white hover:border-gray-400"
            }
          `}
          disabled={isSubmitting}
        />
        <div className="flex items-center justify-between mt-1">
          {errors.description ? (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <span>⚠</span> {errors.description}
            </p>
          ) : (
            <span className="text-xs text-gray-500">Add details to help you remember</span>
          )}
          <span
            className={`text-xs ${
              descriptionLength > maxDescriptionLength * 0.9
                ? "text-red-500 font-medium"
                : "text-gray-500"
            }`}
          >
            {descriptionLength}/{maxDescriptionLength}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`
            flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg
            font-medium transition-all duration-200
            ${
              isSubmitting
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-indigo-500 text-white hover:bg-indigo-600 hover:shadow-lg hover:-translate-y-0.5"
            }
          `}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              {editingTask ? "Updating..." : "Creating..."}
            </>
          ) : (
            <>
              {editingTask ? <Save className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              {editingTask ? "Update Task" : "Create Task"}
            </>
          )}
        </button>

        {editingTask && (
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all duration-200 flex items-center gap-2"
          >
            <X className="w-5 h-5" />
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskFormEnhanced;
