const ReportUser = require('../reports/model');
const OfficerReport = require('./model');

// Helper to format Sequelize errors
function formatSequelizeError(err, res) {
  const fields = {};
  if (err.errors && Array.isArray(err.errors)) {
    err.errors.forEach((e) => {
      fields[e.path] = { message: e.message };
    });
  }
  return res.json({
    error: 1,
    message: err.message,
    fields,
  });
}

async function addReport(req, res, next) {
  if (!req.user) {
    return res.json({
      error: 1,
      message: `Kamu belum login atau token kadaluwarsa`,
    });
  }
  try {
    const payload = req.body;
    console.log(payload);
    const user = req.user;
    if (user.role === 'user') {
      return res.json({
        error: 1,
        message: 'Kamu tidak memiliki akses',
      });
    } else {
      const id = req.params.id;
      // Validasi integer ID daripada MongoDB ObjectId
      if (!isNaN(parseInt(id))) {
        const newOfficerReport = await OfficerReport.create({
          ...payload,
          officerId: user.id,
        });

        await ReportUser.update(
          {
            officerReportId: newOfficerReport.id,
            officerId: req.user.id,
            status: 'Selesai',
          },
          { where: { id: req.params.id } }
        );

        if (newOfficerReport) {
          return res.json({
            status: 'ok',
            message: 'Laporan berhasil dikirim',
            idReport: newOfficerReport.id,
          });
        }
      } else {
        return res.json({
          error: 1,
          message: 'Laporan tidak ditemukan',
        });
      }
    }
  } catch (err) {
    if (err && (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError')) {
      return formatSequelizeError(err, res);
    }
    next(err);
  }
}

module.exports = {
  addReport,
};

