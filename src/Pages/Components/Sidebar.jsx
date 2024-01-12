/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import {
  FaBook,
  FaDatabase,
  FaUser,
  FaUserFriends,
  FaChartPie,
  FaTasks,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div>
      <aside
        id="default-sidebar"
        className="fixed top-5 left-0 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-[#3559E0]">
          <ul className="space-y-2 font-medium mt-20">
            <li>
              <Link
                to="/dashboard"
                className="flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 group"
              >
                <FaChartPie />
                <span className="flex-1 ms-3 whitespace-nowrap">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/anggota"
                className="flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 group"
              >
                <FaUserFriends />
                <span className="flex-1 ms-3 whitespace-nowrap">Anggota</span>
              </Link>
            </li>
            <li>
              <Link
                to="/buku"
                className="flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 group"
              >
                <FaBook />
                <span className="flex-1 ms-3 whitespace-nowrap">Buku</span>
              </Link>
            </li>
            <li>
              <Link
                to="/peminjaman"
                className="flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 group"
              >
                <FaDatabase />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Peminjaman
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/pengembalian"
                className="flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 group"
              >
                <FaTasks />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Pengembalian
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/user"
                className="flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 group"
              >
                <FaUser />
                <span className="flex-1 ms-3 whitespace-nowrap">User</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
