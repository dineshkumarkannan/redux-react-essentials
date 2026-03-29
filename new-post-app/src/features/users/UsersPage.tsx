import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import UserForm from "./UserForm";
import {
  fetchUsersThunk,
  createUserThunk,
  updateUserThunk,
  deleteUserThunk,
  fetchUserThunk,
  selectUsers,
  selectUsersLoading,
  selectUsersError,
} from "./usersSlice";
import type { User } from "./usersSlice";

export default function UsersPage() {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const loading = useAppSelector(selectUsersLoading);
  const error = useAppSelector(selectUsersError);
  const [editing, setEditing] = useState<User | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchUsersThunk());
  }, [dispatch]);

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleEdit = async (id: number) => {
    setFormLoading(true);
    try {
      const user = await dispatch(fetchUserThunk(id)).unwrap();
      setEditing(user);
      setShowForm(true);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this user?")) return;
    setFormLoading(true);
    try {
      await dispatch(deleteUserThunk(id)).unwrap();
    } finally {
      setFormLoading(false);
    }
  };

  const handleFormSubmit = async (values: {
    firstName: string;
    lastName: string;
    email: string;
  }) => {
    setFormLoading(true);
    try {
      if (editing) {
        await dispatch(
          updateUserThunk({ id: editing.id, data: values }),
        ).unwrap();
      } else {
        await dispatch(createUserThunk(values)).unwrap();
      }
      setShowForm(false);
      setEditing(null);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Users</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleAdd}
        >
          Add New User
        </button>
      </div>
      {showForm && (
        <div className="mb-6">
          <UserForm
            initialValues={
              editing
                ? {
                    firstName: editing.firstName,
                    lastName: editing.lastName,
                    email: editing.email,
                  }
                : undefined
            }
            onSubmit={handleFormSubmit}
            loading={formLoading}
            submitLabel={editing ? "Update User" : "Add User"}
          />
          <button
            className="mt-2 text-gray-500 hover:underline"
            onClick={() => {
              setShowForm(false);
              setEditing(null);
            }}
          >
            Cancel
          </button>
        </div>
      )}
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded shadow">
            <thead>
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">First Name</th>
                <th className="px-4 py-2 border">Last Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-2 border">{user.id}</td>
                  <td className="px-4 py-2 border">{user.firstName}</td>
                  <td className="px-4 py-2 border">{user.lastName}</td>
                  <td className="px-4 py-2 border">{user.email}</td>
                  <td className="px-4 py-2 border flex gap-2">
                    <button
                      className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                      onClick={() => handleEdit(user.id)}
                      disabled={formLoading}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDelete(user.id)}
                      disabled={formLoading}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
