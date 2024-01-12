import axios from "axios";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const timestamp = new Date().getTime();
        const response = await axios.get(`/api/dataTerlambat?timestamp=${timestamp}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
    
    const interval = setInterval(() => {
      const now = new Date();
      const dateOptions = {
        timeZone: 'Asia/Jakarta',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      const timeOptions = {
        timeZone: 'Asia/Jakarta',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      };
      setCurrentDate(now.toLocaleString('id-ID', dateOptions));
      setCurrentTime(now.toLocaleString('id-ID', timeOptions));
    }, 1000);
    
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);
  
  function formatCurrency(amount) {
    // Ubah amount ke format mata uang Rupiah
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
  }

  return (
    <div className="ml-64 p-4 h-[625px] mt-24 bg-white">
      <h1 className="font-bold text-4xl">Dashboard</h1>
      <div className="flex space-x-4">
        <div className="w-2/3">
      <h2 className="mt-2 font-bold">Data Anggota Terlambat Mengembalikan Buku</h2>
      <table border="1" className="border border-solid mt-2 border-black rounded-md">
        <thead className="border border-solid text-center border-black bg-[#6DB9EF] uppercase w-[50%] ">
          <tr>
            <th className="px-3 py-3 border border-solid border-white text-gray-900 dark:text-black">No</th>
            <th className="pl-3 py-3 border border-solid border-white text-gray-900 dark:text-black">NPM</th>
            <th className="pl-3 py-3 border border-solid border-white text-gray-900 dark:text-black">Nama</th>
            <th className="px-3 py-3 border border-solid border-white text-gray-900 dark:text-black">Tgl Pinjam</th>
            <th className="px-3 py-3 border border-solid border-white text-gray-900 dark:text-black">Tgl Kembali</th>
            <th className="px-3 py-3 border border-solid border-white text-gray-900 dark:text-black">Terlambat</th>
            <th className="px-3 py-3 text-center border border-solid border-white text-gray-900 dark:text-black">Denda</th>
          </tr>
        </thead>
        <tbody className="border border-solid border-black">
          {data.map((item, index) => (
            <tr key={item.id_peminjaman}
            className={index % 2 === 0 ? "bg-[#A0E9FF]" : "bg-[#CDF5FD]"}>
              <td className="pl-3 py-3 border border-solid border-white text-gray-900 dark:text-black">{index + 1}</td>
              <td className="px-3 py-3 border border-solid border-white text-gray-900 dark:text-black">{item.npm}</td>
              <td className="px-3 w-1/6 py-3 border border-solid border-white text-gray-900 dark:text-black">{item.Anggota.nama}</td>
              <td className="pl-3 py-3 border border-solid border-white text-gray-900 dark:text-black">{item.tanggalPeminjaman}</td>
              <td className="pl-3 py-3 border border-solid border-white text-gray-900 dark:text-black">{item.tanggalPengembalian}</td>
              <td className="pl-3 py-3 border border-solid border-white text-gray-900 dark:text-black">{item.terlambat} Hari</td>
              <td
                    className={`w-1/6 px-4 py-3 border border-solid border-white text-right ${
                      item.denda === 0 ? "text-black" : "text-red-500"
                    }`}
                  >
                    {item.denda === 0
                      ? "Rp. 0"
                      : `${formatCurrency(item.totalDenda)}`}
                  </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className="w-1/3 p-4 bg-[#CDF5FD] rounded-md">
          <h2 className="text-2xl font-bold mb-2">Selamat Datang!</h2>
          <p>Semoga harimu menyenangkan.</p>
          <table>
            <tbody>
              <tr>
                <td className="pr-2">Tanggal</td>
                <td>:</td>
                <td className="pl-2">{currentDate}</td>
              </tr>
              <tr>
                <td className="pr-2">Waktu</td>
                <td>:</td>
                <td className="pl-2">{currentTime}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
