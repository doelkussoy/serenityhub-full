/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function Footer() {
  const auth = useSelector(state=>state.auth)
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const useToggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', useToggleVisibility);

    return () => window.removeEventListener('scroll', useToggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <>
      <footer className='bg-[#1c2863] pt-10'>
        <div className='mx-auto px-4 pt-5'>
          <div className='mb-20 flex flex-col gap-8 justify-center md:justify-around md:flex-row '>
            <div>
              <h3 className='max-w-[496px] text-xl font-semibold text-white sm:text-5xl'>Apapun masalah bisa diatasi,</h3>
              <h3 className='max-w-[496px] text-xl font-semibold text-white sm:text-5xl'>laporkan masalah kamu disini !</h3>
              <div className='mt-5 flex items-center '>
                <div className='h-[0.15rem] w-12 bg-pink-200'></div>
                <h2 className='ml-4 text-lg font-semibold leading-tight text-pink-200'>PEMKOT KOTA SERANG</h2>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <a href='#'>
                <div className='text-center text-base sm:text-lg text-white transition duration-200 hover:text-blue-600 md:text-start'>Home</div>
              </a>
              <a href='#alurAduan'>
                <div className='text-center text-base sm:text-lg text-white transition duration-200 hover:text-blue-600 md:text-start'>Alur Aduan</div>
              </a>
              <a href='#kategori'>
                <div className='text-center text-base sm:text-lg text-white transition duration-200 hover:text-blue-600 md:text-start'>Kategori</div>
              </a>
              <a href='#laporan'>
                <div className='text-center text-base sm:text-lg text-white transition duration-200 hover:text-blue-600 md:text-start'>Laporan</div>
              </a>
              {/* <Link to={auth.user? '/dashboard': '/login'} className='text-center text-base sm:text-lg text-white transition duration-200 hover:text-blue-600 md:text-start underlined'>
               {auth.user? 'Dashboard': 'Login'}
              </Link> */}
            </div>
          </div>
          <hr className='bg-white' />
          <div className='flex items-center justify-between px-4 py-4 text-white md:px-8'>
            <h5 className='text-xs md:text-base'>Developed by <a className='text-blue-500' href='https://qoisabdulqudus.netlify.app/'>Qois Abdul Qudus</a> 2024 v1.0 © <a className='text-blue-500' href='https://serangkota.go.id/'>Pemkot Kota Serang</a></h5>
            <button onClick={scrollToTop} className={`transition duration-200 hover:text-blue-500 text-xs md:text-base ${isVisible ? 'block' : 'hidden'}`}>
              Back to top
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
