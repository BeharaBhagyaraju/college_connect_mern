const Notice = require('../models/Notice');

// Get all notices
exports.getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 }).populate('createdBy', 'username role');
    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a notice
exports.createNotice = async (req, res) => {
  try {
    let { title, content, type } = req.body;

    // Server-side enforcement of Notice Types
    if (req.user.role === 'admin') type = 'official';
    else if (req.user.role === 'class_representative') type = 'unofficial';
    else return res.status(403).json({ message: 'Not authorized to create notices' });

    const newNotice = new Notice({
      title,
      content,
      type,
      createdBy: req.user.id
    });

    await newNotice.save();
    res.status(201).json(newNotice);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a notice
exports.deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    
    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    // Check user authorization (admin or creator)
    if (notice.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await notice.deleteOne();
    res.json({ message: 'Notice removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
