import { useState, useEffect } from 'react';
import axios from 'axios';
import ListReport from './ListReport';
import PropTypes from 'prop-types';

export default function SearchAndListReport({ title, url }) {
  const [totalReport, setTotalReport] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [reportSkip, setReportSkip] = useState(0);
  const reportsPerPage = 12;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_HOST_SERENITY}${url}`,
        );
        setTotalReport(data.count);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchTerm, reportSkip, url]);

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

  const totalPages = Math.ceil(totalReport / reportsPerPage);
  const pages = [...Array(totalPages).keys()].map((i) => i + 1);

  return (
    <div className="">
      <div className="flex items-center animate__fadeIn animate__animated animate__delay-0.5s">
        <div className="mx-5 h-[0.15rem] w-8 md:w-16 bg-slate-900"></div>
        <h2 className="md:text-2xl text-lg font-semibold text-slate-900">
          {title}
        </h2>
      </div>

      <div className="mx-5 mt-4 flex animate__fadeIn animate__animated animate__delay-0.5s">
        <label
          htmlFor="search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Search
        </label>
        <div className="relative flex-grow">
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
            className="block w-[95%] p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="ketik laporan"
          />
        </div>
      </div>
      <ListReport
        searchTerm={searchTerm}
        currentPage={currentPage}
        reportsPerPage={reportsPerPage}
        reportSkip={reportSkip}
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
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
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
                className={`flex items-center justify-center px-3 h-8 leading-tight border-gray-300 hover:bg-primary-600 hover:text-white ${
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
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
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
  url: PropTypes.string.isRequired,
};
