const Tutor = require('../models/Tutor');
const User = require('../models/User');

exports.getAllTutors = async (req, res) => {
  try {
    const tutors = await Tutor.find()
      .populate('user', 'name email avatar')
      .sort('-rating');

    res.status(200).json({
      status: 'success',
      results: tutors.length,
      data: { tutors }
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getTutor = async (req, res) => {
  try {
    const tutor = await Tutor.findById(req.params.id)
      .populate('user', 'name email avatar')
      .populate('reviews.user', 'name avatar');

    if (!tutor) {
      return res.status(404).json({ message: 'Tutor not found' });
    }

    res.status(200).json({
      status: 'success',
      data: { tutor }
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.becomeTutor = async (req, res) => {
  try {
    const { subjects, bio, education, experience } = req.body;
    
    const existingTutor = await Tutor.findOne({ user: req.user.id });
    if (existingTutor) {
      return res.status(400).json({ message: 'You are already a tutor' });
    }

    const tutor = await Tutor.create({
      user: req.user.id,
      subjects,
      bio,
      education,
      experience
    });

    // Update user role to teacher
    await User.findByIdAndUpdate(req.user.id, { role: 'teacher' });

    res.status(201).json({
      status: 'success',
      data: { tutor }
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.bookSession = async (req, res) => {
  try {
    const { tutorId, date, time } = req.body;
    
    const tutor = await Tutor.findById(tutorId);
    if (!tutor) {
      return res.status(404).json({ message: 'Tutor not found' });
    }

    // Check if slot is available
    const slot = tutor.availableSlots.find(s => 
      s.date.toISOString() === new Date(date).toISOString() && 
      s.times.includes(time)
    );

    if (!slot) {
      return res.status(400).json({ message: 'Selected slot is not available' });
    }

    // Remove the booked time from available slots
    slot.times = slot.times.filter(t => t !== time);
    if (slot.times.length === 0) {
      tutor.availableSlots = tutor.availableSlots.filter(s => 
        s.date.toISOString() !== new Date(date).toISOString()
      );
    }

    await tutor.save();

    // In a real app, you would create a booking record here

    res.status(200).json({
      status: 'success',
      message: 'Session booked successfully'
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};