const { DataTypes } = require('sequelize');
const sequelize = require('../../connection');

const OfficerReport = sequelize.define('OfficerReport', {
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
  message: {
    type: DataTypes.TEXT,
    allowNull: true,
    validate: {
      len: {
        args: [3, 65535],
        msg: 'Pesan laporan petugas minimal 3 karakter',
      }
    }
  },
  imageReport: {
    type: DataTypes.TEXT,
    allowNull: false,
    get() {
      const rawValue = this.getDataValue('imageReport');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      this.setDataValue('imageReport', JSON.stringify(value));
    },
    validate: {
      notEmptyArray(value) {
        let parsed = value;
        if (typeof value === 'string') {
          try {
            parsed = JSON.parse(value);
          } catch (e) {}
        }
        if (!Array.isArray(parsed) || parsed.length === 0) {
          throw new Error('Gambar tidak boleh kosong');
        }
      }
    }
  },
  officerId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
}, {
  timestamps: true,
});

OfficerReport.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  values._id = this.id;
  return values;
};

module.exports = OfficerReport;

