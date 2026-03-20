const Notice = require('../models/Notice');
const User = require('../models/User');

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private
const getDashboardStats = async (req, res) => {
  try {
    const totalNotices = await Notice.countDocuments();
    const officialNotices = await Notice.countDocuments({ type: 'official' });
    const unofficialNotices = await Notice.countDocuments({ type: 'unofficial' });
    const totalUsers = await User.countDocuments();
    
    // Get 5 most recent notices
    const recentNotices = await Notice.find()
      .populate('createdBy', 'username')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalNotices,
      officialNotices,
      unofficialNotices,
      totalUsers,
      recentNotices
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Server error fetching dashboard stats' });
  }
};

module.exports = {
  getDashboardStats
};
