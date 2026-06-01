import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Header = () => {
  const auth = useSelector((state) => state.auth);

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };
  return (
    <header className='sticky top-0 z-50 w-full glass-nav transition-all duration-300'>
      <nav className='px-4 lg:px-6 py-3.5'>
        <div className='mx-auto flex max-w-screen-xl flex-wrap items-center justify-between'>
          <Link to='/' className='flex items-center space-x-3 hover:opacity-90 transition-opacity'>
            <div className='relative overflow-hidden rounded-full border-2 border-white shadow-sm'>
              <img src='/logo2.jpg' className='h-10 w-10 md:h-12 md:w-12 object-cover' alt='Logo SerenityHub' />
            </div>
            <span className='self-center whitespace-nowrap text-xl md:text-2xl font-bold text-slate-800 tracking-tight'>
              Serenity<span className="text-primary-600">Hub</span>
            </span>
          </Link>
          
          <button
            onClick={toggleNavbar}
            type='button'
            className='inline-flex items-center rounded-lg p-2 text-sm text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500 md:hidden transition-colors'
            aria-controls='navbar-default'
            aria-expanded={isNavbarOpen}
          >
            <span className='sr-only'>Buka menu utama</span>
            <svg className='h-6 w-6' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d={isNavbarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
          
          <div className={`w-full md:block md:w-auto ${isNavbarOpen ? 'block' : 'hidden'} mt-4 md:mt-0`} id='navbar-default'>
            <ul className='flex flex-col space-y-2 md:space-y-0 rounded-xl bg-white/80 p-4 font-medium shadow-glass md:flex-row md:space-x-8 md:bg-transparent md:p-0 md:shadow-none border md:border-0 border-slate-100 backdrop-blur-md md:backdrop-blur-none'>
              <li>
                <Link to='/' className='block rounded-lg md:rounded-none px-4 py-2.5 text-primary-600 font-semibold bg-primary-50 md:bg-transparent md:p-0 hover:text-primary-700 transition-colors'>
                  Beranda
                </Link>
              </li>
              <li>
                <a href='#alurAduan' className='block rounded-lg md:rounded-none px-4 py-2.5 text-slate-600 font-medium hover:bg-slate-50 md:hover:bg-transparent md:p-0 md:hover:text-primary-600 transition-colors'>
                  Alur Aduan
                </a>
              </li>
              <li>
                <a href='#kategori' className='block rounded-lg md:rounded-none px-4 py-2.5 text-slate-600 font-medium hover:bg-slate-50 md:hover:bg-transparent md:p-0 md:hover:text-primary-600 transition-colors'>
                  Kategori
                </a>
              </li>
              <li>
                <a href='#laporan' className='block rounded-lg md:rounded-none px-4 py-2.5 text-slate-600 font-medium hover:bg-slate-50 md:hover:bg-transparent md:p-0 md:hover:text-primary-600 transition-colors'>
                  Laporan
                </a>
              </li>
              <li className="pt-2 md:pt-0 md:ml-4">
                <Link 
                  to={auth.user ? '/dashboard' : '/login'} 
                  className='block w-full text-center rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-6 py-2.5 text-white font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transform transition-all'
                >
                  {auth.user ? 'Dashboard' : 'Masuk'}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
