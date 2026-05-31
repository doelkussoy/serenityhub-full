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

  return (
    <div className="">
      <ul className="h-screen w-full space-y-2 font-medium  ">
        <li>
          <div className="bg-[#1A2226] p-3">
            <p className="mx-2 text-xs font-semibold text-slate-400 uppercase">
              Menu Utama
            </p>
          </div>
        </li>
        {loading ? (
          <p>loading</p>
        ) : (
          role &&
          userMenus[role].map((menu, index) => (
            <li key={index}>
              <NavLink
                to={menu.route}
                onClick={closeSidebar}
                className="w-full group flex items-center p-2 text-gray-400 hover:bg-[#1E282C] hover:border-l-2 hover:border-primary-500 transition ease-in duration-75"
              >
                <svg
                  className="ml-2 h-5 w-5  text-gray-400 transition duration-75 group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d={menu.icon} />
                </svg>
                <span className="ml-3 text-center group-hover:text-white capitalize">
                  {menu.label}
                </span>
              </NavLink>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

Sidebar.propTypes = {
  menus: PropTypes.array,
  closeSidebar: PropTypes.func,
};

export default Sidebar;
