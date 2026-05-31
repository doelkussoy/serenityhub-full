import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

const NewKategori = () => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [newCategory, setNewCategory] = useState({
    name: '',
    image: '',
  });
  const [preview, setPreview] = useState([]);
  let imageData = new FormData();

  const onDrop = async (acceptedFiles) => {
    if (newCategory.image !== '') {
      toast.warning(`Maksimal 1 logo`, {
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
      setNewCategory({
        ...newCategory,
        image: getImage,
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
    multiple: false,
    maxFiles: 1,
    maxSize: 2097152,
  });

  const cancelUploadImage = async (itemIndex) => {
    const imageName = preview[itemIndex].image[0];
    const { data } = await axios.delete(
      `${import.meta.env.VITE_HOST_SERENITY}/delete/image/${imageName}`,
      {
        headers: {
          Authorization: `Bearer ${auth.user ? auth.token : ''}`,
        },
      },
    );
    if (data.status === 'ok') {
      const updatedUpload = preview.filter(
        (item, index) => index !== itemIndex,
      );
      setPreview(updatedUpload);
      setNewCategory({
        ...newCategory,
        image: '',
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
      toast.error(`Deleted image failed`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_HOST_SERENITY}/officer/category`,
        {
          ...newCategory,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.user ? auth.token : ''}`,
          },
        },
      );
      if (response.data.status === 'ok') {
        toast.success(`Kategori berhasil ditambahkan!`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        navigate('/dashboard/category');
      } else {
        toast.error(`Gagal menambahkan kategori ${response.data.message}`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      toast.error( `Error adding category: ${error}` , {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="m-2 my-8 md:px-4">
      <div className="animate__fadeIn animate__animated animate__delay-0.5s box-border rounded-3xl bg-white px-4 py-8 drop-shadow md:p-12 capitalize">
        <div className="flex items-center justify-center mb-4 md:mb-8 mx-auto">
          <h2 className="md:text-4xl ml-4 text-lg font-semibold text-primary-600">
            Tambah Kategori
          </h2>
        </div>
        <div className="flex flex-col">
          <label className="block mb-2 text-xs md:text-base text-gray-900 font-semibold">
            Nama Kategori
          </label>
          <input
            type="text"
            name="title"
            placeholder='Masukkan nama kategori'
            value={newCategory.name}
            onChange={(e) =>
              setNewCategory({
                ...newCategory,
                name: e.target.value,
              })
            }
            minLength="5"
            maxLength="50"
            required
            className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div className="col-span-1">
          <div className="">
            <label className="block my-2.5 text-xs md:text-base text-gray-900 font-semibold">
              Logo Kategori :
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
              <p className="text-center">Ukuran maksimal file: 2MB</p>
              <p className="text-center"> Maksimal 1 logo</p>
            </div>
          </div>
          <div className="col-span-1">
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
            <div className="text-center mt:4 md:mt-8 flex justify-end w-full">
              <button
                className="bg-blue-600 mt-4 py-2 px-6 rounded-lg focus:outline-none transition-all ease-out text-white hover:bg-blue-700 focus:bg-blue-900"
                onClick={(e) => handleSubmit(e)}
              >
                Kirim
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewKategori;
