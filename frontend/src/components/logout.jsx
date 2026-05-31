import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogoout } from '../features/Auth/actions';
import { toast } from 'react-toastify';

import axios from 'axios';

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function logout() {
      const token = localStorage.getItem('auth')
        ? JSON.parse(localStorage.getItem('auth'))
        : {};

      return await axios
        .post(`${import.meta.env.VITE_HOST_SERENITY}/logout`, null, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          localStorage.removeItem('auth');
          return response;
        });
    }
    toast.success(`Berhasil keluar`, {
      position: 'top-right',
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    logout().then(() => {
      dispatch(userLogoout());

      navigate('/');
    });
  }, []);

  return <></>;
}
