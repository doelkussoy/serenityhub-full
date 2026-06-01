-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 01 Jun 2026 pada 06.21
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `serenityhub`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `categories`
--

INSERT INTO `categories` (`id`, `category_id`, `name`, `image`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Banjir', '697d5a3557dd1d1b655ed61f92c92e56.png', '2026-05-31 20:10:05', '2026-05-31 20:10:05');

-- --------------------------------------------------------

--
-- Struktur dari tabel `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `message` varchar(200) NOT NULL,
  `reportId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `comments`
--

INSERT INTO `comments` (`id`, `name`, `message`, `reportId`, `createdAt`, `updatedAt`) VALUES
(1, 'Admin SerenityHub', 'dsdadsa', 3, '2026-06-01 11:06:36', '2026-06-01 11:06:36'),
(2, 'Admin SerenityHub', 'nghgghg', 1, '2026-06-01 11:07:00', '2026-06-01 11:07:00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `officerreports`
--

CREATE TABLE `officerreports` (
  `id` int(11) NOT NULL,
  `message` text DEFAULT NULL,
  `imageReport` text NOT NULL,
  `officerId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `officerreports`
--

INSERT INTO `officerreports` (`id`, `message`, `imageReport`, `officerId`, `createdAt`, `updatedAt`) VALUES
(1, 'yyyy', '[\"11f4eb234d1bb585a38cb0ad2836e04d.png\"]', 6, '2026-06-01 11:08:09', '2026-06-01 11:08:09');

-- --------------------------------------------------------

--
-- Struktur dari tabel `reports`
--

CREATE TABLE `reports` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` varchar(250) NOT NULL,
  `address` text NOT NULL,
  `latitude` varchar(255) DEFAULT NULL,
  `longitude` varchar(255) DEFAULT NULL,
  `status` enum('Menunggu','Diproses','Selesai','Ditolak') DEFAULT 'Menunggu',
  `imageReport` text NOT NULL,
  `category` varchar(255) NOT NULL,
  `reporterId` int(11) DEFAULT NULL,
  `unitWorksId` int(11) DEFAULT NULL,
  `officerReportId` int(11) DEFAULT NULL,
  `officerId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `reports`
--

INSERT INTO `reports` (`id`, `title`, `description`, `address`, `latitude`, `longitude`, `status`, `imageReport`, `category`, `reporterId`, `unitWorksId`, `officerReportId`, `officerId`, `createdAt`, `updatedAt`) VALUES
(1, 'rgsdgsdgsdfsdgsd', 'eqweqweqwewq', 'saasadsdas', '-6.118461032707104', '106.15020008566258', 'Diproses', '[\"ae1092ef8d252348285d8260711d7806.png\"]', 'Banjir', 2, 1, NULL, NULL, '2026-06-01 10:49:10', '2026-06-01 11:07:06'),
(2, 'sdasdsadasdsad', 'gsdgsfdgfdg', 'ewfwerew', '-3.576500817320809', '100.35252833068648', 'Selesai', '[\"0425eaf7ea21383941e64af48a702a43.png\"]', 'Banjir', 2, 1, 1, 6, '2026-06-01 11:05:16', '2026-06-01 11:08:09'),
(3, 'sbnnnndgfdgf', 'e3qweqwr', 'efsfdsfdsf', '-13.643496292774152', '125.48904143962531', 'Menunggu', '[\"22400a6da5428c5c77809304790541cd.png\"]', 'Banjir', 2, NULL, NULL, NULL, '2026-06-01 11:05:35', '2026-06-01 11:05:35');

-- --------------------------------------------------------

--
-- Struktur dari tabel `unitworks`
--

CREATE TABLE `unitworks` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `detail` text DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `people` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `unitworks`
--

INSERT INTO `unitworks` (`id`, `name`, `detail`, `image`, `people`, `createdAt`, `updatedAt`) VALUES
(1, 'Dishub Serang', NULL, '8d254f3b3f94128aca6229b030c630e5.jpeg', NULL, '2026-05-31 20:09:49', '2026-05-31 20:09:49');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin','officer') DEFAULT 'user',
  `image` varchar(255) DEFAULT NULL,
  `token` text DEFAULT NULL,
  `unitWorkId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `user_id`, `name`, `email`, `password`, `role`, `image`, `token`, `unitWorkId`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Admin SerenityHub', 'admin@serenityhub.com', '$2b$10$7IETGnUN4w5sSGjozEmduOTTcyhZkJvhdNGzHS3YqtYQW4zADCnse', 'admin', NULL, '[\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsImlkIjoxLCJ1c2VyX2lkIjoxLCJuYW1lIjoiQWRtaW4gU2VyZW5pdHlIdWIiLCJlbWFpbCI6ImFkbWluQHNlcmVuaXR5aHViLmNvbSIsInJvbGUiOiJhZG1pbiIsImltYWdlIjpudWxsLCJ1bml0V29ya0lkIjpudWxsLCJpYXQiOjE3ODAyODcxNjV9.8ZuVxExum72mSCkKSPDIkHR7T11jmjtSLPo47odtxdQ\"]', NULL, '2026-05-31 19:28:30', '2026-06-01 11:12:45'),
(2, 2, 'doel', 'doelkussoy@gmail.com', '$2b$10$oSR.jkfjGbCdGC5Q6F83u.Gv5V/z4oWkcJLcmn315.xFHDu0yrOuq', 'user', NULL, '[\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjIsImlkIjoyLCJ1c2VyX2lkIjoyLCJuYW1lIjoiZG9lbCIsImVtYWlsIjoiZG9lbGt1c3NveUBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImltYWdlIjpudWxsLCJ1bml0V29ya0lkIjpudWxsLCJpYXQiOjE3ODAyODY2ODl9.32KCnJEIG6hczEQrdiTFc5D8TcS5I57yNth8GNTOrvw\"]', NULL, '2026-05-31 19:33:13', '2026-06-01 11:04:49'),
(6, 6, 'jaja', 'jaja@gmail.com', '$2b$10$O/KfNXOyohpL4BfdvyC2bOfvEEb5Ds1j1DIfC.8dmg7ev8X3ooaom', 'officer', NULL, '[\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjYsImlkIjo2LCJ1c2VyX2lkIjo2LCJuYW1lIjoiamFqYSIsImVtYWlsIjoiamFqYUBnbWFpbC5jb20iLCJyb2xlIjoib2ZmaWNlciIsImltYWdlIjpudWxsLCJ1bml0V29ya0lkIjoxLCJpYXQiOjE3ODAyODcxMzZ9.HtCPsTb5K7b-ojRPpqShsCQ-xrrluUqjvRSIfmObSQU\"]', 1, '2026-06-01 10:42:26', '2026-06-01 11:12:16');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reportId` (`reportId`);

--
-- Indeks untuk tabel `officerreports`
--
ALTER TABLE `officerreports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `officerId` (`officerId`);

--
-- Indeks untuk tabel `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reporterId` (`reporterId`),
  ADD KEY `unitWorksId` (`unitWorksId`),
  ADD KEY `officerReportId` (`officerReportId`),
  ADD KEY `officerId` (`officerId`);

--
-- Indeks untuk tabel `unitworks`
--
ALTER TABLE `unitworks`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Users_email_unique` (`email`),
  ADD KEY `unitWorkId` (`unitWorkId`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `officerreports`
--
ALTER TABLE `officerreports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `unitworks`
--
ALTER TABLE `unitworks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`reportId`) REFERENCES `reports` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_10` FOREIGN KEY (`reportId`) REFERENCES `reports` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`reportId`) REFERENCES `reports` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_3` FOREIGN KEY (`reportId`) REFERENCES `reports` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_4` FOREIGN KEY (`reportId`) REFERENCES `reports` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_5` FOREIGN KEY (`reportId`) REFERENCES `reports` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_6` FOREIGN KEY (`reportId`) REFERENCES `reports` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_7` FOREIGN KEY (`reportId`) REFERENCES `reports` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_8` FOREIGN KEY (`reportId`) REFERENCES `reports` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_9` FOREIGN KEY (`reportId`) REFERENCES `reports` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `officerreports`
--
ALTER TABLE `officerreports`
  ADD CONSTRAINT `officerreports_ibfk_1` FOREIGN KEY (`officerId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `officerreports_ibfk_2` FOREIGN KEY (`officerId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `officerreports_ibfk_3` FOREIGN KEY (`officerId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`reporterId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `reports_ibfk_10` FOREIGN KEY (`unitWorksId`) REFERENCES `unitworks` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `reports_ibfk_11` FOREIGN KEY (`officerReportId`) REFERENCES `officerreports` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `reports_ibfk_12` FOREIGN KEY (`officerId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `reports_ibfk_13` FOREIGN KEY (`reporterId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `reports_ibfk_14` FOREIGN KEY (`unitWorksId`) REFERENCES `unitworks` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `reports_ibfk_15` FOREIGN KEY (`officerReportId`) REFERENCES `officerreports` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `reports_ibfk_16` FOREIGN KEY (`officerId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `reports_ibfk_17` FOREIGN KEY (`reporterId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `reports_ibfk_18` FOREIGN KEY (`unitWorksId`) REFERENCES `unitworks` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `reports_ibfk_19` FOREIGN KEY (`officerReportId`) REFERENCES `officerreports` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `reports_ibfk_2` FOREIGN KEY (`unitWorksId`) REFERENCES `unitworks` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `reports_ibfk_20` FOREIGN KEY (`officerId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `reports_ibfk_21` FOREIGN KEY (`reporterId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `reports_ibfk_22` FOREIGN KEY (`unitWorksId`) REFERENCES `unitworks` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `reports_ibfk_23` FOREIGN KEY (`officerReportId`) REFERENCES `officerreports` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `reports_ibfk_24` FOREIGN KEY (`officerId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `reports_ibfk_25` FOREIGN KEY (`reporterId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `reports_ibfk_26` FOREIGN KEY (`unitWorksId`) REFERENCES `unitworks` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `reports_ibfk_27` FOREIGN KEY (`officerReportId`) REFERENCES `officerreports` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `reports_ibfk_28` FOREIGN KEY (`officerId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `reports_ibfk_29` FOREIGN KEY (`reporterId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `reports_ibfk_3` FOREIGN KEY (`officerReportId`) REFERENCES `officerreports` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `reports_ibfk_30` FOREIGN KEY (`unitWorksId`) REFERENCES `unitworks` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `reports_ibfk_31` FOREIGN KEY (`officerReportId`) REFERENCES `officerreports` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `reports_ibfk_32` FOREIGN KEY (`officerId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `reports_ibfk_33` FOREIGN KEY (`reporterId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `reports_ibfk_34` FOREIGN KEY (`unitWorksId`) REFERENCES `unitworks` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `reports_ibfk_35` FOREIGN KEY (`officerReportId`) REFERENCES `officerreports` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `reports_ibfk_36` FOREIGN KEY (`officerId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `reports_ibfk_37` FOREIGN KEY (`reporterId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `reports_ibfk_38` FOREIGN KEY (`unitWorksId`) REFERENCES `unitworks` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `reports_ibfk_39` FOREIGN KEY (`officerReportId`) REFERENCES `officerreports` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `reports_ibfk_4` FOREIGN KEY (`officerId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `reports_ibfk_40` FOREIGN KEY (`officerId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `reports_ibfk_5` FOREIGN KEY (`reporterId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `reports_ibfk_6` FOREIGN KEY (`unitWorksId`) REFERENCES `unitworks` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `reports_ibfk_7` FOREIGN KEY (`officerReportId`) REFERENCES `officerreports` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `reports_ibfk_8` FOREIGN KEY (`officerId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `reports_ibfk_9` FOREIGN KEY (`reporterId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`unitWorkId`) REFERENCES `unitworks` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_10` FOREIGN KEY (`unitWorkId`) REFERENCES `unitworks` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_11` FOREIGN KEY (`unitWorkId`) REFERENCES `unitworks` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`unitWorkId`) REFERENCES `unitworks` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_3` FOREIGN KEY (`unitWorkId`) REFERENCES `unitworks` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_4` FOREIGN KEY (`unitWorkId`) REFERENCES `unitworks` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_5` FOREIGN KEY (`unitWorkId`) REFERENCES `unitworks` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_6` FOREIGN KEY (`unitWorkId`) REFERENCES `unitworks` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_7` FOREIGN KEY (`unitWorkId`) REFERENCES `unitworks` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_8` FOREIGN KEY (`unitWorkId`) REFERENCES `unitworks` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_9` FOREIGN KEY (`unitWorkId`) REFERENCES `unitworks` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
