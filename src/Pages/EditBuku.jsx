import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Editbuku = () => {
  const Navigate = useNavigate();
  const { isbn } = useParams();

  const handleBack = () => {
    Navigate("/buku");
  };

  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get(`/api/buku/${isbn}`);
        if (response.status === 200) {
          const bookData = response.data.data; // Sesuaikan dengan struktur respons yang diberikan oleh server
          setFormData({
            isbn: bookData.isbn,
            judul: bookData.judul,
            penulis: bookData.penulis,
            penerbit: bookData.penerbit,
            tahun: bookData.tahun,
            kategori: bookData.kategori,
            no_rak: bookData.no_rak,
          });
        } else {
          console.error(
            "Error fetching book data:",
            response.status,
            response.data
          );
        }
      } catch (error) {
        console.error("Error fetching book data:", error.message);
      }
    };

    fetchBookData();
  }, [isbn]);

  const handleSave = async () => {
    try {
      const response = await axios.patch(`/api/updateBuku/${isbn}`, formData);
      if (response.status === 200) {
        console.log("Data berhasil diubah:", response.data);
        Navigate("/buku");
      } else {
        console.error("Error updating book:", response.status, response.data);
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response from server:", error.response.data);
      } else if (error.request) {
        console.error("No response received from server:", error.request);
      } else {
        console.error("Error during request setup:", error.message);
      }
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="ml-64 p-4 h-[625px] mt-24 bg-white">
      <div className="flex justify-between p-4 bg-white">
        <div className="flex items-center">
          <button
            type="button"
            onClick={handleBack}
            className="rounded-full w-10 h-10 p-2 bg-blue-700 text-black mr-4"
          >
            <FaArrowLeft className="text-center m-auto" />
          </button>
          <h1 className="font-bold text-2xl">Edit Buku</h1>
        </div>
        <div className="flex">
          <button
            onClick={handleSave}
            className="flex items-center bg-blue-700 text-white px-4 py-2 rounded-l-lg"
          >
            Update Buku
          </button>
          <div className="bg-blue-800 text-white pr-4 pl-4 py-2 rounded-r-lg">
            <FaSave className="w-4 h-4 mt-1" />
          </div>
        </div>
      </div>
      <div className="mx-5 mt-5 mb-0 w-[97%] rounded-t-xl border border-gray-200 text-black bg-gray-50 p-4 dark:border-gray-600 dark:bg-black-700">
        Data Buku
      </div>
      <div className="h-[72%] w-[97%] rounded-b-xl mx-5 my-0 bg-[#6DB9EF] text-black px-10 py-9">
        <form action="POST">
          <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div class="sm:col-span-2">
              <label
                for="judul"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Judul
              </label>
              <input
                type="text"
                name="judul"
                id="judul"
                value={formData.judul} // Tambahkan ini untuk mengikuti nilai dari state
                onChange={handleInputChange} // Tambahkan ini untuk memanggil fungsi handleInputChange
                className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg 
                    focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                    dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required=""
              />
            </div>
            <div class="w-full">
              <label
                for="isbn"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ISBN
              </label>
              <input
                type="text"
                name="isbn"
                id="isbn"
                value={formData.isbn} // Tambahkan ini untuk mengikuti nilai dari state
                onChange={handleInputChange} // Tambahkan ini untuk memanggil fungsi handleInputChange
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Masukkan ISBN"
                required=""
              />
            </div>
            <div class="w-full">
              <label
                for="isbn"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                No Rak
              </label>
              <input
                type="text"
                name="no_rak"
                id="no_rak"
                value={formData.no_rak} // Tambahkan ini untuk mengikuti nilai dari state
                onChange={handleInputChange} // Tambahkan ini untuk memanggil fungsi handleInputChange
                className="bg-gray border border-gray-300 text-gray-900 text-sm rounded-lg 
                    focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                    dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required=""
              />
            </div>
            <div class="w-full">
              <label
                for="penulis"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Penulis
              </label>
              <input
                type="text"
                name="penulis"
                id="penulis"
                value={formData.penulis} // Tambahkan ini untuk mengikuti nilai dari state
                onChange={handleInputChange} // Tambahkan ini untuk memanggil fungsi handleInputChange
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Masukkan Penulis"
                required=""
              />
            </div>
            <div class="w-full">
              <label
                for="penerbit"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Penerbit
              </label>
              <input
                type="text"
                name="penerbit"
                id="penerbit"
                value={formData.penerbit} // Tambahkan ini untuk mengikuti nilai dari state
                onChange={handleInputChange} // Tambahkan ini untuk memanggil fungsi handleInputChange
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Masukkan Penerbit"
                required=""
              />
            </div>
            <div class="w-full">
              <label
                for="tahun"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tahun
              </label>
              <input
                type="text"
                name="tahun"
                id="tahun"
                value={formData.tahun} // Tambahkan ini untuk mengikuti nilai dari state
                onChange={handleInputChange} // Tambahkan ini untuk memanggil fungsi handleInputChange
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Masukkan Tahun"
                required=""
              />
            </div>
            <div>
              <label
                for="kategori"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Kategori
              </label>
              <select
                id="kategori"
                name="kategori"
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-800 
                    dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                value={formData.kategori} // Tambahkan ini untuk mengikuti nilai dari state
                onChange={handleInputChange} // Tambahkan ini untuk memanggil fungsi handleInputChange
              >
                <option value="">--Pilih Kategori--</option>
                <option value="Programming">Programming</option>
                <option value="Novel">Novel</option>
                <option value="Sosial">Sosial</option>
                <option value="Komunikasi">Komunikasi</option>
              </select>
            </div>
            <div class="w-full">
              <label
                for="no_rak"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              ></label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Editbuku;
