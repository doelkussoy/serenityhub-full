const UnitWork = require('./model');

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

async function addUnitWork(req, res, next) {
  if (!req.user) {
    return res.json({
      error: 1,
      message: `Kamu belum login atau token kadaluwarsa`,
    });
  }
  try {
    const payload = req.body;
    const userRole = req.user.role;
    if (userRole === 'user') {
      return res.json({
        error: 1,
        message: 'Kamu tidak memiliki akses',
      });
    } else {
      const newUnitWork = await UnitWork.create({ ...payload });
      if (newUnitWork) {
        return res.json({
          status: 'ok',
          message: 'Unit kerja berhasil ditambahkan',
          categoryId: newUnitWork.id,
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

async function deleteUnitWork(req, res, next) {
  if (!req.user) {
    return res.json({
      error: 1,
      message: `Kamu belum login atau token kadaluwarsa`,
    });
  }
  try {
    const userRole = req.user.role;

    if (userRole === 'user') {
      return res.json({
        error: 1,
        message: 'Kamu tidak memiliki akses',
      });
    } else {
      const deleteCount = await UnitWork.destroy({ where: { id: req.params.id } });

      if (deleteCount > 0) {
        return res.json({
          status: 'ok',
          message: 'Unit kerja berhasil dihapus',
        });
      } else {
        return res.json({
          error: 1,
          message: 'Unit kerja tidak ditemukan',
        });
      }
    }
  } catch (err) {
    return res.json({
      error: 1,
      message: 'Unit kerja tidak ditemukan',
    });
  }
}

async function getUnitWork(req, res, next) {
  if (!req.user) {
    return res.json({
      error: 1,
      message: `Kamu belum login atau token kadaluwarsa`,
    });
  }

  try {
    const userRole = req.user.role;

    if (userRole === 'user') {
      return res.json({
        error: 1,
        message: 'Kamu tidak memiliki akses',
      });
    }
    const unitWork = await UnitWork.findAll();
    if (unitWork) {
      return res.json({
        status: 'ok',
        data: unitWork,
      });
    }
  } catch (error) {
    return res.json({
      error: 1,
      message: error.message || error,
    });
  }
}

module.exports = { addUnitWork, deleteUnitWork, getUnitWork };

