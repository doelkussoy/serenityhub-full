const { getToken } = require('../utils/getToken');
const jwt = require('jsonwebtoken');
const User = require('../user/model');
const config = require('../config');

function decodeToken() {
  return async function (req, res, next) {
    try {
      let token = getToken(req);
      if (!token) return next();
      
      const decoded = jwt.verify(token, config.secretKey);
      req.user = decoded;

      // Cari user berdasarkan ID hasil decode token
      let user = await User.findByPk(decoded.id, {
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
      });

      // Validasi apakah user ada dan token yang digunakan terdaftar
      if (!user || !user.token.includes(token)) {
        return res.json({
          error: 1,
          message: 'Token kadaluwarsa',
        });
      }
    } catch (err) {
      if (err && err.name === 'JsonWebTokenError') {
        return res.json({
          error: 1,
          message: err.message,
        });
      }
      next(err);
    }
    return next();
  };
}

module.exports = {
  decodeToken,
};

