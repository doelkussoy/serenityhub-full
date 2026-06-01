/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { confirmDelete } from '../../utils/confirmAlert';

export default function Officer() {
  const auth = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [officerData, setOfficerData] = useState([]);
  const [unitWorkData, setUnitWorkData] = useState([]);
  const [reload, setReload] = useState(false);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setFilter(option._id);
    setIsOpen(false);
  };

  const handleClearFilter = () => {
    setSelectedOption(null);
    setFilter('');
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_HOST_SERENITY}/admin/officer?unitwork=${filter}`,
          {
            headers: {
              Authorization: `Bearer ${auth.user ? auth.token : ''}`,
            },
          },
        );
        setOfficerData(data.data);
        const dataUnitWork = await axios.get(
          `${import.meta.env.VITE_HOST_SERENITY}/officer/unitwork`,
          {
            headers: {
              Authorization: `Bearer ${auth.user ? auth.token : ''}`,
            },
          },
        );
        setUnitWorkData(dataUnitWork.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filter, reload]);

  const handleDelete = async (officerName, id) => {
    const userConfirmation = await confirmDelete(`petugas ${officerName}`);
    if (!userConfirmation) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_HOST_SERENITY}/admin/officer/${id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.user ? auth.token : ''}`,
          },
        },
      );
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Daftar Petugas</h1>
          <p className="text-sm text-slate-500 mt-1">Kelola akun petugas yang terdaftar di sistem</p>
        </div>
        <Link
          to="/dashboard/officer/new"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-200 hover:shadow-blue-500/40 hover:-translate-y-0.5 text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Tambah Petugas
        </Link>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Filter Bar */}
        <div className="px-4 md:px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-xs">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between gap-2 bg-white border border-slate-200 text-slate-700 text-sm px-3.5 py-2.5 rounded-xl hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 shadow-sm"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                  </svg>
                  <span className="truncate">
                    {selectedOption ? selectedOption.name : 'Filter unit kerja'}
                  </span>
                </div>
                <svg
                  className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isOpen && (
                <div className="absolute left-0 top-full mt-1.5 w-full bg-white rounded-xl shadow-xl border border-slate-100 z-30 overflow-hidden">
                  <button
                    onClick={handleClearFilter}
                    className="w-full text-left px-4 py-2.5 text-sm text-slate-500 hover:bg-slate-50 transition-colors border-b border-slate-100"
                  >
                    Semua unit kerja
                  </button>
                  <ul className="max-h-52 overflow-auto">
                    {unitWorkData.map((option) => (
                      <li
                        key={option._id}
                        className={`px-4 py-2.5 text-sm cursor-pointer transition-colors hover:bg-blue-50 hover:text-blue-700 ${
                          selectedOption?._id === option._id ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-700'
                        }`}
                        onClick={() => handleSelect(option)}
                      >
                        {option.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {selectedOption && (
              <button
                onClick={handleClearFilter}
                className="flex items-center gap-1.5 text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg transition-colors font-medium"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Reset
              </button>
            )}

            <div className="ml-auto text-xs text-slate-400 font-medium">
              {!loading && `${officerData?.length || 0} petugas`}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-slate-100">
                <th className="px-4 md:px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider w-12">No</th>
                <th className="px-4 md:px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Nama Petugas</th>
                <th className="px-4 md:px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Unit Kerja</th>
                <th className="px-4 md:px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i}>
                    <td className="px-4 md:px-6 py-4">
                      <div className="h-4 w-6 bg-slate-100 rounded animate-pulse" />
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <div className="h-4 w-36 bg-slate-100 rounded animate-pulse" />
                    </td>
                    <td className="px-4 md:px-6 py-4 hidden sm:table-cell">
                      <div className="h-4 w-28 bg-slate-100 rounded animate-pulse" />
                    </td>
                    <td className="px-4 md:px-6 py-4 text-right">
                      <div className="h-8 w-16 bg-slate-100 rounded-lg animate-pulse ml-auto" />
                    </td>
                  </tr>
                ))
              ) : officerData && officerData.length > 0 ? (
                officerData.map((item, index) => (
                  <tr key={item._id || index} className="hover:bg-slate-50/70 transition-colors duration-150 group">
                    <td className="px-4 md:px-6 py-4 text-slate-400 font-medium text-xs">
                      {index + 1}
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {item.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800 capitalize">{item.name}</p>
                          {/* Show unit kerja below name on mobile */}
                          <p className="text-xs text-slate-400 sm:hidden mt-0.5">
                            {item.unitWork ? item.unitWork.name : <span className="italic text-slate-300">Belum ada unit</span>}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 hidden sm:table-cell">
                      {item.unitWork ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-medium">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                          </svg>
                          {item.unitWork.name}
                        </span>
                      ) : (
                        <span className="text-slate-300 text-xs italic">Belum ada unit</span>
                      )}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(item.name, item._id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-600 hover:text-white rounded-lg transition-all duration-200 border border-red-100 hover:border-red-600 hover:shadow-lg hover:shadow-red-500/20"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
                        <svg className="w-7 h-7 text-slate-300" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-slate-400 font-medium text-sm">Belum ada petugas</p>
                      <Link
                        to="/dashboard/officer/new"
                        className="text-xs text-blue-600 hover:text-blue-700 font-semibold underline underline-offset-2"
                      >
                        Tambah petugas pertama
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
