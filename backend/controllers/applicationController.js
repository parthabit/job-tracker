const Application = require('../models/Application');

// @desc    Get all applications for logged-in user (with search, filter, sort)
// @route   GET /api/applications
// @access  Private
exports.getApplications = async (req, res, next) => {
  try {
    const { search, status, sort, jobType } = req.query;

    const query = { user: req.user.id };

    if (status && status !== 'All') {
      query.status = status;
    }

    if (jobType && jobType !== 'All') {
      query.jobType = jobType;
    }

    if (search) {
      query.$or = [
        { company: { $regex: search, $options: 'i' } },
        { jobTitle: { $regex: search, $options: 'i' } },
      ];
    }

    let sortOption = { createdAt: -1 };
    if (sort === 'oldest') sortOption = { appliedDate: 1 };
    if (sort === 'newest') sortOption = { appliedDate: -1 };
    if (sort === 'company') sortOption = { company: 1 };

    const applications = await Application.find(query).sort(sortOption);

    res.status(200).json({ success: true, count: applications.length, applications });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single application
// @route   GET /api/applications/:id
// @access  Private
exports.getApplication = async (req, res, next) => {
  try {
    const application = await Application.findOne({ _id: req.params.id, user: req.user.id });

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    res.status(200).json({ success: true, application });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new application
// @route   POST /api/applications
// @access  Private
exports.createApplication = async (req, res, next) => {
  try {
    req.body.user = req.user.id;
    const application = await Application.create(req.body);
    res.status(201).json({ success: true, application });
  } catch (error) {
    next(error);
  }
};

// @desc    Update application
// @route   PUT /api/applications/:id
// @access  Private
exports.updateApplication = async (req, res, next) => {
  try {
    let application = await Application.findOne({ _id: req.params.id, user: req.user.id });

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    application = await Application.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, application });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete application
// @route   DELETE /api/applications/:id
// @access  Private
exports.deleteApplication = async (req, res, next) => {
  try {
    const application = await Application.findOne({ _id: req.params.id, user: req.user.id });

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    await application.deleteOne();

    res.status(200).json({ success: true, message: 'Application deleted' });
  } catch (error) {
    next(error);
  }
};
