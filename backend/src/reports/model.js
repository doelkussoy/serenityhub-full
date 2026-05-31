const { DataTypes } = require('sequelize');
const sequelize = require('../../connection');
const User = require('../user/model');
const UnitWork = require('../unitWork/model');
const OfficerReport = require('../officerReport/model');
const Comment = require('../comment/model');

const Report = sequelize.define('Report', {
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
  title: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      len: {
        args: [5, 50],
        msg: 'Judul harus berjarak 5 hingga 50 karakter',
      }
    }
  },
  description: {
    type: DataTypes.STRING(250),
    allowNull: false,
    validate: {
      len: {
        args: [5, 250],
        msg: 'Deskripsi harus berjarak 5 hingga 250 karakter',
      }
    }
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: {
        args: [3, 65535],
        msg: 'Alamat minimal 3 karakter',
      }
    }
  },
  latitude: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  longitude: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('Menunggu', 'Diproses', 'Selesai', 'Ditolak'),
    defaultValue: 'Menunggu',
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
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Kategori harus ada',
      }
    }
  },
  reporterId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  unitWorksId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  officerReportId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  officerId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
}, {
  timestamps: true,
});

// Setup hubungan / asosiasi
Report.belongsTo(User, { as: 'reporter', foreignKey: 'reporterId' });
Report.belongsTo(UnitWork, { as: 'unitWorks', foreignKey: 'unitWorksId' });
Report.belongsTo(OfficerReport, { as: 'officerReport', foreignKey: 'officerReportId' });
Report.belongsTo(User, { as: 'officer', foreignKey: 'officerId' });
Report.hasMany(Comment, { as: 'comment', foreignKey: 'reportId' });

Report.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  values._id = this.id;
  
  if (this.reporter) values.reporter = this.reporter;
  if (this.unitWorks) values.unitWorks = this.unitWorks;
  if (this.officerReport) values.officerReport = this.officerReport;
  if (this.officer) values.officer = this.officer;
  if (this.comment) values.comment = this.comment;
  
  return values;
};

module.exports = Report;

