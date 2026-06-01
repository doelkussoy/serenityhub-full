// src/components/LoginForm.js
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FloatingButton from './floatingButton';
import { useDispatch } from 'react-redux';
import { userLogin } from '../features/Auth/actions';
import { toast } from 'react-toastify';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_HOST_SERENITY}/login`, form);
      if (data.status === 'ok') {
        const { user, token } = data;
        navigate('/dashboard');
        toast.success(`${data.message}`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        dispatch(userLogin(user, token));
      } else {
        toast.error(`${data.message}`, {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {

      toast.warning(`'Terjadi kesalahan saat mencoba untuk login. Silakan coba lagi. ${error}`, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-login bg-pattern flex items-center justify-center relative overflow-hidden">
      {/* Decorative blurred circles for modern background */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <FloatingButton />

      <div className="w-full max-w-md px-6 py-8 relative z-10">
        <div className="glass-card p-8 sm:p-10 transform transition-all duration-300 hover:shadow-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
              Selamat Datang
            </h1>
            <p className="text-slate-500 mt-2 text-sm">Masuk ke akun Anda untuk melanjutkan</p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                placeholder="nama@email.com"
                required={true}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                Kata Sandi
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                required={true}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                autoComplete="on"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white rounded-xl font-medium shadow-md hover:shadow-lg transform transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Masuk
            </button>

            <p className="text-center text-sm text-slate-500 mt-6">
              Belum punya akun?{' '}
              <Link to="/register" className="font-semibold text-primary-600 hover:text-primary-700 transition-colors">
                Daftar sekarang
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
