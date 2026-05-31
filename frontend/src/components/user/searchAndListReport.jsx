/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import axios from 'axios';
import ListReport from './ListReport';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function SearchAndListReport({ title, url }) {
  // const [reportData, setReportData] = useState([]);
  const [totalReport, setTotalReport] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [reportSkip, setReportSkip] = useState(0);
  const reportsPerPage = 12;
  const [statusDropdown, setStatusDropdown] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_HOST_SERENITY}/report?q=${searchTerm}&status=${status}`,
        );
        setTotalReport(data.count);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [searchTerm, reportSkip]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    setReportSkip(reportSkip + 12);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setReportSkip(reportSkip - 12);
    }
  };

  const selectPage = (page) => {
    setCurrentPage(page);
    setReportSkip((page - 1) * reportsPerPage);
  };

  const handleSelectOption = (selectedStatus) => {
    setStatus(selectedStatus);
    setStatusDropdown(false);
  };

  const totalPages = Math.ceil(totalReport / reportsPerPage);
  const pages = [...Array(totalPages).keys()].map((i) => i + 1);

  return (
    <div className="">
      <div className="flex items-center animate__fadeIn animate__animated animate__delay-0.5 justify-center md:justify-start my-4">
        <div className="hidden md:inline mx-5 h-[0.15rem] w-8 md:w-16 bg-slate-900"></div>
        <h2 className="md:text-2xl text-lg font-semibold text-slate-900">
          {title}
        </h2>
      </div>

      <div className="mx-5 mt-4 flex flex-col md:flex-row animate__fadeIn animate__animated animate__delay-0.5s">
        <label
          htmlFor="search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Search
        </label>
        <div className="relative flex-grow mb-4 md:mb-0 md:mr-4">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 items-center mb-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="ketik laporan"
          />
        </div>
        <div className="flex flex-row text-left cursor-pointer w-full md:w-fit">
          <div className="flex flex-row w-full md:w-fit">
            <select
              id="selectOption"
              onChange={(e) => setStatus(e.target.value)}
              value={status || ''}
              className="cursor-pointer py-2 px-4 w-full md:w-fit outline-none rounded-md md:p-2"
            >
              <option value="" disabled>
                Status
              </option>
              <option value=" ">Semua</option>
              <option value="Menunggu">Menunggu</option>
              <option value="Diproses">Diproses</option>
              <option value="Selesai">Selesai</option>
            </select>
          </div>
        </div>
        <div className="flex text-left cursor-pointer w-full md:w-fit mt-4 mb-4 md:mt-0 md:mb-0  md:mx-4 items-center  ">
          <Link
            className="bg-blue-600 p-4 px-4 w-full text-white rounded-lg w-full md:w-fit"
            to="/dashboard/report/new"
          >
            Buat Laporan
          </Link>
        </div>
      </div>

      <ListReport
        searchTerm={searchTerm}
        currentPage={currentPage}
        reportsPerPage={reportsPerPage}
        reportSkip={reportSkip}
        status={status}
        url={url}
      />

      {/* pagination */}
      <nav
        aria-label="Page navigation example"
        className="w-full mb-4 mt-4 md:mt-4"
      >
        <ul className="flex items-center justify-center -space-x-px h-8 text-sm">
          {currentPage > 1 && (
            <li>
              <a
                href="#"
                onClick={handlePreviousPage}
                className="flex items-center mx-1 justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="w-2.5 h-2.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 1 1 5l4 4"
                  />
                </svg>
              </a>
            </li>
          )}
          {pages.map((page) => (
            <li key={page}>
              <a
                href="#"
                onClick={() => selectPage(page)}
                className={`flex mx-1 items-center justify-center px-3 h-8 leading-tight border-gray-300 hover:bg-primary-600 hover:text-white ${
                  currentPage === page
                    ? 'text-white bg-primary-600'
                    : 'text-gray-500 bg-white'
                }`}
              >
                {page}
              </a>
            </li>
          ))}
          {currentPage < Math.ceil(totalReport / reportsPerPage) && (
            <li>
              <a
                href="#"
                onClick={handleNextPage}
                className="flex mx-1 items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="w-2.5 h-2.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              </a>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

SearchAndListReport.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
};
