import React, { useEffect, useState } from "react";
import axios from "axios";

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Periksa koneksi sebelum mengirim permintaan
        if (navigator.onLine) {
          const response = await axios.get("/api/users", {
            headers: { "Cache-Control": "no-cache" },
          });

          // Pastikan respons dari server memiliki properti "data" yang berisi array anggota
          if (response.data && Array.isArray(response.data.data)) {
            setUsers(response.data.data);
          } else {
            console.error("Invalid response format");
          }
        } else {
          console.error("Tidak ada koneksi internet.");
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="ml-64 mt-24 p-4 h-[625px] bg-white">
      <h1 className="font-bold text-4xl">User</h1>
      <div className="relative top-3 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-white border border-solid border-white">
          <thead className="text-xs uppercase border-2 text-center border-solid bg-[#6DB9EF]">
            <tr>
              <th
                scope="col"
                className="w-1/24 px-2 py-3 border border-solid border-white text-left"
              >
                No
              </th>
              <th
                scope="col"
                className="w-1/24 px-4 py-3 border border-solid border-white text-left"
              >
                Name
              </th>
              <th
                scope="col"
                className="w-1/4 px-6 py-3 border border-solid border-white text-left"
              >
                Role
              </th>
              <th
                scope="col"
                className="px-6 py-3 border border-solid border-white text-left"
              >
                Username
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => (
              <tr key={item.npm} 
              className={index % 2 === 0 ? "bg-[#A0E9FF]" : "bg-[#CDF5FD]"}>
                <td className="w-1/24 pl-5 py-3 border border-solid border-white text-gray-900 dark:text-black text-left">
                  {index + 1}
                </td>
                <td className="w-1/24 px-4 py-3 border border-solid text-gray-900 dark:text-black border-white text-left">
                  {item.name}
                </td>
                <td className="w-1/4 px-6 py-3 border border-solid text-gray-900 dark:text-black border-white text-left">
                  {item.role}
                </td>
                <td className="px-6 py-3 border border-solid text-gray-900 dark:text-black border-white text-left">
                  {item.username}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
