const mongoose = require('mongoose');
const Application = require('../models/Application');

// @desc    Get dashboard statistics (overview cards)
// @route   GET /api/dashboard/stats
// @access  Private
exports.getStats = async (req, res, next) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const counts = await Application.aggregate([
      { $match: { user: userId } },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    const statusMap = {
      Applied: 0,
      'Under Review': 0,
      Interview: 0,
      Offer: 0,
      Rejected: 0,
    };

    counts.forEach((c) => {
      statusMap[c._id] = c.count;
    });

    const total = Object.values(statusMap).reduce((a, b) => a + b, 0);

    res.status(200).json({
      success: true,
      stats: {
        total,
        applied: statusMap.Applied,
        underReview: statusMap['Under Review'],
        interview: statusMap.Interview,
        offer: statusMap.Offer,
        rejected: statusMap.Rejected,
        pending: statusMap.Applied + statusMap['Under Review'] + statusMap.Interview,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get chart data (applications per month, status distribution, success rate)
// @route   GET /api/dashboard/charts
// @access  Private
exports.getCharts = async (req, res, next) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    // Applications per month (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);
    sixMonthsAgo.setHours(0, 0, 0, 0);

    const perMonthRaw = await Application.aggregate([
      { $match: { user: userId, appliedDate: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: { year: { $year: '$appliedDate' }, month: { $month: '$appliedDate' } },
          count: { $sum: 1 },
        },
      },
    ]);

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const applicationsPerMonth = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const match = perMonthRaw.find(
        (m) => m._id.year === d.getFullYear() && m._id.month === d.getMonth() + 1
      );
      applicationsPerMonth.push({
        month: monthNames[d.getMonth()],
        applications: match ? match.count : 0,
      });
    }

    // Status distribution
    const statusRaw = await Application.aggregate([
      { $match: { user: userId } },
      { $group: { _id: '$status', value: { $sum: 1 } } },
    ]);
    const statusDistribution = statusRaw.map((s) => ({ name: s._id, value: s.value }));

    // Interview success rate: offers / interviews (+offers+rejected post-interview)
    const totalApplications = await Application.countDocuments({ user: userId });
    const interviewed = await Application.countDocuments({
      user: userId,
      status: { $in: ['Interview', 'Offer', 'Rejected'] },
    });
    const offers = await Application.countDocuments({ user: userId, status: 'Offer' });

    const interviewRate = totalApplications > 0 ? Math.round((interviewed / totalApplications) * 100) : 0;
    const successRate = interviewed > 0 ? Math.round((offers / interviewed) * 100) : 0;

    res.status(200).json({
      success: true,
      charts: {
        applicationsPerMonth,
        statusDistribution,
        interviewRate,
        successRate,
      },
    });
  } catch (error) {
    next(error);
  }
};
