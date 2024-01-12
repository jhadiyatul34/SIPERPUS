import axios from "axios";
import React, { useState } from "react";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DetailBuku = ({ book, onClose }) => {
  const Navigate = useNavigate(); // Gunakan useNavigate untuk navigasi
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);

  const onEdit = () => {
    // Navigasi ke halaman EditBuku atau komponen EditBuku
    Navigate(`/edit/${book.isbn}`);
  };

  const onDelete = () => {
    setConfirmationVisible(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      // Menghapus buku setelah konfirmasi
      const response = await axios.delete(`/api/hapusBuku/${book.isbn}`);
      if (response.status === 200) {
        console.log("Buku berhasil dihapus:", response.data.message);
        // Menutup popup konfirmasi setelah berhasil dihapus
        setConfirmationVisible(false);
        // Menampilkan popup berhasil dihapus
        setSuccessMessageVisible(true);

        setTimeout(() => {
          setSuccessMessageVisible(false);
          window.location.reload(); // Reload the page
        }, 1000);
      } else {
        console.error("Error deleting book:", response.status, response.data);
      }
    } catch (error) {
      console.error("Error deleting book:", error.message);
    }
  };

  const handleConfirmation = () => {
    // Menutup popup konfirmasi jika pengguna memilih "Tidak"
    setConfirmationVisible(false);
  };

  const [isSuccessMessageVisible, setSuccessMessageVisible] = useState(false);


  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded-md">
        <div className="flex justify-end">
          <button onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-4">Detail Buku</h2>
        {book && (
          <table className="w-full">
            <tbody>
              <tr>
                <td>
                  <strong>ISBN</strong>
                </td>
                <td>:</td>
                <td className="pl-2">{book.isbn}</td>
              </tr>
              <tr>
                <td>
                  <strong>Judul</strong>
                </td>
                <td>:</td>
                <td className="pl-2">{book.judul}</td>
              </tr>
              <tr>
                <td>
                  <strong>Penulis</strong>
                </td>
                <td>:</td>
                <td className="pl-2">{book.penulis}</td>
              </tr>
              <tr>
                <td>
                  <strong>Penerbit</strong>
                </td>
                <td>:</td>
                <td className="pl-2">{book.penerbit}</td>
              </tr>
              <tr>
                <td>
                  <strong>Tahun</strong>
                </td>
                <td>:</td>
                <td className="pl-2">{book.tahun}</td>
              </tr>
              <tr>
                <td>
                  <strong>Kategori</strong>
                </td>
                <td>:</td>
                <td className="pl-2">{book.kategori}</td>
              </tr>
              <tr>
                <td>
                  <strong>No Rak</strong>
                </td>
                <td>:</td>
                <td className="pl-2">{book.no_rak}</td>
              </tr>
            </tbody>
          </table>
        )}
        <div className="flex justify-between gap-10 mt-6">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-600"
            onClick={onEdit}
          >
            <FaEdit className="mr-2" /> Edit
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-red-600"
            onClick={onDelete}
          >
            <FaTrash className="mr-2" /> Hapus
          </button>
        </div>
      </div>

      {isConfirmationVisible && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <p>Apakah Anda yakin ingin menghapus buku ini?</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleDeleteConfirmed}
                className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-red-600"
              >
                Ya
              </button>
              <button
                onClick={handleConfirmation}
                className="bg-gray-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-gray-600"
              >
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}

      {isSuccessMessageVisible && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <p>Buku berhasil dihapus!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailBuku;
