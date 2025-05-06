const mongoose = require('mongoose');

const MeasurementSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  measurements: {
    height: Number,
    shoulderWidth: Number,
    chestWidth: Number,
    chestCircumference: Number,
    waistCircumference: Number,
    hipWidth: Number,
    bicepCircumferenceLeft: Number,
    bicepCircumferenceRight: Number,
    forearmCircumferenceLeft: Number,
    forearmCircumferenceRight: Number,
    thighCircumferenceLeft: Number,
    thighCircumferenceRight: Number,
    calfCircumferenceLeft: Number,
    calfCircumferenceRight: Number,
    torsoLength: Number,
    legLength: Number,
    armSpan: Number
  },
  analysis: {
    type: Object,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Measurement', MeasurementSchema);
