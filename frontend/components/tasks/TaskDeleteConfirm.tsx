"use client";

import React from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

interface TaskDeleteConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  taskTitle: string;
  isDeleting: boolean;
}

const TaskDeleteConfirm: React.FC<TaskDeleteConfirmProps> = ({
  isOpen,
  onClose,
  onConfirm,
  taskTitle,
  isDeleting,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Task"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} isLoading={isDeleting}>
            Delete
          </Button>
        </>
      }
    >
      <p className="text-gray-700">
        Are you sure you want to delete <strong>&quot;{taskTitle}&quot;</strong>? This action
        cannot be undone.
      </p>
    </Modal>
  );
};

export default TaskDeleteConfirm;
