import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Sidebar = ({ menus, closeSidebar }) => {
  const auth = useSelector((state) => state.auth);
  const userMenus = menus.find((menu) => menu[auth.user.role]);

  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);

  const getMe = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_HOST_SERENITY}/me`,
        {
          headers: {
            Authorization: `Bearer ${auth.user ? auth.token : ''}`,
          },
        },
      );
      setRole(data.role);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user role:', error);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  const roleLabel = {
    admin: 'Administrator',
    officer: 'Petugas',
    user: 'Pengguna',
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#0f2340] to-[#1a3a5c] text-white overflow-y-auto">
      {/* User Role Badge */}
      <div className="px-4 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-500/30 border border-blue-400/40 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-white font-semibold text-sm truncate">{auth.user?.name}</p>
            <span className="inline-block text-[0.65rem] px-2 py-0.5 rounded-full bg-blue-500/30 text-blue-300 font-medium mt-0.5 capitalize">
              {roleLabel[role] || role}
            </span>
          </div>
        </div>
      </div>

      {/* Menu Label */}
      <div className="px-4 pt-5 pb-2">
        <p className="text-[0.6rem] font-bold text-slate-400 uppercase tracking-widest">Menu Utama</p>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-2 pb-4 space-y-0.5">
        {loading ? (
          <div className="flex flex-col gap-2 px-2 pt-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 rounded-lg bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          role &&
          userMenus[role].map((menu, index) => (
            <NavLink
              key={index}
              to={menu.route}
              onClick={closeSidebar}
              end={menu.route === '/'}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className={`flex-shrink-0 p-1.5 rounded-md transition-colors duration-200 ${isActive ? 'bg-white/20' : 'bg-white/5 group-hover:bg-white/10'}`}>
                    <svg
                      className={`h-4 w-4 transition-colors duration-200 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 21"
                    >
                      <path d={menu.icon} />
                    </svg>
                  </span>
                  <span className="capitalize truncate">{menu.label}</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-300 flex-shrink-0" />
                  )}
                </>
              )}
            </NavLink>
          ))
        )}
      </nav>

      {/* Bottom branding */}
      <div className="px-4 py-3 border-t border-white/10">
        <p className="text-[0.6rem] text-slate-500 text-center">SerenityHub v1.0</p>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  menus: PropTypes.array,
  closeSidebar: PropTypes.func,
};

export default Sidebar;
