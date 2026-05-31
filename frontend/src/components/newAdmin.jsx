import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function NewAdmin() {
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    role: 'admin',
    secretKey: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault;

    if (newAdmin.password !== newAdmin.confirmPassword) {
      toast.warning(`Pasword harus sama`, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_HOST_SERENITY}/admin/register`,
          {
            ...newAdmin,
          },
        );
        if (data.status === 'ok') {
          setNewAdmin({
            name: '',
            email: '',
            unitWork: '',
            secretKey: 'SerenityHub',
            password: '',
            confirmPassword: '',
          });
          toast.success(`${data.message}`, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          toast.error(`${data.message}`, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } catch (error) {
        toast.error(`${error}`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };
  return (
    <div className="mx-auto">
      <div className="animate__fadeIn animate__animated animate__delay-0.5s box-border rounded-3xl bg-white px-4 py-8 drop-shadow md:p-12 capitalize">
        <div className="my-8">
          <Link to="/" className="p-2 bg-blue-600 text-white">
            Back to Home
          </Link>
        </div>
        <div className="flex items-center mb-2 md:mb-4 mx-auto">
          <h2 className="md:text-4xl ml-4 text-lg font-semibold text-primary-600">
            Tambah Admin
          </h2>
        </div>
        <div
          data-aos="fade-zoom-in"
          data-aos-easing="ease-in-back"
          data-aos-duration="1000"
          data-aos-delay="200"
          data-aos-offset="0"
        >
          <div className="flex items-center animate__fadeIn animate__animated animate__delay-0.5s ">
            <div className="w-full">
              <form onSubmit={handleSubmit} className="space-y-4 ">
                <div className="flex flex-col">
                  <label className="block mb-2 text-xs md:text-base text-gray-900 font-semibold">
                    Nama :
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={newAdmin.name}
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, name: e.target.value })
                    }
                    minLength="5"
                    maxLength="50"
                    required
                    className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block mb-2 text-xs md:text-base text-gray-900 font-semibold">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={newAdmin.email}
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, email: e.target.value })
                    }
                    required
                    className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block mb-2 text-xs md:text-base text-gray-900 font-semibold">
                    Kode:
                  </label>
                  <input
                    name="password"
                    type="password"
                    placeholder='Tanyakan admin untuk mendapatkan kode'
                    value={newAdmin.secretKey}
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, secretKey: e.target.value })
                    }
                    required
                    className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block mb-2 text-xs md:text-base text-gray-900 font-semibold">
                    Password:
                  </label>
                  <input
                    name="password"
                    type="password"
                    value={newAdmin.password}
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, password: e.target.value })
                    }
                    required
                    className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block mb-2 text-xs md:text-base text-gray-900 font-semibold">
                    Konfirmasi Password:
                  </label>
                  <input
                    name="konfirmasi"
                    type="password"
                    value={newAdmin.confirmPassword}
                    onChange={(e) =>
                      setNewAdmin({
                        ...newAdmin,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                    className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                </div>
              </form>
              <div className="text-center mt:4 md:mt-8 w-full">
                <button
                  className="bg-blue-600 text-white w-full p-2 rounded"
                  onClick={(e) => handleSubmit(e)}
                >
                  Kirim
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
