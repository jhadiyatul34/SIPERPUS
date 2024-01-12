/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);
  const name = userData ? userData.name : null;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token : ", token);
        const response = await axios.get("/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          const user = response.data;
          setUserData(user);
          // Pastikan setUserData selesai sebelum melanjutkan
          // Lakukan sesuatu setelah setUserData selesai
          if (user.name) {
            fetchUserPhoto();
          }
        } else {
          console.error("Error fetching user data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    const fetchUserPhoto = async () => {
      try {
        const token = localStorage.getItem("token");

        if (name) {
          const response = await axios.get(`/auth/user/${name}/photo`, {
            responseType: "arraybuffer",
            headers: { Authorization: `Bearer ${token}` },
          });

          console.log("Response from server:", response);

          if (response.status === 200) {
            const arrayBufferView = new Uint8Array(response.data);
            const blob = new Blob([arrayBufferView], { type: "image/jpeg" });
            const photoUrl = URL.createObjectURL(blob);
            setUserPhoto(photoUrl);
          } else {
            console.error(
              "Error fetching user photo:",
              response.status,
              response.data
            );
          }
        }
      } catch (error) {
        console.error("Error fetching user photo:", error);
      }
    };

    fetchUserPhoto();
    fetchUserData();
  }, [name]);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // Definisikan fungsi checkLoginStatus di dalam komponen
  /* eslint-disable-next-line */
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    // Menghapus token dari local storage
    localStorage.removeItem("token");

    // Update state untuk menunjukkan bahwa pengguna tidak lagi login
    setIsLoggedIn(false);

    // Reload the page
    window.location.reload();

    // Navigate to the specified route (this won't be reached after reload)
    window.location.href = "/";
  };

  return (
    <nav className="bg-[#6DB9EF] p-4 flex justify-between items-center fixed w-full top-0 z-50">
      <div className="flex items-center">
        <img
          src={process.env.PUBLIC_URL + "/images/logo.png"}
          alt="Your Logo"
          className="w-[70px] m-2" // Sesuaikan ukuran logo sesuai dengan preferensi Anda
        />
        <span className="text-[#1D267D] font-bold ml-2 text-3xl font-[]">
          SIPERPUS
        </span>
      </div>
      <div className="relative ml-auto">
        <button
          id="dropdownUserAvatarButton"
          data-dropdown-toggle="dropdownAvatar"
          className="flex text-sm bg-gray-800 overflow-hidden rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 relative"
          type="button"
          onClick={toggleDropdown}
        >
          <span className="sr-only">Open user menu</span>
          <img
            className="w-10 h-10 object-cover object-center rounded-full"
            src={
              userPhoto
                ? userPhoto
                : userData && userData.filedata
                ? `data:image/jpeg;base64,${userData.filedata}`
                : "error"
            }
            alt="userphoto"
          />
        </button>

        {/* Dropdown menu */}
        {isDropdownOpen && (
          <div
            id="dropdownAvatar"
            className="z-10 absolute top-full right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 mt-2"
          >
            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
              <div>
                {userData ? (
                  <div>
                    <div>{userData.name}</div>
                    <div className="font-medium truncate">
                      {userData.role.toUpperCase()}
                    </div>
                  </div>
                ) : (
                  // Tambahkan logika untuk menampilkan sesuatu jika pengguna belum login
                  <div>Silakan login</div>
                )}
              </div>
            </div>
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownUserAvatarButton"
            >
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Settings
                </a>
              </li>
            </ul>
            <div className="py-2">
              <a
                onClick={handleLogout}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Logout
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
