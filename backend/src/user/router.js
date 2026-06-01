const router = require('express').Router();
const multer = require('multer');
const userController = require('./controller');

router.get('/admin/officer', userController.getOfficer);
router.get('/admin/officer/:id', userController.getOfficerById);
router.delete(
  '/admin/officer/:id',
  multer().none(),
  userController.deleteOfficer,
);
router.put(
  '/admin/officer/:id',
  multer().none(),
  userController.updateOfficer,
);

module.exports = router;
