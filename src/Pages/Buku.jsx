import React, { useState, useEffect } from "react";
import { FaPlus, FaInfo, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DetailBuku from "./Components/DetailBuku";

const Buku = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Periksa koneksi sebelum mengirim permintaan
        if (navigator.onLine) {
          const response = await axios.get("/api/buku", {
            headers: { "Cache-Control": "no-cache" },
          });

          // Pastikan respons dari server memiliki properti "data" yang berisi array buku
          if (response.data && Array.isArray(response.data.data)) {
            setBooks(response.data.data);
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
  }, []); // <-- Pastikan Anda tidak lupa untuk menyertakan dependensi kosong agar useEffect dijalankan sekali
  const Navigate = useNavigate();

  const handleTambahClick = () => {
    // Navigate to the "/tambah" route
    Navigate("/tambah");
  };

  // State untuk nilai pencarian
  const [searchTerm, setSearchTerm] = useState("");

  // State untuk halaman yang aktif dan jumlah item per halaman
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Hitung indeks item pertama dan terakhir untuk halaman yang aktif
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = books.slice(indexOfFirstItem, indexOfLastItem);

  // Fungsi untuk pindah ke halaman sebelumnya
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  // Fungsi untuk pindah ke halaman berikutnya
  const handleNextPage = () => {
    setCurrentPage((prev) =>
      Math.min(prev + 1, Math.ceil(books.length / itemsPerPage))
    );
  };

  // Fungsi untuk memilih halaman
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [isDetailOpen, setIsDetailOpen] = useState(false); // State untuk menangani apakah popup DetailBuku terbuka atau tidak
  const [selectedBook, setSelectedBook] = useState(null); // State untuk menyimpan buku yang dipilih

  // Fungsi untuk menangani klik tombol "Detail"
  const handleDetailClick = (book) => {
    setSelectedBook(book);
    setIsDetailOpen(true);
  };

  // Fungsi untuk menangani tutup popup DetailBuku
  const handleCloseDetail = () => {
    setSelectedBook(null);
    setIsDetailOpen(false);
  };

  return (
        <div className="flex-grow ml-64 mt-24 p-4 h-[625px] bg-white">
          <h1 className="font-bold text-4xl">Buku</h1>
          <div className="flex top-2 items-center justify-between">
            <button
              onClick={handleTambahClick}
              type="button"
              className="flex items-center px-3 py-2 text-sm font-medium text-center bg-blue-700 
    text-white rounded-lg hover:bg-blue-800"
            >
              <FaPlus className="w-4 h-4 mr-2" />
              Tambah
            </button>

            {/* Input pencarian */}
            <input
              type="text"
              placeholder="Cari buku..."
              className="p-2 border border-gray-300 rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

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
                    className="w-1/24 px-4 py-3 border border-solid border-white text-center"
                  >
                    ISBN
                  </th>
                  <th
                    scope="col"
                    className="w-1/4 px-6 py-3 border border-solid border-white text-left"
                  >
                    Judul
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 border border-solid border-white text-left"
                  >
                    Penulis
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 border border-solid border-white text-left"
                  >
                    Penerbit
                  </th>
                  <th
                    scope="col"
                    className="w-1/24 px-4 py-3 border border-solid border-white text-center"
                  >
                    Tahun
                  </th>
                  <th
                    scope="col"
                    className="w-1/8 px-6 py-3 border border-solid border-white text-left"
                  >
                    Kategori
                  </th>
                  <th
                    scope="col"
                    className="w-1/24 px-4 py-3 border border-solid border-white text-left"
                  >
                    No Rak
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 border border-solid border-white text-center"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(currentItems) && currentItems.length > 0 ? (
                  currentItems
                    .filter((book) =>
                    book.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    book.kategori.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    book.penulis.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((book, index) => (
                      <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-[#CDF5FD]" : "bg-[#A0E9FF]"} // Warna latar belakang menjadi abu-abu muda
                    >
                      <td className="px-4 pt-4 font-medium text-gray-900 dark:text-black text-center">
                        {index + 1}
                      </td>
                      <td className="pl-[9px] py-4 text-center dark:text-black" >
                        {book.isbn}
                      </td>
                      <td className="px-3 py-4 text-left dark:text-black">
                        {book.judul}
                      </td>
                      <td className="px-3 py-4 text-left dark:text-black">
                        {book.penulis}
                      </td>
                      <td className="px-3 py-4 text-left dark:text-black">
                        {book.penerbit}
                      </td>
                      <td className="pl-[24px] py-4 text-center dark:text-black">
                        {book.tahun}
                      </td>
                      <td className="px-3 py-4 text-left dark:text-black">
                        {book.kategori}
                      </td>
                      <td className="pl-[33px] py-4 text-left dark:text-black">
                        {book.no_rak}
                      </td>
                      <td className="px-2 py-2 text-center dark:text-black">
                        <button
                          type="button"
                          className={`flex items-center m-auto px-3 py-2 text-sm font-medium text-center ${
                            index % 2 === 0 ? "bg-blue-300" : "bg-blue-500"
                          } text-white rounded-lg hover:bg-gray-400`}
                          onClick={() => handleDetailClick(book)}
                        >
                          <FaInfo className="w-3 h-3 mr-2" />
                          Detail
                        </button>
                      </td>
                    </tr>
                    ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="border border-solid border-white text-center"
                    >
                      Tidak ada data buku
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {/* Tampilkan popup DetailBuku jika isDetailOpen bernilai true */}
            {isDetailOpen && (
              <DetailBuku book={selectedBook} onClose={handleCloseDetail} />
            )}
            {/* Tampilkan navigasi halaman */}
            {Array.isArray(books) && books.length > itemsPerPage && (
              <div className="flex justify-end mr-3 my-3 items-center">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="mr-2"
                >
                  <FaArrowLeft className="w-5 h-5" />
                </button>
                {/* Menampilkan angka halaman yang dapat diklik */}
                <div className="flex space-x-2">
                  {[
                    ...Array(Math.ceil(books.length / itemsPerPage)).keys(),
                  ].map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageClick(page + 1)}
                      className={`px-2 py-1 rounded ${
                        page + 1 === currentPage
                          ? "bg-blue-700 text-white"
                          : "bg-gray-300"
                      }`}
                    >
                      {page + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleNextPage}
                  disabled={
                    currentPage === Math.ceil(books.length / itemsPerPage)
                  }
                  className="ml-2"
                >
                  <FaArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
  );
};

export default Buku;
