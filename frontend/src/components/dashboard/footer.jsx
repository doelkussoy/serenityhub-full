/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Footer() {
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
      <footer className='bottom-0 left-0 flex h-[7vh] w-full items-center bg-white shadow-lg shadow-slate-300'>
        <p className='ml-4 md:text-xs text-[0.6rem] font-semibold text-black'>
          Developed by{' '}
          <a className='text-blue-500' href='https://qoisabdulqudus.netlify.app/'>
            Qois Abdul Qudus
          </a>{' '}
          2024 v1.0 © <a className='text-blue-500' href='https://dishub.serangkota.go.id/'>Dishub Kota Serang</a>
        </p>
      </footer>
    </>
  );
}

export default Footer;
