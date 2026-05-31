const Category = require('./model');

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

async function addCategory(req, res, next) {
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
      const newCategory = await Category.create({ ...payload });
      if (newCategory) {
        return res.json({
          status: 'ok',
          message: 'Tambah kategori berhasil',
          categoryId: newCategory.id,
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

async function getCategory(req, res, next) {
  try {
    const category = await Category.findAll({
      attributes: ['category_id', 'name', 'image'], // matching excluded -_id -__v from original
    });
    if (category) {
      return res.json({
        status: 'ok',
        data: category,
      });
    }
  } catch (err) {
    return res.json({
      error: 1,
      message: err.message,
    });
  }
}

async function deleteCategory(req, res, next) {
  const userRole = req.user.role;

  if (!req.user && userRole === 'user') {
    return res.json({
      error: 1,
      message: `Kamu belum login atau token kadaluwarsa`,
    });
  }
  try {
    const categoryId = req.params.id;
    const category = await Category.findOne({
      where: { category_id: categoryId }
    });
    if (category) {
      await category.destroy();
      return res.json({
        status: 'ok',
        message: 'Hapus kategori berhasil',
      });
    } else {
      return res.json({
        error: 1,
        message: 'Kategori tidak ditemukan',
      });
    }
  } catch (err) {
    return res.json({
      error: 1,
      message: err.message,
    });
  }
}

module.exports = { addCategory, getCategory, deleteCategory };

