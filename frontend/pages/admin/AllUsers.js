import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "@/components/Admin/Admin-Sidebar";
import {
  useFetchAllUsersQuery,
  useDeleteUserMutation,
  usePromoteAdminToUserMutation,
} from "@/store/slices/api/userApiSlice";
import { toastManager } from "@/utils/toastManager";
import { withAuth } from "@/utils/withAuth";
import {
  useTable,
  usePagination,
  useGlobalFilter,
} from "react-table";

const AllUsers = () => {
  const router = useRouter();
  const { data: allUsers } = useFetchAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [promoteAdminToUser] = usePromoteAdminToUserMutation();
  const [searchValue, setSearchValue] = useState("");

  const columns = useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Email", accessor: "email" },
      {
        Header: "Admin Status",
        accessor: "isAdmin",
        Cell: ({ value }) => (
          <span className={`py-1 px-2 rounded-full text-sm ${value ? "bg-green-200 text-green-800" : "bg-gray-200 text-gray-800"}`}>
            {value ? "Admin" : "User"}
          </span>
        ),
      },
      {
        Header: "Actions",
        accessor: "_id",
        Cell: ({ row: { original } }) => (
          <>
            {!original.isAdmin && (
              <button
                onClick={() => promoteToAdmin(original._id)}
                className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded mr-2"
              >
                Promote to Admin
              </button>
            )}
            <button
              onClick={() => viewOrderHistory(original._id)}
              className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-3 m-2 rounded"
            >
              View Order History
            </button>
            <button
              onClick={() => handleDeleteUser(original._id)}
              className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 m-2 rounded"
            >
              Delete
            </button>
          </>
        ),
      },
    ],
    []
  );

  const data = useMemo(() => allUsers || [], [allUsers]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex, pageSize },
    setGlobalFilter,
    gotoPage,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageCount,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 10 },
    },
    useGlobalFilter,
    usePagination
  );

  useEffect(() => {
    setPageSize(10);
  }, [setPageSize]);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    setGlobalFilter(e.target.value);
  };

  const promoteToAdmin = async (userId) => {
    const toastId = toastManager.loading("Promoting user to admin...");
    try {
      await promoteAdminToUser(userId).unwrap();
      toastManager.updateStatus(toastId, {
        render: "User promoted to admin successfully",
        type: "success",
      });
    } catch (error) {
      const message = error.data?.message || "An error occurred";
      toastManager.updateStatus(toastId, {
        render: message,
        type: "error",
      });
    }
  };

  const viewOrderHistory = (userId) => {
    router.push(`/admin/Orders?user=${userId}`);
  };

  const handleDeleteUser = async (userId) => {
    const toastId = toastManager.loading("Deleting user...");
    try {
      await deleteUser(userId).unwrap();
      toastManager.updateStatus(toastId, {
        render: "User deleted successfully",
        type: "success",
      });
    } catch (error) {
      const message = error.data?.message || "An error occurred";
      toastManager.updateStatus(toastId, {
        render: message,
        type: "error",
      });
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10 text-black">
        <h1 className="text-3xl font-bold mb-6">All Users</h1>
        <div className="mb-6 flex items-center space-x-4">
          <input
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Search users..."
            className="border p-2 px-4 rounded-lg w-full md:w-1/3 shadow-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full bg-white text-black shadow-lg rounded-lg overflow-hidden" {...getTableProps()}>
            <thead className="bg-gray-300">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} className="border-b">
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()} className="p-3 text-left font-semibold">
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.length > 0 ? (
                page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr
                      key={row.id}
                      {...row.getRowProps()}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()} className="p-3">
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={columns.length} className="p-3 text-center">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center items-center space-x-2 mt-6">
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
          >
            {"<<"}
          </button>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
          >
            {"<"}
          </button>
          <span className="text-lg font-semibold">
            Page <strong>{pageIndex + 1}</strong> of <strong>{pageCount}</strong>
          </span>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
          >
            {">"}
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
          >
            {">>"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default withAuth(AllUsers, { requireLogin: true, requireAdmin: true });
