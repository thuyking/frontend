import React, { useState } from "react";
import { toast } from "sonner";
import {
  useAdminUsers,
  useCreateAdminUser,
  useDeleteAdminUser,
  useUpdateAdminUser,
} from "../../hooks/useAdminUsers";

const UserManagement = () => {
  const { data: users = [], isLoading } = useAdminUsers();
  const createUserMutation = useCreateAdminUser();
  const updateUserMutation = useUpdateAdminUser();
  const deleteUserMutation = useDeleteAdminUser();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createUserMutation.mutateAsync(formData);
      toast.success("User created");
      setFormData({ name: "", email: "", password: "", role: "customer" });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create user");
    }
  }

  async function handleRoleChange(user, newRole) {
    try {
      await updateUserMutation.mutateAsync({
        userId: user._id,
        payload: {
          name: user.name,
          email: user.email,
          role: newRole,
        },
      });
      toast.success("Role updated");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update role");
    }
  }

  async function handleDeleteUser(userId) {
    if (window.confirm("Are you sure you want to delete")) {
      try {
        await deleteUserMutation.mutateAsync(userId);
        toast.success("User deleted");
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to delete user");
      }
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>

      {/* FORM */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Add New User</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={handleChange}
              name="name"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={handleChange}
              name="email"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={handleChange}
              name="password"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Role</label>
            <select
              value={formData.role}
              onChange={handleChange}
              name="role"
              className="w-full border rounded px-3 py-2 bg-white"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
            Add User
          </button>
        </form>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-sm uppercase text-gray-600">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => {
              return (
                <tr key={user._id} className="border-t">
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4 text-gray-600">{user.email}</td>

                  <td className="px-6 py-4">
                    <select
                      value={user.role}
                      className="border rounded px-2 py-1 bg-white"
                      onChange={(e) => {
                        handleRoleChange(user, e.target.value);
                      }}
                      name="role"
                    >
                      <option value="customer">Customer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>

                  <td className="px-6 py-4">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      onClick={() => {
                        handleDeleteUser(user._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
            {!isLoading && users.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
