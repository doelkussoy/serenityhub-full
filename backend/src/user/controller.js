const User = require('./model');
const UnitWork = require('../unitWork/model');

async function getOfficer(req, res, next) {
  if (!req.user) {
    return res.json({
      error: 1,
      message: `Kamu belum login atau token kadaluwarsa`,
    });
  }
  try {
    const userRole = req.user.role;
    if (userRole !== 'admin') {
      return res.json({
        error: 1,
        message: 'Kamu tidak memiliki akses',
      });
    } else {
      let { limit = 8, skip = 0, unitwork = '' } = req.query;
      let criteria = {
        role: 'officer',
      };
      if (unitwork.length) {
        criteria.unitWorkId = unitwork;
      }

      const officer = await User.findAll({
        where: criteria,
        attributes: ['id', 'name', 'email', 'role', 'unitWorkId'],
        include: [{
          model: UnitWork,
          as: 'unitWork',
          attributes: ['id', 'name', 'image'],
        }],
        limit: parseInt(limit),
        offset: parseInt(skip),
      });

      const totalOfficer = await User.count({ where: criteria });

      return res.json({
        status: 'ok',
        cout: totalOfficer,
        data: officer,
      });
    }
  } catch (err) {
    return res.json({
      error: 1,
      message: err.message,
    });
  }
}

async function deleteOfficer(req, res, next) {
  if (!req.user) {
    return res.json({
      error: 1,
      message: `Kamu belum login atau token kadaluwarsa`,
    });
  }
  try {
    const userRole = req.user.role;
    if (userRole !== 'admin') {
      return res.json({
        error: 1,
        message: 'Kamu tidak memiliki akses',
      });
    } else {
      const deleteCount = await User.destroy({ where: { id: req.params.id } });
      if (deleteCount > 0) {
        return res.json({
          statu: 'oke', // keeping original typo "statu" for frontend compatibility!
          message: 'Berhasil menghapus petugas',
        });
      } else {
        return res.json({
          error: 1,
          message: 'Petugas tidak ditemukan',
        });
      }
    }
  } catch (error) {
    return res.json({
      error: 1,
      message: error.message || error,
    });
  }
}

async function getOfficerById(req, res, next) {
  if (!req.user) {
    return res.json({
      error: 1,
      message: `Kamu belum login atau token kadaluwarsa`,
    });
  }
  try {
    const userRole = req.user.role;
    if (userRole !== 'admin') {
      return res.json({
        error: 1,
        message: 'Kamu tidak memiliki akses',
      });
    } else {
      const officer = await User.findOne({
        where: { id: req.params.id, role: 'officer' },
        attributes: ['id', 'name', 'email', 'role', 'unitWorkId'],
        include: [{
          model: UnitWork,
          as: 'unitWork',
          attributes: ['id', 'name', 'image'],
        }],
      });

      if (!officer) {
        return res.json({
          error: 1,
          message: 'Petugas tidak ditemukan',
        });
      }

      return res.json({
        status: 'ok',
        data: officer,
      });
    }
  } catch (err) {
    return res.json({
      error: 1,
      message: err.message,
    });
  }
}

async function updateOfficer(req, res, next) {
  if (!req.user) {
    return res.json({
      error: 1,
      message: `Kamu belum login atau token kadaluwarsa`,
    });
  }
  try {
    const userRole = req.user.role;
    if (userRole !== 'admin') {
      return res.json({
        error: 1,
        message: 'Kamu tidak memiliki akses',
      });
    }

    const { name, email, unitWorkId, password } = req.body;
    const { id } = req.params;

    const officer = await User.findOne({ where: { id, role: 'officer' } });
    if (!officer) {
      return res.json({
        error: 1,
        message: 'Petugas tidak ditemukan',
      });
    }

    if (name) officer.name = name;
    if (email) officer.email = email;
    if (unitWorkId === '' || unitWorkId === null) {
      officer.unitWorkId = null;
    } else if (unitWorkId !== undefined) {
      officer.unitWorkId = unitWorkId;
    }

    if (password && password.trim().length > 0) {
      officer.password = password;
    }

    await officer.save();

    return res.json({
      status: 'ok',
      message: 'Berhasil memperbarui petugas',
    });
  } catch (err) {
    if (err && (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError')) {
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
    return res.json({
      error: 1,
      message: err.message || err,
    });
  }
}

module.exports = { getOfficer, deleteOfficer, getOfficerById, updateOfficer };

