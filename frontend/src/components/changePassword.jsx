import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ChangePassword() {
  const auth = useSelector((state) => state.auth);
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Mohon isi dengan benar');
      toast.warning(`Kata sandi baru dan konfirmasi kata sandi harus sama`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      try {
        const result = await axios.put(
          `${import.meta.env.VITE_HOST_SERENITY}/changepassword`,
          {
            ...passwordData,
          },
          {
            headers: {
              Authorization: `Bearer ${auth.user ? auth.token : ''} `,
            },
          },
        );
        if (result.data.status === 'ok') {
          setPasswordData({
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
          });

          toast.success(`${result.data.message}`, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          toast.error(`${result.data.message}`, {
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

    // Logika untuk mengganti password
  };
  return (
    <div className="h-screen w-full bg-[#3C8DBC] ">
      {' '}
      <div className="mx-auto  w-5/6 pt-10">
        <div className="animate__fadeIn animate__animated animate__delay-0.5s box-border rounded-3xl bg-white px-4 py-8 drop-shadow md:p-12 capitalize">
          <div className="my-8">
            <Link to="/dashboard" className="p-2 bg-blue-600 text-white">
              Back to Dashboard
            </Link>
          </div>
          <div className="flex items-center mb-2 md:mb-4 mx-auto">
            <h2 className="md:text-4xl ml-4 text-lg font-semibold text-primary-600">
              Ganti Kata Sandi
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
                <form onSubmit={handleChangePassword} className="space-y-4 ">
                  <div className="flex flex-col">
                    <label className="block mb-2 text-xs md:text-base text-gray-900 font-semibold">
                      Kata Sandi Sekarang:
                    </label>
                    <input
                      autoComplete="off"
                      type="password"
                      value={passwordData.oldPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          oldPassword: e.target.value,
                        })
                      }
                      required
                      className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="block mb-2 text-xs md:text-base text-gray-900 font-semibold">
                      Kata Sandi Baru:
                    </label>
                    <input
                      autoComplete="off"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          newPassword: e.target.value,
                        })
                      }
                      required
                      className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="block mb-2 text-xs md:text-base text-gray-900 font-semibold">
                      Konfirmasi Kata Sandi:
                    </label>
                    <input
                      autoComplete="off"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          confirmPassword: e.target.value,
                        })
                      }
                      required
                      className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                  </div>
                  <div className="text-center mt:4 md:mt-8 w-full">
                    <button
                      className="bg-blue-600 text-white w-full p-2 rounded"
                      onClick={(e) => handleChangePassword(e)}
                    >
                      Kirim
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
