/**
 * Seed script: tambah user admin ke database MySQL
 * Jalankan dengan: node seed.js
 */

const { initializeDatabase } = require('./connection');
const sequelize = require('./connection');

// Import semua model agar sync berjalan
require('./src/unitWork/model');
require('./src/user/model');

const User = require('./src/user/model');

(async () => {
  try {
    // 1. Pastikan database ada
    await initializeDatabase();

    // 2. Sync tabel
    await sequelize.sync({ alter: true });
    console.log('✅ Tabel tersinkronisasi.');

    // 3. Cek apakah admin sudah ada
    const existing = await User.findOne({ where: { email: 'admin@serenityhub.com' } });
    if (existing) {
      console.log('ℹ️  Admin sudah ada, tidak perlu dibuat ulang.');
      console.log('   Email   :', existing.email);
      console.log('   Role    :', existing.role);
      process.exit(0);
    }

    // 4. Buat user admin (password akan di-hash oleh hook beforeCreate)
    const admin = await User.create({
      name: 'Admin SerenityHub',
      email: 'admin@serenityhub.com',
      password: 'admin123',
      role: 'admin',
    });

    console.log('\n✅ User admin berhasil dibuat!');
    console.log('─────────────────────────────');
    console.log('   Nama    : Admin SerenityHub');
    console.log('   Email   : admin@serenityhub.com');
    console.log('   Password: admin123');
    console.log('   Role    : admin');
    console.log('─────────────────────────────');

    process.exit(0);
  } catch (err) {
    console.error('❌ Gagal membuat admin:', err.message);
    process.exit(1);
  }
})();
