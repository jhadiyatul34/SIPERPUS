import React, { useState, useEffect } from "react";
import { FaInfo } from "react-icons/fa";
import DetailPeminjaman from "./Components/DetailPeminjaman";

const Peminjaman = () => {
  const [dataPeminjaman, setDataPeminjaman] = useState([]);
  const [openDetailRow, setOpenDetailRow] = useState(null);

  const handleDetailClick = (idPeminjaman) => {
    setOpenDetailRow(idPeminjaman);
  };

  const handleCloseDetail = () => {
    setOpenDetailRow(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/peminjaman", {
          cache: "no-store", // Menonaktifkan caching
        });
        const data = await response.json();
        setDataPeminjaman(data.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!Array.isArray(dataPeminjaman)) {
    console.error(
      "Invalid data type for dataPeminjaman:",
      typeof dataPeminjaman
    );
    return null;
  }

  return (
    <div className="ml-64 p-4 mt-24 h-[625px] bg-white">
      <h1 className="font-bold text-4xl mb-4">Peminjaman</h1>
      <div className="relative top-3 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm  border border-solid border-white">
          <thead className="text-xs uppercase border-2 text-center border-solid text-white bg-[#6DB9EF]">
            <tr>
              <th className=" px-4 py-2">No</th>
              <th className=" px-4 py-2">ID Peminjaman</th>
              <th className=" px-4 py-2">NPM</th>
              <th className=" px-4 py-2">Tgl Pinjam</th>
              <th className=" px-4 py-2">Tgl Kembali</th>
              <th className=" px-4 py-2">Petugas</th>
              <th className=" px-4 py-2">Status</th>
              <th className=" px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {dataPeminjaman.map((peminjaman, index) => (
              <tr
                key={peminjaman.id_peminjaman}
                className={index % 2 === 0 ? "bg-[#CDF5FD]" : "bg-[#A0E9FF]"}
              >
                <td className="border border-gray-200 px-4 py-2">
                  {index + 1}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {peminjaman.id_peminjaman}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {peminjaman.npm}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {peminjaman.tanggalPeminjaman}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {peminjaman.tanggalPengembalian}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {peminjaman.Petugas.name}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  <p
                    className={`p-1 text-center rounded-lg ${
                      peminjaman.status === "Sudah Dikembalikan"
                        ? "bg-blue-500 text-white"
                        : "bg-rose-500 text-white"
                    }`}
                  >
                    {peminjaman.status}
                  </p>
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 flex items-center rounded"
                    onClick={() => handleDetailClick(peminjaman.id_peminjaman)}
                  >
                    <FaInfo className="w-3 h-3 mr-2" />
                    Detail
                  </button>
                  {openDetailRow === peminjaman.id_peminjaman && (
                    <DetailPeminjaman
                      idPeminjaman={openDetailRow}
                      onClose={handleCloseDetail}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Peminjaman;
