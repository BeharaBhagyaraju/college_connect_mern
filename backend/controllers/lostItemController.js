const LostItem = require('../models/LostItem');

// Get all lost items
exports.getLostItems = async (req, res) => {
  try {
    const items = await LostItem.find().sort({ createdAt: -1 }).populate('reportedBy', 'username');
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a lost item report
exports.createLostItem = async (req, res) => {
  try {
    const { itemName, description, locationFound, status } = req.body;
    let photoPath = '';
    
    // Cloudinary upload returns the URL in req.file.path
    if (req.file && req.file.path) {
      photoPath = req.file.path;
    }

    const newItem = new LostItem({
      itemName,
      description,
      locationFound,
      status: status || 'lost',
      photoPath,
      reportedBy: req.user.id
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Resolve/Claim an item
exports.resolveItem = async (req, res) => {
  try {
    const item = await LostItem.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (item.reportedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized to resolve this item' });
    }

    item.resolved = true;
    item.claimedBy = req.user.id;
    item.status = 'found';

    await item.save();
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a lost item
exports.deleteLostItem = async (req, res) => {
  try {
    const item = await LostItem.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (item.reportedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await item.deleteOne();
    res.json({ message: 'Item removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
