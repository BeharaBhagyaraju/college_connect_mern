const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

router.get('/', authMiddleware, adminMiddleware, userController.getAllUsers);
router.delete('/:id', authMiddleware, adminMiddleware, userController.deleteUser);
router.post('/admin', authMiddleware, adminMiddleware, userController.addAdmin);
router.put('/:id/role', authMiddleware, adminMiddleware, userController.updateUserRole);

module.exports = router;
