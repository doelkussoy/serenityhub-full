/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Categories = () => {

  const [categoryData, setCateogoryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_HOST_SERENITY}/category`);
        setCateogoryData(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className='py-12 min-h-screen md:pt-24 bg-[#F7F7F7]'>
        <div data-aos='fade-zoom-in' data-aos-easing='ease-in-back' data-aos-duration='1000' data-aos-delay='200' data-aos-offset='0'>
          <h1 className='text-center text-2xl md:text-5xl out text-primary-600 font-extrabold mb-8 uppercase'>kategori</h1>
          <div className='flex flex-wrap justify-start '>
            {categoryData.map((category, index) => (
              <div key={index} className='w-1/2 sm:w-1/5 md:w-1/5 lg:w-[14.2857%] group p-4 text-center mb-8'>
                <img
                  className='mx-auto w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12'
                  src={`${import.meta.env.VITE_HOST_SERENITY}/public/image/${category.image}`}
                  alt={category.name}
                />
                <p className='mt-2 text-base text-[#64748BBF] group-hover:text-primary-600 group-hover:font-semibold'>{category.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
