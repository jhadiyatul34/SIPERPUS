import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const DetailPeminjaman = ({ idPeminjaman, onClose }) => {
  const [detailData, setDetailData] = useState(null);

  useEffect(() => {
    const fetchDetailData = async () => {
      try {
        const response = await fetch(`/api/detail/${idPeminjaman}`, {
          cache: "no-store", // Menonaktifkan caching
        });
        const data = await response.json();
        console.log("Data Detail:", data);

        setDetailData(data || null);
      } catch (error) {
        console.error("Error fetching detail data:", error);
      }
    };

    fetchDetailData();
  }, [idPeminjaman]);

  if (!detailData) {
    return null; // Kamu bisa merender sebuah state loading atau handle berdasarkan apa yang kamu inginkan
  }

  function formatCurrency(amount) {
    // Ubah amount ke format mata uang Rupiah
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
      <div className="modal-container bg-white w-[660px] h-[80%] mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content pt-2 px-2 relative">
          <div className="absolute top-2 right-0">
            <button onClick={onClose} className="text-black">
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
          <h2 className="text-2xl font-bold text-center mt-5 mb-2">
            Detail Peminjaman
          </h2>
          <div className="flex mt-3 gap-[90px]">
            <table className="w-[300px]">
              <tbody>
                <tr>
                  <td className="font-bold pr-2">ID Peminjaman</td>
                  <td>:</td>
                  <td className="pl-2">{detailData.id_peminjaman}</td>
                </tr>
                <tr>
                  <td className="font-bold pr-2">NPM</td>
                  <td>:</td>
                  <td className="pl-2">{detailData.npm}</td>
                </tr>
                <tr>
                  <td className="font-bold pr-2">Status</td>
                  <td>:</td>
                  <td>
                    <p
                      className={`ml-2 py-[2px] text-center rounded-lg ${
                        detailData.status === "Sudah Dikembalikan"
                          ? "bg-blue-500 text-white"
                          : "bg-rose-500 text-white"
                      }`}
                    >
                      {detailData.status}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>

            <table>
              <tbody>
                <tr>
                  <td className="font-bold pr-2">Tanggal Pinjam</td>
                  <td>:</td>
                  <td className="pl-2">{detailData.tanggalPeminjaman}</td>
                </tr>
                <tr>
                  <td className="font-bold pr-2">Tanggal Kembali</td>
                  <td>:</td>
                  <td className="pl-2">{detailData.tanggalPengembalian}</td>
                </tr>
                <tr>
                  <td className="font-bold pr-2">Denda</td>
                  <td>:</td>
                  <td
                    className={`pl-2 ${
                      detailData.denda === 0 ? "text-black" : "text-red-500"
                    }`}
                  >
                    {detailData.denda === 0
                      ? "Rp. 0"
                      : `${formatCurrency(detailData.denda)}`}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-bold my-4">Buku yang Dipinjam:</h3>
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-200 px-4 py-2">ISBN</th>
                <th className="border border-gray-200 px-4 py-2">Judul</th>
                <th className="border border-gray-200 px-4 py-2">Kategori</th>
              </tr>
            </thead>
            <tbody>
              {detailData.Detail.map((detail, index) => (
                <tr key={index}>
                  <td className="border border-gray-200 px-4 py-2">
                    {detail.isbn}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {detail.Buku?.judul}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {detail.Buku?.kategori}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {detailData.status !== "Sudah Dikembalikan" && (
            <button
              // onClick={() => handleReturn(idPeminjaman)} // Tambahkan function untuk handle sebuah action
              className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4 ml-[480px]"
            >
              Sudah Dikembalikan
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailPeminjaman;
