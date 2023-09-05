const Remark = require('../models/Remark');

// Create a new Remark
exports.createRemark = async (req, res) => {
  try {
    const { subjectId, studentId, remarkName} = req.body;
    const newRemark = new Remark({
      subjectId,
      studentId,
      remarkName
    });
    const savedRemark = await newRemark.save();
    res.json(savedRemark);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all Remarks
exports.getAllRemarks = async (req, res) => {
  try {
    const remarks = await Remark.find();
    res.json(remarks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single Remark by ID
exports.getRemarkById = async (req, res) => {
  try {
    const remark = await Remark.findById(req.params.id);
    if (!remark) {
      return res.status(404).json({ message: 'Remark not found' });
    }
    res.json(remark);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a Remark by ID
exports.updateRemarkById = async (req, res) => {
  try {
    const { subjectId, studentId, remarkName } = req.body;
    const updatedRemark = await Remark.findByIdAndUpdate(
      req.params.id,
      { subjectId, studentId, remarkName},
      { new: true }
    );
    if (!updatedRemark) {
      return res.status(404).json({ message: 'Remark not found' });
    }
    res.json(updatedRemark);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a Remark by ID
exports.deleteRemarkById = async (req, res) => {
  try {
    const deletedRemark = await Remark.findByIdAndRemove(req.params.id);
    if (!deletedRemark) {
      return res.status(404).json({ message: 'Remark not found' });
    }
    res.json({ message: 'Remark deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
