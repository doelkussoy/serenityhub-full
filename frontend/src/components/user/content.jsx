/* eslint-disable no-unused-vars */
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchAndListReport from './searchAndListReport';
import GuardRoute from '../guardRoute';
import DetailReport from '../detailReport';
import NewReport from '../newReport';

export default function ContentUser() {
  const auth = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route
        path="/*"
        element={
          <GuardRoute
            element={
              <SearchAndListReport
                title="Semua Laporan"
                url={`${import.meta.env.VITE_HOST_SERENITY}/report?${
                  status ? `status=${status}&` : null
                }&`}
                // url={`${import.meta.env.VITE_HOST_SERENITY}/report?`}
              />
            }
          />
        }
      />
      <Route
        path="/report/new"
        element={<GuardRoute element={<NewReport />} />}
      />
      <Route
        path="/report/detail/:id"
        element={<GuardRoute element={<DetailReport />} />}
      />
      <Route
        path="/report/my"
        element={
          <GuardRoute
            element={
              <SearchAndListReport
                title="Laporan Saya"
                url={`${import.meta.env.VITE_HOST_SERENITY}/report/my/${
                  auth.user._id
                }?`}
              />
            }
          />
        }
      />
    </Routes>
  );
}
