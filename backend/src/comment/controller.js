const Comment = require('./model');

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

async function addComment(req, res, next) {
  let user = req.user;

  if (!user) {
    return res.json({
      error: 1,
      message: `Kamu belum login atau token kadaluwarsa`,
    });
  }
  try {
    const payload = req.body;
    const comment = await Comment.create({
      ...payload,
      name: user.name,
      reportId: req.params.id, // Direct foreign key association!
    });
    if (comment) {
      return res.json({
        status: 'ok',
        message: 'Berhasil menambahkan komentar',
        idComment: comment.id,
      });
    }
    return res.json({
      error: 1,
      message: `Kamu belum login atau token kadaluwarsa`,
    });
  } catch (err) {
    if (err && (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError')) {
      return formatSequelizeError(err, res);
    }
    next(err);
  }
}

async function deleteComment(req, res, next) {
  if (!req.user) {
    return res.json({
      error: 1,
      message: `Kamu belum login atau token kadaluwarsa`,
    });
  }
  try {
    const deleteCount = await Comment.destroy({ where: { id: req.params.id } });
    if (deleteCount > 0) {
      return res.json({
        status: 'ok',
        message: 'Komentar berhasil dihapus',
      });
    }
    return res.json({
      error: 1,
      message: 'Komentar tidak ditemukan',
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { addComment, deleteComment };

