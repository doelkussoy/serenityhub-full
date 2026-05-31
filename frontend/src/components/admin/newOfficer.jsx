import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function NewOfficer() {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [unitWorkData, setUnitWorkData] = useState([]);
  const [newOficer, setNewOfficer] = useState({
    name: '',
    email: '',
    role: 'officer',
    unitWork: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataUnitWork = await axios.get(`${import.meta.env.VITE_HOST_SERENITY}/officer/unitwork`, {
          headers: {
            Authorization: `Bearer ${auth.user ? auth.token : ''}`,
          },
        });
        if (dataUnitWork.data && dataUnitWork.data.data) {
          setUnitWorkData(dataUnitWork.data.data);
        } else {
          console.log('Unexpected data structure', dataUnitWork);
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, []);

  const handleSelectChange = (event) => {
    setNewOfficer({ ...newOficer, unitWork: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault;

    if (newOficer.password !== newOficer.confirmPassword) {
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
          `${import.meta.env.VITE_HOST_SERENITY}/officer/register`,
          {
            ...newOficer,
          },
          {
            headers: {
              Authorization: `Bearer ${auth.user ? auth.token : ''}`,
            },
          }
        );
        if (data.status === 'ok') {
          setNewOfficer({
            name: '',
            email: '',
            role: 'officer',
            unitWork: '',
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
          navigate('/dashboard/officer');
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
    <div className='mx-auto'>
      <div className='animate__fadeIn animate__animated animate__delay-0.5s box-border rounded-3xl bg-white px-4 py-8 drop-shadow md:p-12 capitalize'>
        <div className='flex items-center mb-2 md:mb-4 mx-auto'>
          <h2 className='md:text-4xl ml-4 text-lg font-semibold text-primary-600'>Tambah Petugas</h2>
        </div>
        <div data-aos='fade-zoom-in' data-aos-easing='ease-in-back' data-aos-duration='1000' data-aos-delay='200' data-aos-offset='0'>
          <div className='flex items-center animate__fadeIn animate__animated animate__delay-0.5s '>
            <div className='w-full'>
              <form onSubmit={handleSubmit} className='space-y-4 '>
                <div className='flex flex-col'>
                  <label className='block mb-2 text-xs md:text-base text-gray-900 font-semibold'>Nama Petugas:</label>
                  <input
                    type='text'
                    name='title'
                    value={newOficer.name}
                    onChange={(e) => setNewOfficer({ ...newOficer, name: e.target.value })}
                    minLength='5'
                    maxLength='50'
                    required
                    className='bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                  />
                </div>
                <div className='flex flex-col'>
                  <label className='block mb-2 text-xs md:text-base text-gray-900 font-semibold'>Email:</label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={newOficer.email}
                    onChange={(e) => setNewOfficer({ ...newOficer, email: e.target.value })}
                    required
                    className='bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                  />
                </div>
                <div className='flex flex-col'>
                  <label className='block mb-2 text-xs md:text-base text-gray-900 font-semibold'>Unit Kerja:</label>

                  <select
                    id='selectOption'
                    onChange={handleSelectChange}
                    value={newOficer.unitWork}
                    className='bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                  >
                    <option value='' disabled>
                      Pilih unit kerja
                    </option>
                    {unitWorkData.map((option) => (
                      <option key={option._id} value={option._id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='flex flex-col'>
                  <label className='block mb-2 text-xs md:text-base text-gray-900 font-semibold'>Password:</label>
                  <input
                    name='password'
                    type='password'
                    value={newOficer.password}
                    onChange={(e) => setNewOfficer({ ...newOficer, password: e.target.value })}
                    required
                    className='bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                  />
                </div>
                <div className='flex flex-col'>
                  <label className='block mb-2 text-xs md:text-base text-gray-900 font-semibold'>Konfirmasi Password:</label>
                  <input
                    name='konfirmasi'
                    type='password'
                    value={newOficer.confirmPassword}
                    onChange={(e) =>
                      setNewOfficer({
                        ...newOficer,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                    className='bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                  />
                </div>
              </form>
              <div className='text-center mt:4 md:mt-8 w-full'>
                <button className='bg-blue-600 text-white w-full p-2 rounded' onClick={(e) => handleSubmit(e)}>
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
