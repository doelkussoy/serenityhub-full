const ReportUser = require('./model');
const User = require('../user/model');
const UnitWork = require('../unitWork/model');
const OfficerReport = require('../officerReport/model');
const Comment = require('../comment/model');
const { Op } = require('sequelize');

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
    const user = req.user;
    const payload = req.body;
    const newReport = await ReportUser.create({
      ...payload,
      reporterId: user.id,
    });

    if (newReport) {
      return res.json({
        status: 'ok',
        message: 'Berhasil menambahkan laporan',
        idReport: newReport.id,
      });
    }
  } catch (err) {
    if (err && (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError')) {
      return formatSequelizeError(err, res);
    }
    next(err);
  }
}

async function getDetailReport(req, res, next) {
  if (!req.user) {
    return res.json({
      error: 1,
      message: `Kamu belum login atau token kadaluwarsa`,
    });
  }
  try {
    const report = await ReportUser.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Comment,
          as: 'comment',
          attributes: ['message', 'name', 'createdAt'],
        },
        {
          model: User,
          as: 'reporter',
          attributes: ['id', 'name'],
        },
        {
          model: OfficerReport,
          as: 'officerReport',
          include: [{ model: User, as: 'officer', attributes: ['id', 'name'] }]
        },
        {
          model: UnitWork,
          as: 'unitWorks',
          attributes: ['id', 'name', 'image'],
        },
      ],
    });
    if (report) {
      return res.json({
        status: 'ok',
        data: report,
      });
    } else {
      return res.json({
        error: 1,
        message: 'Laporan tidak ditemukan',
      });
    }
  } catch (err) {
    console.error('getDetailReport error:', err);
    return res.json({
      error: 1,
      message: err.message || 'Laporan tidak ditemukan',
    });
  }
}

