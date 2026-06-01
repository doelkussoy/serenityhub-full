import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate, useParams, Link } from 'react-router-dom';

export default function EditOfficer() {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { id } = useParams();
  const [unitWorkData, setUnitWorkData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [officer, setOfficer] = useState({
    name: '',
    email: '',
    unitWorkId: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch unit works
        const dataUnitWork = await axios.get(`${import.meta.env.VITE_HOST_SERENITY}/officer/unitwork`, {
          headers: {
            Authorization: `Bearer ${auth.user ? auth.token : ''}`,
          },
        });
        if (dataUnitWork.data && dataUnitWork.data.data) {
          setUnitWorkData(dataUnitWork.data.data);
        }

        // Fetch officer details
        const { data } = await axios.get(`${import.meta.env.VITE_HOST_SERENITY}/admin/officer/${id}`, {
          headers: {
            Authorization: `Bearer ${auth.user ? auth.token : ''}`,
          },
        });

        if (data.status === 'ok' && data.data) {
          setOfficer({
            name: data.data.name || '',
            email: data.data.email || '',
            unitWorkId: data.data.unitWorkId || '',
            password: '',
            confirmPassword: '',
          });
        } else {
          toast.error(data.message || 'Gagal memuat data petugas', { position: 'top-right', autoClose: 3000 });
          navigate('/dashboard/officer');
        }
      } catch (error) {
        console.error('Error fetching officer data', error);
        toast.error('Gagal mengambil data dari server', { position: 'top-right', autoClose: 3000 });
        navigate('/dashboard/officer');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id, auth.token, auth.user, navigate]);

  const handleSelectChange = (event) => {
    setOfficer({ ...officer, unitWorkId: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If password is provided, validate confirmation
    if (officer.password && officer.password !== officer.confirmPassword) {
      toast.warning('Konfirmasi password harus sama', { position: 'top-right', autoClose: 2000 });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        name: officer.name,
        email: officer.email,
        unitWorkId: officer.unitWorkId,
      };

      if (officer.password) {
        payload.password = officer.password;
      }

      const { data } = await axios.put(
        `${import.meta.env.VITE_HOST_SERENITY}/admin/officer/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${auth.user ? auth.token : ''}`,
          },
        }
      );

      if (data.status === 'ok') {
        toast.success(data.message || 'Berhasil memperbarui data petugas', { position: 'top-right', autoClose: 3000 });
        navigate('/dashboard/officer');
      } else {
        toast.error(data.message || 'Gagal memperbarui data', { position: 'top-right', autoClose: 3000 });
      }
    } catch (error) {
      toast.error(`${error}`, { position: 'top-right', autoClose: 3000 });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 px-4 py-3 transition-all duration-200 placeholder-slate-300";
  const labelClass = "block text-sm font-semibold text-slate-700 mb-1.5";

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-sm text-slate-500 font-medium">Memuat data petugas...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <Link
          to="/dashboard/officer"
          className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Edit Petugas</h1>
          <p className="text-sm text-slate-500 mt-0.5">Perbarui akun petugas yang terdaftar di sistem</p>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-4 md:px-8 py-5 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-slate-800">Informasi Petugas</p>
              <p className="text-xs text-slate-500">Ubah field yang ingin diperbarui</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-4 md:px-8 py-6 space-y-5">
          {/* Name */}
          <div>
            <label className={labelClass}>Nama Lengkap</label>
            <input
              type="text"
              value={officer.name}
              onChange={(e) => setOfficer({ ...officer, name: e.target.value })}
              minLength={5}
              maxLength={50}
              required
              placeholder="Masukkan nama lengkap petugas"
              className={inputClass}
            />
          </div>

          {/* Email */}
          <div>
            <label className={labelClass}>Email</label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                type="email"
                value={officer.email}
                onChange={(e) => setOfficer({ ...officer, email: e.target.value })}
                required
                placeholder="contoh@email.com"
                className={`${inputClass} pl-10`}
              />
            </div>
          </div>

          {/* Unit Kerja */}
          <div>
            <label className={labelClass}>Unit Kerja</label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                </svg>
              </div>
              <select
                onChange={handleSelectChange}
                value={officer.unitWorkId}
                className={`${inputClass} pl-10 appearance-none cursor-pointer`}
              >
                <option value="" disabled>Pilih unit kerja</option>
                {unitWorkData.map((option) => (
                  <option key={option._id} value={option._id}>
                    {option.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Password Row (Optional for Edit) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Password */}
            <div>
              <label className={labelClass}>Password Baru (Opsional)</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={officer.password}
                  onChange={(e) => setOfficer({ ...officer, password: e.target.value })}
                  placeholder="Kosongkan jika tidak ingin diubah"
                  className={`${inputClass} pl-10 pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className={labelClass}>Konfirmasi Password Baru</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={officer.confirmPassword}
                  onChange={(e) => setOfficer({ ...officer, confirmPassword: e.target.value })}
                  placeholder="Kosongkan jika tidak ingin diubah"
                  className={`${inputClass} pl-10 pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showConfirmPassword ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2 border-t border-slate-100">
            <Link
              to="/dashboard/officer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all duration-200"
            >
              Batal
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none hover:-translate-y-0.5 hover:shadow-blue-500/40"
            >
              {isSubmitting ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Menyimpan...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Simpan Perubahan
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
