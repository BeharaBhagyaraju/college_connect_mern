const express = require('express');
const router = express.Router();
const lostItemController = require('../controllers/lostItemController');
const { authMiddleware } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

router.get('/', lostItemController.getLostItems);
router.post('/', authMiddleware, upload.single('photo'), lostItemController.createLostItem);
router.put('/:id/resolve', authMiddleware, lostItemController.resolveItem);
router.delete('/:id', authMiddleware, lostItemController.deleteLostItem);

module.exports = router;
