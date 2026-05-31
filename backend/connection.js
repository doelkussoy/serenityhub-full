const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');
const config = require('./src/config');
const {
  dbHost,
  dbName,
  dbPassword,
  dbPort,
  dbUser,
} = config;

// Inisialisasi Sequelize instance
const sequelize = new Sequelize(dbName || 'serenityhub', dbUser || 'root', dbPassword || '', {
  host: dbHost || '127.0.0.1',
  port: dbPort || 3306,
  dialect: 'mysql',
  logging: false,
  timezone: '+07:00',
});

// Fungsi untuk memastikan database ada di XAMPP MySQL
async function initializeDatabase() {
  try {
    // Hubungkan tanpa database terlebih dahulu
    const connection = await mysql.createConnection({
      host: dbHost || '127.0.0.1',
      port: dbPort || 3306,
      user: dbUser || 'root',
      password: dbPassword || '',
    });
    
    // Buat database jika belum ada
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName || 'serenityhub'}\`;`);
    await connection.end();
    console.log(`Database '${dbName || 'serenityhub'}' ensured/created successfully.`);
  } catch (err) {
    console.error('Gagal membuat database otomatis di MySQL XAMPP:', err.message);
  }
}

module.exports = sequelize;
module.exports.initializeDatabase = initializeDatabase;

