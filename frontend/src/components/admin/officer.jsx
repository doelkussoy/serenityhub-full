/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Officer() {
  const auth = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [officerData, setOfficerData] = useState([]);
  const [unitWorkData, setUnitWorkData] = useState([]);
  const [reload, setReload] = useState(false);
  const [filter, setFilter] = useState('');

  const handleSelect = (option) => {
    setSelectedOption(option);
    setFilter(option._id);
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_HOST_SERENITY
          }/admin/officer?unitwork=${filter}`,
          {
            headers: {
              Authorization: `Bearer ${auth.user ? auth.token : ''}`,
            },
          },
        );
        setOfficerData(data.data);
        const dataUnitWork = await axios.get(
          `${import.meta.env.VITE_HOST_SERENITY}/officer/unitwork`,
          {
            headers: {
              Authorization: `Bearer ${auth.user ? auth.token : ''}`,
            },
          },
        );
        setUnitWorkData(dataUnitWork.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [filter, reload]);

  const handleSelectChange = (event) => {
    setFilter(event.target.value);
  };

  const handleDelete = async (officerName, id) => {
    const userConfirmation = window.confirm(
      `Apakah kamu yakin ingin menghapus kategori: ${officerName}?`,
    );
    if (!userConfirmation) {
      return;
    }
    try {
      const data = await axios.delete(
        `${import.meta.env.VITE_HOST_SERENITY}/admin/officer/${id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.user ? auth.token : ''}`,
          },
        },
      );
      // console.log(data);
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-2 my-8 md:px-4">
      <div className="animate__fadeIn animate__animated animate__delay-0.5s box-border rounded-3xl bg-white px-4 py-8 drop-shadow md:p-12 capitalize min-h-screen">
        <div
          className="w-full"
          data-aos="fade-zoom-in"
          data-aos-easing="ease-in-back"
          data-aos-duration="1000"
          data-aos-delay="200"
          data-aos-offset="0"
        >
          <div className="flex items-center justify-center animate__fadeIn animate__animated animate__delay-0.5s mb-6">
          <h1 className='text-center text-2xl md:text-5xl out text-primary-600 font-extrabold mb-8 uppercase'>daftar petugas</h1>
          </div>
          <div className="flex flex-row text-left justify-between ">
            <div className="relative w-44 md:w-[40%] z-40 mr-2">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-gray-200 p-2 rounded-md outline-none"
              >
                <div className="flex justify-between items-center">
                  <span className="md:text-base text-[0.65rem]">
                    {selectedOption ? selectedOption.name : 'Pilih unit kerja'}
                  </span>
                  <svg
                    className={`w-4 h-4 transform transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>
              {isOpen && (
                <ul className="absolute w-full mt-2 py-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto">
                  {unitWorkData.map((option) => (
                    <li
                      key={option._id}
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer md:text-base text-[0.65rem]"
                      onClick={() => handleSelect(option)}
                    >
                      {option.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button
              type="button"
              className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1 md:px-3 md:py-2 md:me-2 focus:outline-none"
            >
              <Link
                to="/dashboard/officer/new"
                className="text-center text-white md:text-base text-[0.65rem]"
              >
                Tambah <span className="hidden md:inline">Petugas</span>
              </Link>
            </button>
          </div>
          <div className="container mx-auto mt-8 text-left">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 capitalize ">
                <thead className="md:text-base text-[0.65rem] text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      no
                    </th>
                    <th scope="col" className="px-6 py-3">
                      nama petugas
                    </th>
                    {/* <th scope="col" className="px-6 py-3">
                      Staff
                    </th> */}
                    <th scope="col" className="px-6 py-3">
                      unit kerja
                    </th>
                    <th scope="col" className="px-6 py-3">
                      aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="md:text-base text-[0.65rem]">
                  {officerData &&
                    officerData.map((item, index) => (
                      <tr key={index}>
                        <td className="py-2 md:py-4 px-6 border-b group-hover:text-gray-600 group-hover:font-semibold group-hover:bg-gray-200 ease-in transition-all duration-100">
                          {index + 1}
                        </td>
                        <td className="py-2 md:py-4 px-6 border-b group-hover:text-gray-600 group-hover:font-semibold group-hover:bg-gray-200 ease-in transition-all duration-100">
                          {item.name}
                        </td>
                        {/* <td className="py-2 md:py-4 px-6 border-b group-hover:text-gray-600 group-hover:font-semibold group-hover:bg-gray-200 ease-in transition-all duration-100">
                          Petugas
                        </td> */}
                        <td className="py-2 md:py-4 px-6 border-b group-hover:text-gray-600 group-hover:font-semibold group-hover:bg-gray-200 ease-in transition-all duration-100">
                          {unitWorkData &&
                            unitWorkData
                              .filter((unit) =>
                                item.unitWork && item.unitWork.includes(unit._id),
                              )
                              .map((unit) => (
                                <div key={unit._id}>{unit.name}</div>
                              ))}
                        </td>
                        <td className="py-2 md:py-4 px-6 border-b group-hover:text-gray-600 group-hover:font-semibold group-hover:bg-gray-200 ease-in transition-all duration-100">
                          <button
                            className="bg-red-600 text-white w-full p-1 rounded border-b"
                            onClick={() => handleDelete(item.name, item._id)}
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