async function getAllReport(req, res, next) {
  try {
    let { limit = 8, skip = 0, q = '', status = '' } = req.query;
    let criteria = {};
    if (q.length) {
      criteria.title = { [Op.like]: `%${q}%` };
    }
    if (status.length) {
      criteria.status = status;
      if (q.length) {
        criteria.title = { [Op.like]: `%${q}%` };
      }
    }
    const count = await ReportUser.count({ where: criteria });
    const report = await ReportUser.findAll({
      where: criteria,
      limit: parseInt(limit),
      offset: parseInt(skip),
      attributes: ['id', 'title', 'status', 'description', 'imageReport', 'createdAt', 'address'],
      include: [
        {
          model: Comment,
          as: 'comment',
          attributes: ['message', 'name'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    if (report) {
      return res.json({
        status: 'ok',
        count,
        data: report,
      });
    }
  } catch (err) {
    return res.json({
      error: 1,
      message: err.message,
    });
  }
}

async function getAllReportByUnitWorks(req, res, next) {
  try {
    let { limit = 8, skip = 0, q = '', status = '' } = req.query;

    let criteria = {
      unitWorksId: req.params.id,
      status: 'Diproses',
    };
    if (q.length) {
      criteria.title = { [Op.like]: `%${q}%` };
    }
    const count = await ReportUser.count({ where: criteria });
    const report = await ReportUser.findAll({
      where: criteria,
      limit: parseInt(limit),
      offset: parseInt(skip),
      attributes: ['id', 'title', 'status', 'description', 'imageReport', 'unitWorksId', 'createdAt', 'address'],
      include: [
        {
          model: Comment,
          as: 'comment',
          attributes: ['message', 'name'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    if (report) {
      return res.json({
        status: 'ok',
        count,
        data: report,
      });
    }
  } catch (err) {
    return res.json({
      error: 1,
      message: err.message,
    });
  }
}

async function getAllReportByOfficer(req, res, next) {
  try {
    let { limit = 8, skip = 0, q = '', status = '' } = req.query;
    let criteria = {
      officerId: req.params.id,
    };
    if (q.length) {
      criteria.title = { [Op.like]: `%${q}%` };
    }
    const count = await ReportUser.count({ where: criteria });

    const report = await ReportUser.findAll({
      where: criteria,
      limit: parseInt(limit),
      offset: parseInt(skip),
      attributes: ['id', 'title', 'status', 'description', 'imageReport', 'unitWorksId', 'createdAt', 'address'],
      include: [
        {
          model: Comment,
          as: 'comment',
          attributes: ['message', 'name'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    if (report) {
      return res.json({
        status: 'ok',
        count,
        data: report,
      });
    }
  } catch (err) {
    return res.json({
      error: 1,
      message: err.message,
    });
  }
}

async function assignReportToUnitWork(req, res, next) {
  if (!req.user) {
    return res.json({
      error: 1,
      message: `Kamu belum login atau token kadaluwarsa`,
    });
  }
  try {
    const payload = req.body;
    const userRole = req.user.role;
    if (userRole !== 'admin') {
      return res.json({
        error: 1,
        message: 'Kamu tidak memiliki akses',
      });
    } else {
      const report = await ReportUser.update(
        { unitWorksId: payload.selectedOption, status: 'Diproses' },
        { where: { id: req.params.id } }
      );
      if (report[0] > 0) {
        return res.json({
          status: 'ok',
          message: 'Unit kerja memiliki laporan',
        });
      } else {
        return res.json({
          error: 1,
          message: 'Laporan atau unit kerja tidak ditemukan',
        });
      }
    }
  } catch (error) {
    return res.json({
      error: 1,
      message: 'Laporan atau unit kerja tidak ditemukan',
    });
  }
}

async function getAllReportCoordinate(req, res, next) {
  if (!req.user) {
    return res.json({
      error: 1,
      message: `Kamu belum login atau token kadaluwarsa`,
    });
  }
  try {
    if (req.user.role !== 'admin') {
      return res.json({
        error: 1,
        message: 'Kamu tidak memiliki akses',
      });
    } else {
      const report = await ReportUser.findAll({
        attributes: ['latitude', 'longitude', 'id', 'status'],
      });
      if (report) {
        return res.json({
          status: 'ok',
          message: 'List laporan dan unit kerja',
          data: report,
        });
      } else {
        return res.status(500).json({
          error: 1,
          message: 'Gagal',
        });
      }
    }
  } catch (err) {
    return res.json({
      error: 1,
      message: err.message || err,
    });
  }
}

async function deleteReport(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.json({
      error: 1,
      message: 'Kamu tidak memiliki akses',
    });
  }
  try {
    const deleteCount = await ReportUser.destroy({
      where: { id: req.params.id }
    });
    if (deleteCount > 0) {
      return res.json({
        status: 'ok',
        message: 'Berhasil menghapus laporan',
      });
    } else {
      return res.json({
        error: 1,
        message: 'Laporan tidak ditemukan',
      });
    }
  } catch (error) {
    return res.json({
      error: 1,
      message: error.message || error,
    });
  }
}

async function getReportByUser(req, res, next) {
  if (!req.user) {
    return res.json({
      error: 1,
      message: `Kamu belum login atau token kadaluwarsa`,
    });
  }
  try {
    let { limit = 8, skip = 0, q = '', status = '' } = req.query;
    let criteria = {
      reporterId: req.params.id,
    };
    if (q.length) {
      criteria.title = { [Op.like]: `%${q}%` };
    }
    if (status.length) {
      criteria.status = status;
      if (q.length) {
        criteria.title = { [Op.like]: `%${q}%` };
      }
    }
    const count = await ReportUser.count({ where: criteria });

    const report = await ReportUser.findAll({
      where: criteria,
      limit: parseInt(limit),
      offset: parseInt(skip),
      attributes: ['id', 'title', 'status', 'description', 'imageReport', 'unitWorksId', 'createdAt', 'address'],
      include: [
        {
          model: Comment,
          as: 'comment',
          attributes: ['message', 'name'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    if (report) {
      return res.json({
        status: 'ok',
        count,
        data: report,
      });
    }
  } catch (err) {
    return res.json({
      error: 1,
      message: err.message,
    });
  }
}

module.exports = {
  getDetailReport,
  getAllReport,
  addReport,
  deleteReport,
  assignReportToUnitWork,
  getAllReportByUnitWorks,
  getAllReportByOfficer,
  getAllReportCoordinate,
  getReportByUser,
};

