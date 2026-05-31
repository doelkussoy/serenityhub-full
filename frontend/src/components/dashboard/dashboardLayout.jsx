import { useState } from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../sideBar';
import TopBar from '../topBar';
import menus from '../../pages/menus';
import Footer from './footer';

function Dashboard({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="relative">
      <div className="left-0 top-0 flex h-[7vh] w-full items-center justify-between bg-[#3C8DBC] p-8  sticky top-0 z-50">
        <div>
          <h3 className="text-start font-semibold text-white">SerenityHub</h3>
        </div>
        <button
          type="button"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`absolute left-0 top-[3.8rem] z-[9999] ml-3 mt-2 block items-center rounded-lg p-2 text-sm text-gray-500 transition-transform duration-500 ease-in-out bg-gray-300  hover:bg-gray-100 focus:outline-none focus:ring-2 dark:text-gray-400 sm:hidden ${
            isSidebarOpen ? 'translate-x-56 left-7' : ''
          }`}
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="h-6 w-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>
        <TopBar />
      </div>
      <div className="flex min-h-screen bg-gray-200 relative">
        <aside
          id="default-sidebar"
          className={`left-0 z-40 w-64 md:sticky  ${
            isSidebarOpen
              ? 'translate-x-0 '
              : ' -translate-x-full absolute h-screen md:h-auto'
          } sm:translate-x-0 transition-all duration-500`}
          aria-label="Sidebar"
        >
          <div className=" overflow-y-auto bg-[#222D32] sticky top-10">
            <Sidebar
              menus={menus}
              closeSidebar={() => setIsSidebarOpen(false)}
            />
          </div>
        </aside>
        <main
          className={`overflow-hidden p-0 md:p-6 ${
            isSidebarOpen ? 'translate-x-16 flex-1' : '  translate-x-0 flex-1'
          } transition-all duration-500`}
        >
          {/* Add your content here */}
          {children}
        </main>
      </div>

      <Footer></Footer>
    </div>
  );
}

Dashboard.propTypes = {
  children: PropTypes.node,
};

export default Dashboard;
