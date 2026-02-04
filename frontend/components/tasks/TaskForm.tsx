"use client";

import React, { useState, useEffect } from "react";
import { Task, TaskFormData } from "@/types/task";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { getTaskTitleError, getTaskDescriptionError } from "@/lib/utils/validation";

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => Promise<void>;
  editingTask?: Task | null;
  onCancelEdit?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, editingTask, onCancelEdit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate form when editing
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || "");
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editingTask]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({});

    // Validate inputs
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

    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim() || undefined,
      });

      // Clear form after successful submission (only if not editing)
      if (!editingTask) {
        setTitle("");
        setDescription("");
      }
    } catch (error) {
      // Error handling is done in parent component
      console.error("Task form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setErrors({});
    onCancelEdit?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          type="text"
          label="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={errors.title}
          placeholder="What needs to be done?"
          disabled={isSubmitting}
          required
          maxLength={200}
        />
      </div>

      <div>
        <label htmlFor="task-description" className="block text-sm font-medium text-gray-700 mb-1">
          Description (optional)
        </label>
        <textarea
          id="task-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add more details..."
          disabled={isSubmitting}
          maxLength={2000}
          rows={3}
          className={`
            w-full px-3 py-2 border rounded-lg resize-none
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${errors.description ? "border-red-500" : "border-gray-300"}
          `}
          aria-invalid={errors.description ? "true" : "false"}
          aria-describedby={errors.description ? "description-error" : undefined}
        />
        {errors.description && (
          <p id="description-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.description}
          </p>
        )}
      </div>

      <div className="flex gap-2">
        <Button type="submit" variant="primary" isLoading={isSubmitting} className="flex-1">
          {editingTask ? "Update Task" : "Add Task"}
        </Button>
        {editingTask && onCancelEdit && (
          <Button type="button" variant="secondary" onClick={handleCancel} disabled={isSubmitting}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
