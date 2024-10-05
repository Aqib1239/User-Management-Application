import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { createUser, updateUser } from "../services/userService";
import toast from "react-hot-toast";

// Set the root element for the modal
Modal.setAppElement("#root");

const UserForm = ({ user, isOpen, onClose, onRefresh }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    username: "USER-" + Math.random().toString(36).substr(2, 5),
    address: {
      street: "",
      city: "",
    },
    company: {
      name: "",
    },
    website: "",
  });

  useEffect(() => {
    if (user) {
      // Populate form with user data for editing
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        username: user.username || "",
        address: {
          street: user.address?.street || "",
          city: user.address?.city || "",
        },
        company: {
          name: user.company?.name || "",
        },
        website: user.website || "",
      });
    } else {
      // Reset form data when creating a new user
      setFormData({
        name: "",
        email: "",
        phone: "",
        username: "USER-" + Math.random().toString(36).substr(2, 5),
        address: {
          street: "",
          city: "",
        },
        company: {
          name: "",
        },
        website: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [section, field] = name.split(".");
      setFormData({
        ...formData,
        [section]: {
          ...formData[section],
          [field]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (user) {
        const updatedUser = {
          ...formData,
          id: user.id, // Make sure the ID is included
        };
        await updateUser(updatedUser); // Update user
        onRefresh(updatedUser); // Pass the updated user back
        toast.success("User updated successfully!");
      } else {
        const createdUser = await createUser(formData); // Create new user
        onRefresh(createdUser); // Pass the newly created user
        toast.success("User created successfully!");
      }
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error in updating/creating user", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="User Form"
      className="bg-white rounded-lg shadow-lg p-6 sm:p-8 max-w-lg w-full mx-auto"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <h2 className="text-2xl font-bold mb-4">
        {user ? "Edit User" : "Create User"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name *</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border-[3px] rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email *</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border-[3px] rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone *</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border-[3px] rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Username *</label>
            <input
              name="username"
              value={formData.username}
              className="w-full px-3 py-2 border-[3px] rounded bg-gray-100"
              readOnly
            />
          </div>
        </div>
        {/* Address fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Street *</label>
            <input
              name="address.street"
              value={formData.address.street}
              onChange={handleChange}
              className="w-full px-3 py-2 border-[3px] rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">City *</label>
            <input
              name="address.city"
              value={formData.address.city}
              onChange={handleChange}
              className="w-full px-3 py-2 border-[3px] rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Company Name
            </label>
            <input
              name="company.name"
              value={formData.company.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border-[3px] rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Website</label>
            <input
              name="website"
              type="text"
              value={formData.website}
              onChange={handleChange}
              className="w-full px-3 py-2 border-[3px] rounded"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
          <button
            type="button"
            className="bg-gray-500 text-white py-2 px-4 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            {user ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default UserForm;
