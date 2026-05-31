const { DataTypes } = require('sequelize');
const sequelize = require('../../connection');

const Category = sequelize.define('Category', {
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
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [3, 255],
        msg: 'Nama kategori harus berjarak minimal 3 karakter',
      }
    }
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Gambar kategori harus ada',
      }
    }
  }
}, {
  timestamps: true,
  hooks: {
    afterCreate: async (category) => {
      if (!category.category_id) {
        category.category_id = category.id;
        await category.save({ hooks: false });
      }
    }
  }
});

Category.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  values._id = this.id;
  return values;
};

module.exports = Category;

