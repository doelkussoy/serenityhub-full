/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaLocationDot } from 'react-icons/fa6';
import { FaCalendar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function ListReport({
  searchTerm,
  currentPage,
  reportsPerPage,
  reportSkip,
  status,
  url,
}) {
  const auth = useSelector((state) => state.auth);
  const [reportData, setReportData] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${url}q=${searchTerm}&limit=${reportsPerPage}&skip=${reportSkip}&status=${status}`,
          {
            headers: {
              Authorization: `Bearer ${auth.user ? auth.token : ''} `,
            },
          },
        );
        setReportData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchTerm, reportSkip, url, status]);

  const colorStatus = (status) => {
    if (status === 'Menunggu') {
      return 'bg-yellow-500';
    } else if (status === 'Diproses') {
      return 'bg-blue-500';
    } else if (status === 'Selesai') {
      return 'bg-green-500';
    }
  };

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="500"
      data-aos-delay="200"
      className={`overflow-hidden ${
        isSidebarOpen ? 'translate-x-16' : '  translate-x-0'
      } transition-all duration-500 animate__fadeIn animate__animated animate__delay-1s`}
    >
      <div className="px-5 md:py-8 ">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-left mx-5">
          {reportData.length ? (
            reportData.map((report) => (
              <Link
                to={`/dashboard/report/detail/${report._id}`}
                key={report._id}
              >
                <div className=" bg-white p-0 rounded-lg box-border drop-shadow hover:ease-in transition-all ease-out hover:-translate-y-2">
                  <div className="relative h-48">
                    <img
                      src={`${
                        import.meta.env.VITE_HOST_SERENITY
                      }/public/image/${report.imageReport[0]}`}
                      alt={report.title}
                      className="mb-2 w-full h-48 object-fit rounded-md"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/150';
                      }}
                    />
                    <div
                      className={`${
                        isSidebarOpen ? 'hidden' : 'absolute'
                      } transition-none duration-0 bottom-0 right-0 text-white text-xs p-1 rounded-l-lg ${colorStatus(
                        report.status,
                      )}`}
                    >
                      {report.status}
                    </div>
                  </div>

                  <div className="p-3">
                    <h3 className="text-l font-semibold mb-1">
                      {report.title}
                    </h3>
                    <div className="flex items-center text-xs text-gray-500 bottom-0 left-0 mb-1 rounded-r-lg">
                      <FaLocationDot className="mr-1" />
                      {report.address}
                    </div>
                    <p className="text-sm text-gray-600 mb-1 line-clamp-3 h-10">
                      {report.description.length > 50
                        ? report.description.substring(0, 50) + '...'
                        : report.description}
                    </p>

                    <div className="flex items-center text-xs text-gray-400 bottom-0 left-0 mb-1 rounded-r-lg">
                      <FaCalendar className="mr-1" />
                      {new Date(report.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>Laporan tidak ada.</p>
          )}
        </div>
      </div>
    </div>
  );
}
ListReport.defaultProps = {
  url: `${import.meta.env.VITE_HOST_SERENITY}/report`,
};

ListReport.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  reportsPerPage: PropTypes.number.isRequired,
  reportSkip: PropTypes.number,
  status: PropTypes.string,
  url: PropTypes.string,
};

export default ListReport;
