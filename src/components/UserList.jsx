
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { getUsers, deletedUser } from "../services/userService";
import UserForm from "./UserForm";
import DeleteConfirmation from "./DeleteConfirmation";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteUserToDelete, setDeleteUserToDelete] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  const openForm = (user) => {
    setEditUser(user);
    setIsFormOpen(true);
  };

  const openDeleteModal = (user) => {
    setDeleteUserToDelete(user);
    setIsDeleteOpen(true);
  };

  const handleUserUpdate = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setIsFormOpen(false);
  };

  const handleUserAdd = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const handleUserDelete = async () => {
    try {
      await deletedUser(deleteUserToDelete.id);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== deleteUserToDelete.id)
      );
      setIsDeleteOpen(false);
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <div className="my-4 text-center">
      <h1 className="text-3xl font-bold mb-4">User List</h1>
      <button
        className="bg-blue-500 text-white font-semibold hover:bg-blue-700 transition-all duration-300 py-2 px-4 rounded-[20px] mb-4"
        onClick={() => openForm(null)}
      >
        Add New User
      </button>
      {loading ? (
        <Skeleton count={5} height={40} className="mb-4" />
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-center mt-4">
            <thead>
              <tr className="bg-[#000] text-white font-medium">
                <th className="px-4 py-2 border">S.NO</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className={index % 2 === 0 ? "bg-gray-200" : "bg-white"}
                >
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.phone}</td>
                  <td className="border px-4 py-2 flex justify-center">
                    <button
                      className="bg-green-500 text-white hover:bg-green-600 transition-all duration-300 font-medium py-1 px-2 rounded mr-2"
                      onClick={() => openForm(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white hover:bg-red-700 transition-all duration-300 font-medium py-1 px-2 rounded"
                      onClick={() => openDeleteModal(user)}
                    >
                      Delete
                    </button>
                    <Link
                      to={`/users/${user.id}`}
                      className="text-white bg-violet-500 hover:bg-violet-600 transition-all duration-300 font-medium py-1 px-2 rounded ml-2"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <UserForm
        user={editUser}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onRefresh={editUser ? handleUserUpdate : handleUserAdd}
      />

      <DeleteConfirmation
        user={deleteUserToDelete}
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onRefresh={handleUserDelete}
      />
    </div>
  );
}

export default UserList;
