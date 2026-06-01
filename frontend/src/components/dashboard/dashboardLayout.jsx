import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../sideBar';
import TopBar from '../topBar';
import menus from '../../pages/menus';
import Footer from './footer';
import { Link } from 'react-router-dom';

function Dashboard({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsSidebarOpen(false);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full">
        <div className="flex items-center justify-between h-16 px-4 md:px-6 bg-gradient-to-r from-[#1a3a5c] to-[#2563eb] shadow-lg shadow-blue-900/20">
          {/* Left: Hamburger + Brand */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 md:hidden"
              aria-label="Toggle sidebar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isSidebarOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            {/* Desktop toggle */}
            <button
              type="button"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden md:flex p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
              aria-label="Toggle sidebar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link to="/" className="flex items-center gap-2 hover:opacity-85 transition-opacity">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </div>
              <span className="text-white font-bold text-lg tracking-wide">SerenityHub</span>
            </Link>
          </div>

          {/* Right: TopBar */}
          <TopBar />
        </div>
      </header>

      {/* Body: Sidebar + Main */}
      <div className="flex flex-1 relative">
        {/* Mobile Overlay */}
        {isMobile && isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed md:sticky top-16 left-0 z-40 h-[calc(100vh-4rem)]
            w-64 shrink-0
            transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            md:translate-x-0
            ${!isSidebarOpen && 'md:w-0 md:overflow-hidden'}
            ${isSidebarOpen && 'md:w-64'}
          `}
          style={{ willChange: 'transform' }}
        >
          <Sidebar
            menus={menus}
            closeSidebar={() => setIsSidebarOpen(false)}
          />
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-3 md:p-6 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

Dashboard.propTypes = {
  children: PropTypes.node,
};

export default Dashboard;
