require('./connection');

const express = require('express');
const fs = require('fs');
const path = require('path');
const routers = require('./src/routes');
const app = express();
const createError = require('http-errors');
const cors = require('cors');
const https = require('https');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'default')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 5500;
app.use(cors());

const authRouter = require('./src/auth/router');
const commentRouter = require('./src/comment/router');
const reportRouter = require('./src/reports/router');
const uploadImage = require('./src/image/uploadImage');
const officerReportRouter = require('./src/officerReport/router');
const reportCategoryRouter = require('./src/category/router');
const uniWorkRouter = require('./src/unitWork/router');
const userRoute = require('./src/user/router');

const { decodeToken } = require('./src/auth/middleware');

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' },
);

app.use(decodeToken());

app.use(authRouter);
app.use(commentRouter);
app.use(reportRouter);
app.use(routers);
app.use(uploadImage);
app.use(officerReportRouter);
app.use(reportCategoryRouter);
app.use(uniWorkRouter);
app.use(userRoute);

const sequelize = require('./connection');
const { initializeDatabase } = require('./connection');

(async () => {
  try {
    // 1. Pastikan database 'serenityhub' sudah ada di MySQL
    await initializeDatabase();
    console.log('Database MySQL connected successfully.');

    // 2. Sinkronisasi semua model (buat/update tabel)
    await sequelize.sync({ alter: true });
    console.log('Database synced & tables created/updated successfully.');
  } catch (err) {
    console.error('Failed to initialize database:', err);
  }
})();

const server = app.listen(port, () => console.log(`server running at ${port}`));
module.exports = server;
