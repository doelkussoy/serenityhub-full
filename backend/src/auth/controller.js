const User = require('../user/model');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getToken } = require('../utils/getToken');
const config = require('../config');
const { Op } = require('sequelize');

// Helper to format Sequelize errors to look like Mongoose ValidationErrors
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

// Officer register
async function officerRegister(req, res, next) {
  const payload = req.body;

  if (req.user.role !== 'admin') {
    return res.json({
      error: 1,
      message: 'Kamu tidak memiliki akses',
    });
  }
  try {
    const user = await User.create({
      ...payload,
    });
    if (user) {
      return res.json({
        status: 'ok',
        message: 'Berhasil mendaftar',
      });
    }
  } catch (err) {
    if (err && (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError')) {
      return formatSequelizeError(err, res);
    }
    next(err);
  }
}

async function adminRegister(req, res, next) {
  const payload = req.body;
  const secret = config.secretKey;

  if (payload.secretKey !== secret) {
    return res.json({
      error: 1,
      message: 'Kode salah',
    });
  }
  try {
    const user = await User.create({
      ...payload,
    });
    if (user) {
      return res.json({
        status: 'ok',
        message: 'Berhasil mendaftar',
      });
    }
  } catch (err) {
    if (err && (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError')) {
      return formatSequelizeError(err, res);
    }
    next(err);
  }
}

// User register
async function register(req, res, next) {
  try {
    const payload = req.body;
    const user = await User.create(payload);
    if (user) {
      return res.json({
        status: 'ok',
        message: 'Berhasil mendaftar',
      });
    }
  } catch (err) {
    if (err && (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError')) {
      return formatSequelizeError(err, res);
    }
    next(err);
  }
}

async function changeUserPassword(req, res, next) {
  if (!req.user) {
    return res.json({
      error: 1,
      message: `Kamu belum login atau token kadaluwarsa`,
    });
  }
  try {
    const { oldPassword, newPassword } = req.body;
    const user = req.user;
    const findUser = await User.findByPk(user.id);
    if (bcrypt.compareSync(oldPassword, findUser.password)) {
      findUser.password = newPassword; // Hooks beforeUpdate will automatically encrypt it!
      const updateUser = await findUser.save();
      if (updateUser) {
        return res.json({
          status: 'ok',
          message: 'Password berhasil diubah',
        });
      }
    } else {
      return res.json({
        error: 1,
        message: 'Password lama salah',
      });
    }
  } catch (err) {
    return res.json({
      error: 1,
      message: 'Ganti password gagal',
    });
  }
}

async function localStrategy(email, password, done) {
  try {
    let user = await User.findOne({
      where: { email },
      attributes: { exclude: ['createdAt', 'updatedAt', 'token'] },
    });

    if (!user) return done();
    if (bcrypt.compareSync(password, user.password)) {
      const userJSON = user.toJSON();
      delete userJSON.password;
      return done(null, userJSON);
    }
  } catch (err) {
    done(err, null);
  }
  done();
}

async function login(req, res, next) {
  passport.authenticate('local', async function (err, user) {
    if (err) return next(err);
    if (!user)
      return res.json({
        error: 1,
        message: 'Email atau password salah',
      });

    let signed = jwt.sign(user, config.secretKey);
    const findUser = await User.findByPk(user.id);
    if (findUser) {
      findUser.token = [signed];
      await findUser.save();
    }
    return res.json({
      status: 'ok',
      message: 'Login sukses',
      user: user,
      token: signed,
    });
  })(req, res, next);
}

function me(req, res, next) {
  if (!req.user) {
    return res.json({
      error: 1,
      message: `Kamu belum login atau token kadaluwarsa`,
    });
  }
  return res.json(req.user);
}

async function logout(req, res, next) {
  let token = getToken(req);
  if (!token) {
    return res.json({
      error: 1,
      message: 'Token tidak boleh kosong',
    });
  }
  
  const user = await User.findOne({
    where: {
      token: {
        [Op.like]: `%${token}%`
      }
    }
  });

  if (!user) {
    return res.json({
      error: 1,
      message: 'User tidak ditemukan',
    });
  }

  // Hapus token dari array
  user.token = user.token.filter(t => t !== token);
  await user.save();

  return res.json({
    error: 0,
    message: 'Berhasil keluar',
  });
}

module.exports = {
  register,
  localStrategy,
  login,
  me,
  logout,
  changeUserPassword,
  officerRegister,
  adminRegister,
};

