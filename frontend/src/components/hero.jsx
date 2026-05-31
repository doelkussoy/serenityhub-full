import { Link } from 'react-router-dom';
function Hero() {
  return (
    <section className='relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-login bg-pattern pt-20 pb-12'>
      {/* Decorative blurred shapes */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>

      <div className='container mx-auto px-4 md:px-12 lg:px-20 z-10 relative'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center'>
          
          {/* Text Content */}
          <div className='order-2 lg:order-1 flex flex-col justify-center items-center lg:items-start text-center lg:text-left'>
            <div className='inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm border border-white/40 px-4 py-2 rounded-full shadow-sm mb-6'>
              <span className='w-2 h-2 rounded-full bg-primary-600 animate-pulse'></span>
              <span className='text-sm font-semibold text-primary-700 tracking-wide uppercase'>PEMKOT KOTA SERANG</span>
            </div>
            
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-800 leading-tight mb-6'>
              SerenityHub : <br />
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-400'>
                Platform Pengaduan Masyarakat
              </span>
            </h1>
            
            <p className='text-base md:text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl'>
              Aplikasi pelaporan yang memfasilitasi komunikasi antara masyarakat dan pihak Pemkot Kota Serang. 
              Mari bersama-sama menciptakan lingkungan yang lebih baik, aman, dan tertib. 
              Sampaikan aspirasi atau laporan kejadian di sekitarmu dengan mudah.
            </p>
            
            <Link to={'/dashboard/report/new'} className='group inline-flex'>
              <div className='inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-600 to-primary-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 hover:from-primary-500 hover:to-primary-400'>
                <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 transform transition-transform duration-300 group-hover:-rotate-12' viewBox='0 0 20 20' fill='currentColor'>
                  <path fillRule='evenodd' d='M13 3H7a2 2 0 00-2 2v10a2 2 0 002 2h6a2 2 0 002-2V5a2 2 0 00-2-2zm-1 10H8a1 1 0 110-2h4a1 1 0 110 2zm0-4H8a1 1 0 110-2h4a1 1 0 110 2z' clipRule='evenodd' />
                </svg>
                <span>Buat Laporan Sekarang</span>
              </div>
            </Link>
          </div>

          {/* Image Content */}
          <div className='order-1 lg:order-2 flex justify-center lg:justify-end mb-8 lg:mb-0'>
            <div className='relative w-72 h-72 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] group perspective-1000'>
              <div className='absolute inset-0 bg-gradient-to-tr from-primary-400 to-blue-300 rounded-[2rem] transform rotate-6 scale-95 opacity-50 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-100'></div>
              <div className='relative w-full h-full rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl transform transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-3xl'>
                <img 
                  className='w-full h-full object-cover' 
                  src='/heros2.jpg' 
                  alt='Hero Ilustrasi SerenityHub' 
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
