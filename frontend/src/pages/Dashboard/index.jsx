/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState, Component } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import DashboardLayout from '../../components/dashboard/dashboardLayout';
import axios from 'axios';
import ContentUser from '../../components/user/content';
import ContentOfficer from '../../components/officer/content';
import ContentAdmin from '../../components/admin/content';
import { toast } from 'react-toastify';

// Error Boundary untuk menangkap crash JS di dashboard
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-center p-8">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-slate-700 mb-2">Terjadi Kesalahan</h2>
          <p className="text-slate-500 text-sm mb-4">{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()} className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm">
            Muat Ulang
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function Dashboard() {
  const auth = useSelector((state) => state.auth);

  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);

  let dashboardContent = null;

  const getMe = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_HOST_SERENITY}/me`,
        {
          headers: {
            Authorization: `Bearer ${auth.user ? auth.token : ''}`,
          },
        },
      );
      setRole(data.role);
      if (data.error === 1) {
        toast.warning(`Token expired`, {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user role:', error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getMe();
  }, []);

  const roleComponents = {
    user: <ContentUser />,
    officer: <ContentOfficer />,
    admin: <ContentAdmin />,
  };

  dashboardContent = roleComponents[role] || <Navigate to="/logout" />;

  return (
    <>
      <DashboardLayout>
        <ErrorBoundary>
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
              <span className="ml-3 text-slate-600">Memuat...</span>
            </div>
          ) : dashboardContent}
        </ErrorBoundary>
      </DashboardLayout>
    </>
  );
}
