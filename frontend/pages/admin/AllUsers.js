import Sidebar from "@/components/Admin/Admin-Sidebar";
import { withAuth } from "@/utils/withAuth";
import React, { useState } from "react";

const AllUsers = () => {
    const [users, setUsers] = useState([
        { id: 1, name: "John Doe", email: "john@example.com", isAdmin: false },
        { id: 2, name: "Jane Smith", email: "jane@example.com", isAdmin: true },
        // Add more mock users as needed
    ]);

    const promoteToAdmin = (userId) => {
        setUsers(users.map((user) => (user.id === userId ? { ...user, isAdmin: true } : user)));
    };

    const viewOrderHistory = (userId) => {
        // Implement view order history functionality
        console.log(`Viewing order history for user ${userId}`);
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-10 text-black">
                <h1 className="text-3xl font-bold mb-6">All Users</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-3 px-4 text-left">Name</th>
                                <th className="py-3 px-4 text-left">Email</th>
                                <th className="py-3 px-4 text-left">Admin Status</th>
                                <th className="py-3 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr
                                    key={user.id}
                                    className="border-b border-gray-200 hover:bg-gray-100"
                                >
                                    <td className="py-3 px-4">{user.name}</td>
                                    <td className="py-3 px-4">{user.email}</td>
                                    <td className="py-3 px-4">
                                        {user.isAdmin ? (
                                            <span className="bg-green-200 text-green-800 py-1 px-2 rounded-full text-sm">
                                                Admin
                                            </span>
                                        ) : (
                                            <span className="bg-gray-200 text-gray-800 py-1 px-2 rounded-full text-sm">
                                                User
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-3 px-4">
                                        {!user.isAdmin && (
                                            <button
                                                onClick={() => promoteToAdmin(user.id)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded mr-2"
                                            >
                                                Promote to Admin
                                            </button>
                                        )}
                                        <button
                                            onClick={() => viewOrderHistory(user.id)}
                                            className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-3 m-2 rounded"
                                        >
                                            View Order History
                                        </button>
                                        <button
                                            className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 m-2 rounded"
                                            onClick={() => deleteUser(user._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default withAuth(AllUsers, { requireLogin: true, requireAdmin: true });
