import React, { useEffect, useState } from "react";
import axios from "axios";
// import { CiCircleMore } from "react-icons/ci";
// import { format, isBefore, parseISO } from "date-fns";

const Pengembalian = () => {
  const [pengembalian, setPengembalian] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (navigator.onLine) {
          const responsePengembalian = await axios.get("/api/pengembalian", {
            headers: { "Cache-Control": "no-cache" },
          });

          if (
            responsePengembalian.data &&
            Array.isArray(responsePengembalian.data.data)
          ) {
            const pengembalianData = responsePengembalian.data.data;

            // Set data pengembalian ke dalam state
            setPengembalian(pengembalianData);
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
  }, [currentPage]);

  function formatCurrency(amount) {
    // Ubah amount ke format mata uang Rupiah
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
  }

  return (
    <div className="ml-64 p-4 h-[625px] mt-24 bg-white">
      <h1 className="font-bold text-4xl">Pengembalian</h1>
      <div className="relative top-3 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-white border border-solid border-white">
          <thead className="text-xs uppercase border-2 text-center border-solid bg-[#6DB9EF]">
            <tr>
              <th
                scope="col"
                className="px-2 py-3 border border-solid border-white text-center"
              >
                No
              </th>
              <th
                scope="col"
                className="w-1/6 px-4 py-3 border border-solid border-white text-center"
              >
                ID Pengembalian
              </th>
              <th
                scope="col"
                className="w-1/6 px-4 py-3 border border-solid border-white text-center"
              >
                Tanggal Pengembalian
              </th>
              <th
                scope="col"
                className="w-1/6 px-4 py-3 border border-solid border-white text-center"
              >
                Denda
              </th>
              <th
                scope="col"
                className="w-1/6 px-4 py-3 border border-solid border-white text-center"
              >
                ID Peminjaman
              </th>
              <th
                scope="col"
                className="w-1/6 px-4 py-3 border border-solid border-white text-center"
              >
                NPM
              </th>
              <th
                scope="col"
                className="w-1/6 px-4 py-3 border border-solid border-white text-center"
              >
                Petugas
              </th>
            </tr>
          </thead>
          <tbody>
            {pengembalian.map((item, index) => (
              <tr
                key={item.id_pengembalian}
                className={index % 2 === 0 ? "bg-[#A0E9FF]" : "bg-[#CDF5FD]"}
              >
                <td className="pl-3 py-3 border border-solid border-white text-gray-900 dark:text-black text-center">
                  {index + 1}
                </td>
                <td className="w-1/6 px-4 py-3 border border-solid text-gray-900 dark:text-black border-white text-center">
                  {item.id_pengembalian}
                </td>
                <td className="w-1/6 px-4 py-3 border border-solid text-gray-900 dark:text-black border-white text-center">
                  {item.tanggalPengembalian}
                </td>
                <td
                    className={`w-1/6 px-2 py-3 border border-solid border-white text-right ${
                      item.denda === 0 ? "text-black" : "text-red-500"
                    }`}
                  >
                    {item.denda === 0
                      ? "Rp. 0"
                      : `${formatCurrency(item.denda)}`}
                  </td>
                <td className="w-1/6 px-4 py-3 border border-solid text-gray-900 dark:text-black border-white text-center">
                  {item.id_peminjaman}
                </td>
                <td className="w-1/6 px-4 py-3 border border-solid text-gray-900 dark:text-black border-white text-center">
                  {item.npm}
                </td>
                <td className="w-1/6 px-4 py-3 border border-solid text-gray-900 dark:text-black border-white text-center">
                  {item.Petugas.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pengembalian;
