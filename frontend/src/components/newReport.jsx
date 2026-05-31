import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
  useMapEvents,
} from 'react-leaflet';
import { toast } from 'react-toastify';

const NewReport = () => {
  const auth = useSelector((state) => state.auth);
  // Get coordinate

  const [defaultCoord, setDefaultCoord] = useState({
    latitude: '1.7575368113083125',
    longitude: '115.65804619654459',
    zoom: '3',
  });

  const { latitude, longitude } = defaultCoord;

  // Get cateogory
  const [categoryData, setCateogoryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_HOST_SERENITY}/category`,
        );
        setCateogoryData(data.data);
      } catch (error) {
        toast.error(`Error fetching data: ${error}`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    };

    fetchData();
  }, []);

  let imageData = new FormData();

  const [report, setReport] = useState({
    title: '',
    description: '',
    address: '',
    category: '',
    latitude: '',
    longitude: '',
    imageReport: [],
  });

  const [preview, setPreview] = useState([]);

  const onDrop = async (acceptedFiles) => {
    if (report.imageReport.length > 2) {
      toast.success(`Maksimal 3 foto`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      acceptedFiles.forEach((file) => {
        imageData.append('image', file);
      });
      const config = {
        headers: {
          Authorization: `Bearer ${auth.user ? auth.token : ''}`,
        },
      };
      const uploadImage = await axios.post(
        `${import.meta.env.VITE_HOST_SERENITY}/upload/image`,
        imageData,
        config,
      );
      const getImage = uploadImage.data.image;
      if (uploadImage.data.status === 'ok') {
        toast.success(`${uploadImage.data.message}`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.error(`Failed upload image`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
      setReport({
        ...report,
        imageReport: [...report.imageReport, uploadImage.data.image],
      });

      const newUpload = {
        image: [
          getImage,
          ...acceptedFiles.map((file) => URL.createObjectURL(file)),
        ],
      };
      setPreview((prevUpload) => [...prevUpload, newUpload]);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpg': ['.jpg'],
      'image/jpeg': ['.jpeg'],
    },
    multiple: true,
    maxFiles: 3,
    maxSize: 2097152,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (report)
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.user ? auth.token : ''}`,
          },
        };
        await axios
          .post(`${import.meta.env.VITE_HOST_SERENITY}/report`, report, config)
          .then((response) => {
            toast.success(`${response.data.message}`, {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          });

        setReport({
          title: '',
          description: '',
          address: '',
          category: '',
          latitude: '',
          longitude: '',
          imageReport: [],
        });

        setPreview([]);

        document.getElementById('image-dropzone').value = '';
      } catch (error) {
        toast.error(`Error submitting report: ${error}`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
  };

  const handleChange = (e) => {
    setReport({
      ...report,
      [e.target.name]: e.target.value,
    });
  };
  const config = {
    headers: {
      Authorization: `Bearer ${auth.user ? auth.token : ''}`,
    },
  };

  const cancelUploadImage = async (itemIndex) => {
    const imageName = preview[itemIndex].image[0];
    const result = await axios.delete(
      `${import.meta.env.VITE_HOST_SERENITY}/delete/image/${imageName}`,
      config,
    );
    if (result.data.status === 'ok') {
      toast.success(`${result.data.message}`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      toast.error(`Failed delete image`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
    const updatedUpload = preview.filter((item, index) => index !== itemIndex);
    setPreview(updatedUpload);

    const updatedImageReport = [...report.imageReport];
    updatedImageReport.splice(itemIndex, 1);

    setReport({
      ...report,
      imageReport: updatedImageReport,
    });
  };
  // Map
  // eslint-disable-next-line no-undef
  var newIcon = new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png`,
    shadowUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  function SetViewOnClick() {
    const map = useMapEvent('click', (e) => {
      map.setView(e.latlng, map.getZoom(), {
        animate: true,
      });
    });

    return null;
  }
  const MapEvents = () => {
    useMapEvents({
      click(e) {
        setReport((prev) => ({
          ...prev,
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
        }));
      },
    });
    return false;
  };

  const onMutate = async (e) => {
    if (typeof e.latlng === 'object') {
      setDefaultCoord((prev) => ({
        ...prev,
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
      }));
      setReport((prev) => ({
        ...prev,
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
      }));
    }
  };

  // show category
  const [showCategory, setShowCategory] = useState(false);

  return (
    <div className=" mx-auto md:px-4 transition-all ease-in duration-100">
      <div className="animate__fadeIn animate__animated animate__delay-0.5s box-border rounded-3xl bg-white px-4 py-8 drop-shadow md:p-12">
        <div className="flex items-center mb-2 md:mb-4 mx-auto">
          <h2 className="md:text-4xl ml-4 text-lg font-semibold text-primary-600">
            Buat Laporan
          </h2>
        </div>
        <hr className="bg-black p-[0.025rem] mb-8 md:mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div className="col-span-1">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col">
                <label className="block mb-2 text-xs md:text-base text-gray-900 font-semibold">
                  Judul Laporan:
                </label>
                <input
                  type="text"
                  name="title"
                  value={report.title}
                  onChange={handleChange}
                  minLength="5"
                  maxLength="50"
                  placeholder='Contoh: Jalan Rusak, Pohon Tumbang'
                  required
                  className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              <div className="flex flex-col">
                <label className="block mb-2 text-xs md:text-base text-gray-900 font-semibold">
                  Deskripsi Laporan:
                </label>
                <textarea
                  name="description"
                  value={report.description}
                  onChange={handleChange}
                  minLength="5"
                  maxLength="250"
                  placeholder='Contoh: Jalan rusak parah, tidak bisa dilewati'
                  required
                  className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              <div className="flex flex-col">
                <label className="block mb-2 text-xs md:text-base text-gray-900 font-semibold">
                  Lokasi Kejadian:
                </label>
                <input
                  type="text"
                  name="address"
                  value={report.address}
                  onChange={handleChange}
                  minLength="10"
                  placeholder='Contoh: Jalan Pahlawan, RT 01 RW 02'
                  required
                  className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              <div className="flex flex-col">
                <label className="block mb-2 text-xs md:text-base text-gray-900 font-semibold">
                  Titik Kejadian:
                </label>
                <MapContainer
                  center={[latitude, longitude]}
                  zoom={defaultCoord.zoom}
                  scrollWheelZoom={true}
                  // style={{ height: '200px' }}
                  className="h-48 min-h-full"
                >
                  <TileLayer
                    attribution='&copy; <a n href="http://osm.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker
                    draggable
                    position={[report.latitude, report.longitude]}
                    eventHandlers={{
                      click: (e) => onMutate(e),
                    }}
                    icon={newIcon}
                  >
                    <Popup>Titik Kejadian</Popup>
                    <MapEvents />
                    <SetViewOnClick />
                  </Marker>
                </MapContainer>
              </div>
            </form>
          </div>

          <div className="col-span-1">
            <div className="">
              <label className="block mb-2.5 text-xs md:text-base text-gray-900 font-semibold">
                Bukti Laporan:
              </label>
              <div
                {...getRootProps()}
                id="image-dropzone"
                className="border-2 border-dashed bg-gray-200 border-black p-5 mt-2"
              >
                <input {...getInputProps()} />
                <p className="text-center">
                  Klik disini untuk upload gambar (wajib)
                </p>
                <p className="text-center">Ukuran maksimal per file: 2MB</p>
                <p className="text-center">Bukti maskimal 3 foto</p>
              </div>
            </div>

            <div className="mt-4  mb-3 min-h-[11rem] h-fit">
              <label className="block mb-2 text-xs md:text-base text-gray-900 font-semibold ">
                Preview:
              </label>
              <div className="flex flex-col flex-wrap sm:flex-row">
                {preview &&
                  preview.map((item, index) => (
                    <div
                      key={index}
                      className="relative flex flex-col items-center space-x-2"
                    >
                      <img
                        src={item.image[1]}
                        alt={`Image ${index + 1}`}
                        className="max-w-24 h-32 mx-4 my-2"
                      />
                      <button
                        onClick={() => cancelUploadImage(index)}
                        className="absolute -top-4 -right-4 bg-transparent rounded-md p-2 inline-flex items-center justify-center text-gray-500 hover: hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                      >
                        <span className="sr-only">Hapus</span>
                        <svg
                          className="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col my-4">
          <label className="block mb-2 text-xs md:text-base text-gray-900 font-semibold">
            Kategori Laporan:
          </label>
          <div
            className="bg-gray-200 p-2 rounded-md relative cursor-pointer"
            onClick={() => setShowCategory(!showCategory)}
          >
            <div className="flex justify-between items-center">
              <span>
                {report.category ? report.category : 'Pilih kategori'}
              </span>
              <svg
                className={`w-4 h-4 transform transition-transform duration-200 ${
                  showCategory ? 'rotate-180' : 'rotate-0'
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
          </div>

          <div
            className={`flex flex-wrap justify-center bg-gray-100 cursor-pointer transition-all duration-200 ease-in-out ${
              showCategory ? 'opacity-100 max-h-full' : 'hidden'
            }`}
          >
            {categoryData.map((category, index) => (
              <div
                key={index}
                className="w-3/6  md:w-2/5 lg:w-[14.2857%] group p-4 text-center"
                onClick={() => {
                  setReport({ ...report, category: category.name });
                }}
              >
                <img
                  className="mx-auto w-5 h-5 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full group-hover:outline-none group-hover:ring-2 group-hover:ring-blue-500 group-hover:-translate-y-2 shadow-lg duration-100 ease-out"
                  src={`${import.meta.env.VITE_HOST_SERENITY}/public/image/${
                    category.image
                  }`}
                  alt={category.name}
                />
                <p className="mt-2 text-base text-[#64748BBF] group-hover:text-primary-600 group-hover:font-semibold group-hover:-translate-y-2">
                  {category.name}
                </p>
              </div>
            ))}
          </div>
        </div>

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
  );
};

export default NewReport;
