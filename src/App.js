/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import 'bulma/css/bulma.min.css';
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Anggota from "./Pages/Anggota";
import Buku from "./Pages/Buku";
import Peminjaman from "./Pages/Peminjaman";
import User from "./Pages/User";
import TambahBuku from "./Pages/TambahBuku";
import EditBuku from "./Pages/EditBuku";
import Sidebar from "./Pages/Components/Sidebar";
import Navbar from "./Pages/Components/Navbar";
import { jwtDecode } from 'jwt-decode';
import Pengembalian from "./Pages/Pengembalian";
// import DetailPeminjaman from "./Pages/components/DetailPeminjaman";


const ProtectedRoute = ({ element, isLoggedIn, userRole }) => {
  return isLoggedIn ? (
    <>
      <Navbar />
      <Sidebar userRole={userRole} />
      {element}
    </>
  ) : (
    <Navigate to="/" />
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      
    
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          // Contoh: Memeriksa apakah token memiliki informasi nama pengguna
          const role = decodedToken.role;
          const username = decodedToken.username
          if ( username && role) {
            setIsLoggedIn(true);
            setUserRole(role);
          } else {
            console.log('Token tidak valid.');
          }
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      }
    
      setLoading(false);
    };
    
    checkLoginStatus();
    console.log('Memeriksa status login...');
  }, []);
  
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="/anggota"
            element={<ProtectedRoute element={<Anggota />} isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="/buku"
            element={<ProtectedRoute element={<Buku />} isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="/peminjaman"
            element={<ProtectedRoute element={<Peminjaman />} isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="/pengembalian"
            element={<ProtectedRoute element={<Pengembalian />} isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="/user"
            element={<ProtectedRoute element={<User />} isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="/tambah"
            element={<ProtectedRoute element={<TambahBuku />} isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="/edit/:isbn"
            element={<ProtectedRoute element={<EditBuku />} isLoggedIn={isLoggedIn} />}
          />
          {/* <Route
            path="/detailPeminjaman/:id_peminjaman"
            element={<ProtectedRoute element={<DetailPeminjaman />} isLoggedIn={isLoggedIn} />}
          /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
