# SerenityHub Monorepo

Repositori terpadu ini menggabungkan **Frontend** (Vite + React) dan **Backend** (Express + Node.js) ke dalam satu workspace tunggal.

## Struktur Direktori

- `backend/`: Kode backend Server (Express.js, Sequelize, MySQL)
- `frontend/`: Kode frontend Client (Vite, TailwindCSS)

---

## Langkah Menjalankan Proyek

### 1. Instalasi Dependensi
Anda cukup menginstal semua dependensi untuk frontend dan backend secara otomatis dari direktori root ini menggunakan satu perintah:

```bash
npm install
```

### 2. Konfigurasi Database (Backend)
Pastikan Anda sudah mengonfigurasi database MySQL di XAMPP Anda.
1. Jalankan layanan MySQL di XAMPP.
2. Buat database baru bernama `serenityhub` di phpMyAdmin (`http://localhost/phpmyadmin/`).
3. Sesuaikan file `.env` di dalam folder `backend/` agar sesuai dengan kredensial database Anda.

### 3. Menjalankan Mode Pengembangan (Dev Mode)
Untuk menjalankan **frontend** dan **backend** secara bersamaan dengan satu perintah terpadu, jalankan perintah berikut dari direktori root ini:

```bash
npm run dev
```

Ini akan menggunakan library `concurrently` untuk memulai server backend (port 5500) dan dev server frontend secara bersamaan.
