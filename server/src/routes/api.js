const express = require("express");
const router = express.Router();
const { Book, Anggota, User, Peminjaman, DetailPeminjaman, Pengembalian, } = require("../models");
const { Sequelize, Op } = require("sequelize");
//ini ngambilnya dari file model server tapi cuma ngambil inisialisasi hasis kata const

router.get("/users", async (req, res) => {
  const { page = 1, limit = 10, order = "id" } = req.query;

  try {
    const offset = (page - 1) * limit;

    // Mengambil data buku dari tabel 'users' dengan paginasi dan pengurutan
    const users = await User.findAll({
      //User.fineAll diambil dari users.js inisialisasi sehabis katra const
      offset,
      limit: parseInt(limit),
      order: [[order, "ASC"]],
    });

    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        error: "No books found",
      });
    }

    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

router.get("/anggota", async (req, res) => {
  const { page = 1, limit = 10, order = "npm" } = req.query;

  try {
    const offset = (page - 1) * limit;

    const anggota = await Anggota.findAll({
      offset,
      limit: parseInt(limit),
      order: [[order, "ASC"]],
      attributes: [
        "npm",
        "nama",
        "prodi",
        "jenis_kelamin",
        "masa_berlaku",
        "no_hp",
        "images",
      ],
    });

    if (!anggota || anggota.length === 0) {
      return res.status(404).json({
        success: false,
        error: "No members found",
      });
    }

    // Mengonversi setiap gambar ke format Base64
    const anggotaData = anggota.map((data) => {
      if (data.images) {
        // Mengonversi gambar Buffer ke format Base64
        const base64Image = Buffer.from(data.images, "binary").toString(
          "base64"
        );

        // Mengembalikan objek anggota dengan data gambar yang sudah dikonversi
        return {
          npm: data.npm,
          nama: data.nama,
          prodi: data.prodi,
          jenis_kelamin: data.jenis_kelamin,
          masa_berlaku: data.masa_berlaku,
          no_hp: data.no_hp,
          images: base64Image,
        };
      } else {
        return {
          npm: data.npm,
          nama: data.nama,
          prodi: data.prodi,
          jenis_kelamin: data.jenis_kelamin,
          masa_berlaku: data.masa_berlaku,
          no_hp: data.no_hp,
          images: null,
        };
      }
    });

    res.json({
      success: true,
      data: anggotaData,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

router.get("/detailAnggota/:npm", async (req, res) => {
  const npm = req.params.npm;

  try {
    const result = await Anggota.findOne({
      attributes: [
        // Ubah longblob image ke base64
        [Sequelize.fn("TO_BASE64", Sequelize.col("images")), "images_base64"],
        "npm",
        "nama",
        "tempat_lahir",
        "tanggal_lahir",
        "jenis_kelamin",
        "prodi",
        "fakultas",
        "no_hp",
        "masa_berlaku",
        "alamat",
      ],
      where: { npm: npm },
      include: [
        {
          model: Peminjaman,
          attributes: ["id_peminjaman", "tanggalPeminjaman", "status"],
          where: { npm: npm },
          required: false, // Ubah ke LEFT JOIN
          include: [
            {
              model: DetailPeminjaman,
              attributes: ["isbn"],
              as: "Detail",
              include: [
                {
                  model: Book,
                  attributes: ["judul", "kategori"],
                  as: "Buku",
                },
              ],
            },
          ],
        },
      ],
    });

    if (!result) {
      return res.status(404).json({ message: "Anggota not found" });
    }

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/peminjaman", async (req, res) => {
  const { page = 1, limit = 10, order = "id_peminjaman" } = req.query;

  try {
    const offset = (page - 1) * limit;

    // Mengambil data peminjaman dengan JOIN pada tabel user
    const peminjaman = await Peminjaman.findAll({
      offset,
      limit: parseInt(limit),
      order: [[order, "ASC"]],
      include: [
        {
          model: User,
          attributes: ["name"], // Pilih kolom yang ingin diambil dari tabel User
          as: "Petugas", // Alias untuk mengakses data user (nama user) di hasil query
        },
      ],
    });

    if (!peminjaman || peminjaman.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Tidak Ada Peminjaman",
      });
    }

    res.json({
      success: true,
      data: peminjaman,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

router.get("/pengembalian", async (req, res) => {
  const { page = 1, limit = 10, order = "id_peminjaman" } = req.query;

  try {
    const offset = (page - 1) * limit;

    // Mengambil data buku dari tabel 'Books' dengan paginasi dan pengurutan
    const pengembalian = await Pengembalian.findAll({
      offset,
      limit: parseInt(limit),
      order: [[order, "ASC"]],
      include: [
        {
          model: User,
          attributes: ["name"], // Pilih kolom yang ingin diambil dari tabel User
          as: "Petugas", // Alias untuk mengakses data user (nama user) di hasil query
        },
      ],
    });

    if (!pengembalian || pengembalian.length === 0) {
      return res.status(404).json({
        success: false,
        error: "No found",
      });
    }

    res.json({
      success: true,
      data: pengembalian,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

router.get("/detail/:id_Peminjaman", async (req, res) => {
  try {
    const idPeminjaman = req.params.id_Peminjaman;

    // Fetch data dari dua tabel menggunakan Sequelize query
    const result = await Peminjaman.findOne({
      attributes: [
        "id_peminjaman",
        "npm",
        "tanggalPeminjaman",
        "tanggalPengembalian",
        "status",
        "denda",
      ],
      where: { id_peminjaman: idPeminjaman },
      include: [
        {
          model: DetailPeminjaman,
          attributes: ["isbn"],
          as: "Detail",
          where: { id_peminjaman: idPeminjaman },
          include: [
            {
              model: Book,
              attributes: ["judul", "kategori"], // masukkan fields 'judul' dan 'kategori' 
              as: "Buku",
            },
          ],
        },
      ],
    });

    if (!result) {
      return res.status(404).json({ error: "Data not found" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/dataTerlambat", async (req, res) => {
  try {
    const result = await Peminjaman.findAll({
      attributes: [
        "id_peminjaman",
        "npm",
        "tanggalPeminjaman",
        "tanggalPengembalian",
        ["denda", "totalDenda"],
        [
          Sequelize.literal(`
            CASE
              WHEN denda > 0 THEN DATEDIFF(CURRENT_DATE, tanggalPengembalian)
              ELSE 0
            END
          `),
          "terlambat",
        ],
      ],
      include: [
        {
          model: Anggota,
          attributes: ["nama"],
          as: "Anggota",
        },
      ],
      where: {
        denda: {
          [Op.gt]: 0, // hanya masukan baris yang dimana denda lebih besar dari 0
        },
      },
    });

    if (!result || result.length === 0) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/buku", async (req, res) => {
  const { page = 1, limit = 10, order = "judul" } = req.query;

  try {
    const offset = (page - 1) * limit;

    // Mengambil data buku dari tabel 'Books' dengan paginasi dan pengurutan
    const buku = await Book.findAll({
      offset,
      limit: parseInt(limit),
      order: [[order, "ASC"]],
    });

    if (!buku || buku.length === 0) {
      return res.status(404).json({
        success: false,
        error: "No books found",
      });
    }

    res.json({
      success: true,
      data: buku,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

router.post("/tambahBuku", async (req, res) => {
  try {
    // Mendapatkan data buku dari body request
    const { isbn, judul, penulis, penerbit, tahun, kategori, no_rak } = req.body;

    // Menambahkan buku ke dalam tabel 'Books'
    const bukuBaru = await Book.create({
      isbn,
      judul,
      penulis,
      penerbit,
      tahun,
      kategori,
      no_rak,
    });

    res.json({
      success: true,
      data: bukuBaru,
    });
  } catch (error) {
    console.error("Error:", error.message);

    // Menangani kesalahan validasi Sequelize
    if (error.name === "SequelizeValidationError") {
      console.error("Validation Errors:", error.errors);

      // Mengumpulkan pesan validasi menjadi array
      const validationErrors = error.errors.map((err) => ({
        field: err.path,
        message: err.message,
      }));

      res.status(400).json({
        success: false,
        error: "Validation Error",
        details: validationErrors,
      });
    } else {
      // Mengembalikan respons API yang menyatakan kegagalan jika terjadi kesalahan selain validasi
      res.status(500).json({
        success: false,
        error: "Internal Server Error",
        details: error.message,
      });
    }
  }
});

router.patch("/updateBuku/:isbn", async (req, res) => {
  try {
    const { isbn, judul, penulis, penerbit, tahun, kategori, no_rak } =
      req.body;

    // Cari buku berdasarkan ISBN
    const existingBook = await Book.findOne({ where: { isbn } });

    if (!existingBook) {
      return res.status(404).json({ message: "Buku tidak ditemukan" });
    }

    // Lakukan pembaruan data buku
    const updatedBook = await existingBook.update({
      judul,
      penulis,
      penerbit,
      tahun,
      kategori,
      no_rak,
    });

    // Mengembalikan data buku yang baru diperbarui sebagai respons API
    res.json({
      success: true,
      data: updatedBook,
    });
  } catch (error) {
    console.error("Error:", error.message);
    // Mengembalikan respons API yang menyatakan kegagalan jika terjadi kesalahan
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

router.delete("/hapusBuku/:isbn", async (req, res) => {
  try {
    const { isbn } = req.params;

    // Cari buku berdasarkan ISBN
    const existingBook = await Book.findOne({ where: { isbn } });

    if (!existingBook) {
      return res
        .status(404)
        .json({ success: false, error: "Buku tidak ditemukan" });
    }

    // Hapus buku dari database
    await existingBook.destroy();

    // Mengembalikan respons sukses
    res.json({
      success: true,
      message: "Buku berhasil dihapus",
    });
  } catch (error) {
    console.error("Error:", error.message);
    // Mengembalikan respons API yang menyatakan kegagalan jika terjadi kesalahan
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

router.get("/buku/:isbn", async (req, res) => {
  try {
    const { isbn } = req.params;

    // Mengambil data buku berdasarkan ISBN
    const buku = await Book.findOne({
      where: {
        isbn: isbn,
      },
    });

    if (buku) {
      // Mengembalikan data buku sebagai respons API jika ditemukan
      res.json({
        success: true,
        data: buku,
      });
    } else {
      // Mengembalikan respons API bahwa buku tidak ditemukan
      res.status(404).json({
        success: false,
        error: "Buku tidak ditemukan",
      });
    }
  } catch (error) {
    console.error("Error:", error.message);
    // Mengembalikan respons API yang menyatakan kegagalan jika terjadi kesalahan
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

module.exports = router;
