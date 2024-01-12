/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CiCircleMore } from "react-icons/ci";
import { format, isBefore, parseISO } from "date-fns";
import DetailAnggota from "./Components/DetailAnggota";

const Anggota = () => {
  const [anggota, setAnggota] = useState([]);
  const [anggotaData, setAnggotaData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openDetailRow, setOpenDetailRow] = useState(null);

  const handleDetailClick = (npm) => {
    setOpenDetailRow(npm);
  };

  const handleCloseDetail = () => {
    setOpenDetailRow(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (navigator.onLine) {
          const responseAnggota = await axios.get("/api/anggota", {
            headers: { "Cache-Control": "no-cache" },
          });

          if (
            responseAnggota.data &&
            Array.isArray(responseAnggota.data.data)
          ) {
            // Mengolah data anggota dan menyertakan URL gambar
            const anggotaDenganGambar = responseAnggota.data.data.map(
              (anggota) => {
                // URL gambar dari data gambar yang diterima
                const imageUrl = `data:image/jpeg;base64,${anggota.images}`;

                // Membuat objek anggota baru dengan URL gambar
                return {
                  ...anggota,
                  imageUrl,
                };
              }
            );

            // Set data anggota ke dalam state
            setAnggotaData(anggotaDenganGambar);

            // Filter and set only 6 members for the current page
            const startIndex = (currentPage - 1) * 4;
            const endIndex = startIndex + 4;
            setAnggota(anggotaDenganGambar.slice(startIndex, endIndex));
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

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="ml-64 p-4 h-[625px] mt-24 bg-white">
      <h1 className="font-bold text-4xl">Anggota</h1>
      <div className="relative top-3 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-white border border-solid border-white">
          <thead className="text-xs uppercase border-2 text-center border-solid text-white bg-[#6DB9EF]">
            <tr>
              <th
                scope="col"
                className="px-2 py-3 border border-solid border-white text-center"
              >
                No
              </th>
              <th
                scope="col"
                className="w-[10%] px-4 py-3 border border-solid border-white text-center"
              >
                Foto
              </th>
              <th
                scope="col"
                className="w-1/24 px-4 py-3 border border-solid border-white text-center"
              >
                NPM
              </th>
              <th
                scope="col"
                className="w-[30%] px-6 py-3 border border-solid border-white text-left"
              >
                Nama
              </th>
              <th
                scope="col"
                className="w-[10%] px-2 py-3 border border-solid border-white text-left"
              >
                Jenis Kelamin
              </th>
              <th
                scope="col"
                className="w-[22%] px-4 py-3 border border-solid border-white text-left"
              >
                Prodi
              </th>
              <th
                scope="col"
                className="w-[15%] px-4 py-3 border border-solid border-white text-left"
              >
                Masa Berlaku
              </th>
              <th
                scope="col"
                className="w-[20%] px-4 py-3 border border-solid border-white text-left"
              >
                Status
              </th>
              <th
                scope="col"
                className="w-[20%] px-2 py-3 border border-solid border-white text-center"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {anggota.map((item, index) => (
              <tr
                key={item.npm}
                className={index % 2 === 0 ? "bg-[#A0E9FF]" : "bg-[#CDF5FD]"}
              >
                <td className="pl-3 py-3 border border-solid border-white text-gray-900 dark:text-black text-center">
                  {index + 1}
                </td>
                <td className="w-[15%] px-4 py-3 border border-solid text-gray-900 dark:text-black border-white text-center">
                  {item.images ? (
                    <img
                      src={`data:image/jpeg;base64,${item.images}`}
                      alt="Anggota"
                      className="w-full max-w-[90px]"
                    />
                  ) : (
                    <span>Foto Tidak Tersedia</span>
                  )}
                </td>
                <td className="w-1/24 px-4 py-3 border border-solid text-gray-900 dark:text-black border-white text-center">
                  {item.npm}
                </td>
                <td className="w-[30%] px-4 py-3 border border-solid text-gray-900 dark:text-black border-white text-left">
                  {item.nama}
                </td>
                <td className="w-[10%] px-4 py-3 border border-solid text-gray-900 dark:text-black border-white text-left">
                  {item.jenis_kelamin}
                </td>
                <td className="w-[22%] px-4 py-3 border border-solid text-gray-900 dark:text-black border-white text-left">
                  {item.prodi}
                </td>
                <td className="w-[10%] px-4 py-3 border border-solid text-gray-900 dark:text-black border-white text-left">
                  {/* Pastikan item.masa_berlaku didefinisikan sebelum parsing */}
                  {item.masa_berlaku && (
                    <span>
                      {format(parseISO(item.masa_berlaku), "dd-MM-yyyy")}
                    </span>
                  )}
                </td>
                <td className="w-[20%] px-2 py-3 border border-solid text-gray-900 dark:text-black border-white text-left">
                  {item.masa_berlaku ? (
                    <>
                      {isBefore(parseISO(item.masa_berlaku), new Date()) ? (
                        <span className="text-red-500">Non Aktif</span>
                      ) : (
                        <span className="text-green-500">Aktif</span>
                      )}
                    </>
                  ) : (
                    <span>Tidak Ada Masa Berlaku</span>
                  )}
                </td>
                <td className="w-[20%] px-2 py-3 border border-solid border-white text-center">
                  {/* Tambahkan tombol atau link untuk aksi yang diinginkan */}
                  <button
                    type="button"
                    className="flex items-center m-auto px-3 py-2 text-sm font-medium text-center bg-blue-700 
              text-white rounded-lg hover:bg-blue-800"
              onClick={() => handleDetailClick(item.npm)}
                  >
                    <CiCircleMore className="w-4 h-4 mr-2" />
                    Detail
                  </button>
                  {openDetailRow === item.npm && (
                    <DetailAnggota
                      npm={openDetailRow}
                      onClose={handleCloseDetail}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-[19px]">
        <button
          onClick={handlePrevPage}
          className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-md"
        >
          Prev Page
        </button>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Anggota;
