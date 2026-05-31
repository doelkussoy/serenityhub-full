import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { RiLockPasswordFill } from 'react-icons/ri';

export default function TopBar() {
  const auth = useSelector((state) => state.auth);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  return (
    <div className="relative top-0 sticky">
      <div
        className="flex flex-row text-center items-center text-white cursor-pointer"
        onClick={handleToggleDropdown}
      >
        {auth.user?.name}
        <button className="p-2 ">
          <FaUser />
        </button>
      </div>
      {isDropdownOpen && (
        <div className="absolute -left-20 bg-white p-2 rounded shadow mt-2 z-40">
          <div className="flex flex-col w-32">
            <Link
              to={'/password'}
              className=" flex items-center block w-full text-left  font-bold mb-2 hover:bg-blue-500"
            >
              <RiLockPasswordFill />
            Kata Sandi
            </Link>
            <Link
              to={'/logout'}
              className=" flex items-center block w-full text-left text-red-500 font-bold"
            >
              <FiLogOut />
              Keluar
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
