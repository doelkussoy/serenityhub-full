/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import { listen } from './App/listener';
import { Provider } from 'react-redux';
import store from './App/store';
import Logout from './components/logout';
import GuardRoute from './components/guardRoute';
import NewAdmin from './components/newAdmin';
import ChangePassword from './components/changePassword';

function App() {
  useEffect(() => {
    listen();
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard/*"
            element={<GuardRoute element={<Dashboard />} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/config" element={<NewAdmin />} />
          <Route
            path="/password"
            element={<GuardRoute element={<ChangePassword />} />}
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
