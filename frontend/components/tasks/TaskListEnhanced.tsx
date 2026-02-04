"use client";

import React, { useState } from "react";
import { Task } from "@/types/task";
import TaskItemEnhanced from "./TaskItemEnhanced";
import EmptyStateEnhanced from "./EmptyStateEnhanced";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Filter } from "lucide-react";

interface TaskListEnhancedProps {
  tasks: Task[];
  isLoading: boolean;
  onToggle: (id: string, completed: boolean) => Promise<void>;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

type FilterType = "all" | "active" | "completed";

const TaskListEnhanced: React.FC<TaskListEnhancedProps> = ({
  tasks,
  isLoading,
  onToggle,
  onEdit,
  onDelete,
}) => {
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return task.status !== 'done';
    if (filter === "completed") return task.status === 'done';
    return true;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filter Tabs */}
      {tasks.length > 0 && (
        <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
          <Filter className="w-4 h-4 text-gray-500" />
          <div className="flex gap-2">
            {(["all", "active", "completed"] as FilterType[]).map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${
                    filter === filterType
                      ? "bg-indigo-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }
                `}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                <span className="ml-2 text-xs opacity-75">
                  ({
                    filterType === "all"
                      ? tasks.length
                      : filterType === "active"
                      ? tasks.filter((t) => t.status !== 'done').length
                      : tasks.filter((t) => t.status === 'done').length
                  })
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <EmptyStateEnhanced />
      ) : (
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <TaskItemEnhanced
              key={task.id}
              task={task}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskListEnhanced;
