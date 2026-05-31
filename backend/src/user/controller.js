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
        attributes: ['id', 'name', 'role', 'unitWorkId'],
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

module.exports = { getOfficer, deleteOfficer };

