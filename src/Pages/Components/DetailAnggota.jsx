import { format, isBefore, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

const DetailAnggota = ({ npm, onClose }) => {
  const [detailAnggota, setDetailAnggota] = useState(null);

  useEffect(() => {
    const fetchDetailData = async () => {
      try {
        const response = await fetch(`/api/detailAnggota/${npm}`, {
          cache: "no-store",
        });
        const data = await response.json();

        console.log("Data:", data);

        if (!response.ok) {
          console.error("Failed to fetch detail data:", data);
          return;
        }

        // Handle ketika 'Peminjamans' adalah sebuah array
        const riwayatPeminjaman = Array.isArray(data.Peminjamans)
          ? data.Peminjamans
          : [data.Peminjamans];

        // Update property 'images'
        const updatedData = {
          ...data,
          images: data.images_base64,
          riwayatPeminjaman,
        };

        setDetailAnggota(updatedData);
      } catch (error) {
        console.error("Error fetching detail data:", error);
      }
    };

    fetchDetailData();
  }, [npm]);

  // ...

  if (!detailAnggota) {
    return null; //
  }

  const riwayatPeminjamanRows = detailAnggota.riwayatPeminjaman?.length > 0 ? (
    detailAnggota.riwayatPeminjaman.map((peminjaman) =>
      peminjaman.Detail && peminjaman.Detail.length > 0 ? (
        peminjaman.Detail.map((detail, index) => (
          <tr key={`${peminjaman.id_peminjaman}-${index}`}>
            {index === 0 ? (
              <>
                <td rowSpan={peminjaman.Detail.length} className="px-2">
                  {peminjaman.id_peminjaman}
                </td>
              </>
            ) : null}
            <td className="px-2">{detail.isbn || "N/A"}</td>
            <td className="px-2">{detail.Buku?.judul || "N/A"}</td>
            <td className="px-2">{detail.Buku?.kategori || "N/A"}</td>
            {index === 0 ? (
              <>
                <td rowSpan={peminjaman.Detail.length} className="px-2">
                  {peminjaman.tanggalPeminjaman}
                </td>
                <td rowSpan={peminjaman.Detail.length} className="px-2">{peminjaman.status}</td>
              </>
            ) : null}
          </tr>
        ))
      ) : (
        <tr key={peminjaman.id_peminjaman}>
          <td>{peminjaman.id_peminjaman}</td>
          <td>{"N/A"}</td>
          <td>{"N/A"}</td>
          <td>{"N/A"}</td>
          <td>{peminjaman.tanggalPeminjaman}</td>
          <td>{peminjaman.status}</td>
        </tr>
      )
    )
  ) : (
    // Kasus jika tidak ada riwayat peminjaman
    <tr>
      <td colSpan={6} className="text-center">Tidak ada Riwayat Peminjaman</td>
    </tr>
  );
  

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
      <div className="modal-container bg-white w-[780px] h-[80%] mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="w-[760px] pt-2 px-4 relative ">
          <div className="absolute top-2 right-0">
            <button onClick={onClose} className="text-black">
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
          <h2 className="text-2xl font-bold text-black text-center mt-5 mb-2">
            Biodata Anggota
          </h2>
          <div className="flex mt-3 gap-3 w-[742px]">
            <table className="w-full text-black">
              <tbody>
                <tr>
                  <td rowSpan="6">
                    {detailAnggota.images ? (
                      <img
                        src={`data:image/jpeg;base64,${detailAnggota.images}`}
                        alt="Anggota"
                        className="w-32 h-32 object-cover"
                      />
                    ) : (
                      <span className="text-black">Foto Tidak Tersedia</span>
                    )}
                  </td>
                  <td className="font-bold pr-2">Nama</td>
                  <td>:</td>
                  <td className="pl-2">{detailAnggota.nama}</td>
                </tr>
                <tr>
                  <td className="font-bold pr-2">NPM</td>
                  <td>:</td>
                  <td className="pl-2">{detailAnggota.npm}</td>
                </tr>
                <tr>
                  <td className="font-bold pr-2">Tempat, Tanggal Lahir</td>
                  <td>:</td>
                  <td className="pl-2">
                    {detailAnggota.tempat_lahir},{" "}
                    {format(
                      parseISO(detailAnggota.tanggal_lahir),
                      "dd-MM-yyyy"
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="font-bold pr-2">Jenis Kelamin</td>
                  <td>:</td>
                  <td className="pl-2">{detailAnggota.jenis_kelamin}</td>
                </tr>
                <tr>
                  <td className="font-bold pr-2">Prodi</td>
                  <td>:</td>
                  <td className="pl-2">{detailAnggota.prodi}</td>
                </tr>
                <tr>
                  <td className="font-bold pr-2">Fakultas</td>
                  <td>:</td>
                  <td className="pl-2">{detailAnggota.fakultas}</td>
                </tr>
              </tbody>
            </table>
            <table className="w-[50%] h-10 text-black">
              <tbody>
                <tr>
                  <td className="font-bold pr-2">No Hp</td>
                  <td>:</td>
                  <td className="pl-2">{detailAnggota.no_hp}</td>
                </tr>
                <tr>
                  <td className="font-bold pr-2">Alamat</td>
                  <td>:</td>
                  <td className="pl-2">{detailAnggota.alamat}</td>
                </tr>
                <tr>
                  <td className="font-bold pr-2 w-1/2">Masa Berlaku</td>
                  <td>:</td>
                  <td className="pl-2">
                    {format(parseISO(detailAnggota.masa_berlaku), "dd-MM-yyyy")}
                  </td>
                </tr>
                <tr>
                  <td className="font-bold">Status</td>
                  <td>:</td>
                  <td className="pl-2">
                    {detailAnggota.masa_berlaku ? (
                      <>
                        {isBefore(
                          parseISO(detailAnggota.masa_berlaku),
                          new Date()
                        ) ? (
                          <span className="text-red-500">Non Aktif</span>
                        ) : (
                          <span className="text-green-500">Aktif</span>
                        )}
                      </>
                    ) : (
                      <span>Tidak Ada Masa Berlaku</span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3 className="text-xl font-bold mt-5 text-black">
            Riwayat Peminjaman
          </h3>
          {detailAnggota.riwayatPeminjaman &&
          detailAnggota.riwayatPeminjaman.length > 0 ? (
            <table className="w-full h-full mt-3 text-sm text-black border border-solid border-black">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-2">ID Peminjaman</th>
                  <th className="px-2">ISBN</th>
                  <th className="px-2">Judul</th>
                  <th className="px-2">Kategori</th>
                  <th className="px-2">Tanggal Peminjaman</th>
                  <th className="px-2">Status</th>
                </tr>
              </thead>
              <tbody>{riwayatPeminjamanRows}</tbody>
            </table>
          ) : (
            <table className="w-full h-full mt-3 text-sm text-black border border-solid border-black">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-2">ID Peminjaman</th>
                  <th className="px-2">ISBN</th>
                  <th className="px-2">Judul</th>
                  <th className="px-2">Kategori</th>
                  <th className="px-2">Tanggal Peminjaman</th>
                  <th className="px-2">Status</th>
                </tr>
              </thead>
              <tbody>{riwayatPeminjamanRows}</tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailAnggota;
