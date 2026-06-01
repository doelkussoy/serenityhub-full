import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { RiLockPasswordFill } from 'react-icons/ri';

export default function TopBar() {
  const auth = useSelector((state) => state.auth);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const initials = auth.user?.name
    ? auth.user.name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
    : 'U';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center gap-2 px-2 py-1.5 rounded-xl text-white/90 hover:bg-white/10 transition-all duration-200 group"
        onClick={() => setDropdownOpen(!isDropdownOpen)}
        type="button"
      >
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-blue-900/30 ring-2 ring-white/20">
          {initials}
        </div>
        {/* Name - hidden on very small screens */}
        <span className="hidden sm:block text-sm font-medium truncate max-w-[120px]">
          {auth.user?.name}
        </span>
        <svg
          className={`w-4 h-4 text-white/70 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-2xl shadow-blue-900/20 border border-slate-100 z-50 overflow-hidden animate-in">
          {/* User info header */}
          <div className="px-4 py-3 bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-100">
            <p className="text-xs text-slate-500 font-medium">Masuk sebagai</p>
            <p className="text-sm font-bold text-slate-800 truncate">{auth.user?.name}</p>
          </div>

          <div className="p-1.5 flex flex-col gap-0.5">
            <Link
              to="/password"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150 font-medium group"
            >
              <RiLockPasswordFill className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
              Kata Sandi
            </Link>
            <Link
              to="/logout"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-150 font-medium group"
            >
              <FiLogOut className="w-4 h-4 text-red-400 group-hover:text-red-600 transition-colors" />
              Keluar
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
