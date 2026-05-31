const { DataTypes } = require('sequelize');
const sequelize = require('../../connection');
const bcrypt = require('bcrypt');
const UnitWork = require('../unitWork/model');

const HASH_ROUND = 10;

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  _id: {
    type: DataTypes.VIRTUAL,
    get() {
      return this.id;
    }
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      len: {
        args: [3, 50],
        msg: 'Nama harus berjarak 3 hingga 50 karakter',
      }
    }
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: {
      msg: 'Email sudah terdaftar',
    },
    validate: {
      isEmail: {
        msg: 'Harus merupakan email yang valid',
      }
    }
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('user', 'admin', 'officer'),
    defaultValue: 'user',
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  token: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const rawValue = this.getDataValue('token');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      this.setDataValue('token', JSON.stringify(value));
    }
  },
  unitWorkId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
}, {
  timestamps: true,
  hooks: {
    beforeCreate: (user) => {
      if (user.password) {
        user.password = bcrypt.hashSync(user.password, HASH_ROUND);
      }
    },
    beforeUpdate: (user) => {
      if (user.changed('password')) {
        user.password = bcrypt.hashSync(user.password, HASH_ROUND);
      }
    },
    afterCreate: async (user) => {
      if (!user.user_id) {
        user.user_id = user.id;
        await user.save({ hooks: false });
      }
    }
  }
});

// Setup hubungan dengan UnitWork
User.belongsTo(UnitWork, { foreignKey: 'unitWorkId', as: 'unitWork' });
UnitWork.hasMany(User, { foreignKey: 'unitWorkId' });

User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  values._id = this.id;
  if (this.unitWork) {
    values.unitWork = this.unitWork;
  }
  return values;
};

module.exports = User;

