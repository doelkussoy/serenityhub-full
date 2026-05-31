/* eslint-disable no-unused-vars */
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import GuardRoute from '../guardRoute';
import Main from './main';
import SearchAndListReport from './searchAndListReport';
import Kategori from './kategori';
import NewKategori from './newKategori';
import DetailReport from '../detailReport';
import UnitWork from './unitWork';
import NewUnitWorks from './newUnitWorks';
import Officer from './officer';
import NewOfficer from './newOfficer';

export default function ContentOfficer() {
  const auth = useSelector((state) => state.auth);
  const idUser = auth.user._id;
  const unitWork = auth.user.unitWork;

  return (
    <Routes>
      <Route path="/*" element={<GuardRoute element={<Main />} />} />
      <Route
        path="/report"
        element={<GuardRoute element={<SearchAndListReport />} />}
      />
      <Route
        path="/report/detail/:id"
        element={<GuardRoute element={<DetailReport />} />}
      />
      <Route path="/category" element={<GuardRoute element={<Kategori />} />} />
      <Route
        path="/category/new"
        element={<GuardRoute element={<NewKategori />} />}
      />
      <Route
        path="/unitworks"
        element={<GuardRoute element={<UnitWork />} />}
      />
      <Route
        path="/unitworks/new"
        element={<GuardRoute element={<NewUnitWorks />} />}
      />
      <Route path="/officer" element={<GuardRoute element={<Officer />} />} />
      <Route
        path="/officer/new"
        element={<GuardRoute element={<NewOfficer />} />}
      />
    </Routes>
  );
}
