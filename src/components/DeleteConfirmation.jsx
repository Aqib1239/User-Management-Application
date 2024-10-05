import React from "react";
import Modal from "react-modal";
import { deletedUser } from "../services/userService";

const DeleteConfirmation = ({ user, isOpen, onClose, onRefresh }) => {
  const handleDelete = async () => {
    if (!user) return; // Ensure user is defined

    try {
      await deletedUser(user.id); // Call the delete function
      onRefresh(); // Refresh the user list
      onClose(); // Close the modal
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Delete Confirmation"
      className="bg-white rounded-lg shadow-lg p-8 max-w-lg mx-auto"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <h2 className="text-2xl font-bold mb-4">Delete User</h2>
      {user ? (
        <p>
          Are you sure you want to delete <strong>{user.name}</strong>?
        </p>
      ) : (
        <p>Loading user data...</p> // Fallback message
      )}
      <div className="flex justify-end space-x-4">
        <button
          className="bg-gray-500 text-white py-2 px-4 rounded"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmation;
