import Swal from 'sweetalert2';

export const confirmDelete = async (itemName = 'item ini') => {
  const result = await Swal.fire({
    title: 'Konfirmasi Hapus',
    html: `Apakah kamu yakin ingin menghapus <b>${itemName}</b>?<br/>Tindakan ini tidak dapat dibatalkan.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444', // Tailwind red-500
    cancelButtonColor: '#64748b', // Tailwind slate-500
    confirmButtonText: 'Ya, Hapus',
    cancelButtonText: 'Batal',
    background: '#ffffff',
    customClass: {
      popup: 'rounded-3xl shadow-2xl border border-slate-100',
      title: 'text-xl font-bold text-slate-800',
      htmlContainer: 'text-sm text-slate-500',
      confirmButton: 'rounded-xl px-5 py-2.5 font-semibold text-sm shadow-lg shadow-red-500/30 transition-all hover:-translate-y-0.5',
      cancelButton: 'rounded-xl px-5 py-2.5 font-semibold text-sm shadow-md transition-all hover:-translate-y-0.5',
    },
    showClass: {
      popup: 'animate__animated animate__zoomIn animate__faster'
    },
    hideClass: {
      popup: 'animate__animated animate__zoomOut animate__faster'
    }
  });

  return result.isConfirmed;
};
