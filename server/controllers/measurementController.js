const Measurement = require('../models/Measurement');
const { analyzeMeasurement } = require('../utils/analysis');
function validateMeasurement({
  height,
  shoulderWidth,
  chestWidth,
  chestCircumference,
  waistCircumference,
  hipWidth,
  bicepCircumferenceLeft,
  bicepCircumferenceRight,
  forearmCircumferenceLeft,
  forearmCircumferenceRight,
  thighCircumferenceLeft,
  thighCircumferenceRight,
  calfCircumferenceLeft,
  calfCircumferenceRight,
  torsoLength,
  legLength,
  armSpan
}) {
  const validations = [
    { value: height, min: 30, max: 300 },
    { value: shoulderWidth, min: 10, max: 100 },
    { value: chestWidth, min: 10, max: 100 },
    { value: chestCircumference, min: 30, max: 200 },
    { value: waistCircumference, min: 30, max: 150 },
    { value: hipWidth, min: 10, max: 100 },
    { value: bicepCircumferenceLeft, min: 10, max: 70 },
    { value: bicepCircumferenceRight, min: 10, max: 70 },
    { value: forearmCircumferenceLeft, min: 10, max: 60 },
    { value: forearmCircumferenceRight, min: 10, max: 60 },
    { value: thighCircumferenceLeft, min: 20, max: 100 },
    { value: thighCircumferenceRight, min: 20, max: 100 },
    { value: calfCircumferenceLeft, min: 10, max: 70 },
    { value: calfCircumferenceRight, min: 10, max: 70 },
    { value: torsoLength, min: 20, max: 100 },
    { value: legLength, min: 20, max: 130 },
    { value: armSpan, min: 50, max: 250 }
  ];

  return validations.every(({ value, min, max }) => typeof value === "number" && value >= min && value <= max);
}

exports.saveMeasurement = async (req, res) => {
  try {
    // console.log("Received measurement data:", req.body.measurements);
    const measurements = req.body.measurements; // assuming client sends { measurements: { ... } }

    if (!validateMeasurement(measurements)) {
      return res.status(400).json({ message: "Invalid measurement values" });
    }

    const {
      focusAreas,
      suggestions,
      currentRatios,
    } = analyzeMeasurement(measurements);

    const newMeasurement = new Measurement({
      user: req.user.id,
      measurements,
      analysis: {
        focusAreas,
        suggestions,
        currentRatios,
      }
    });

    await newMeasurement.save();

    res.status(201).json({
      message: "Measurement saved successfully",
      data: newMeasurement
    });
  } catch (error) {
    console.error("Save measurement error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllMeasurements = async (req, res) => {
  try {
    const measurements = await Measurement.find({ user: req.user.id }).sort({ createdAt: -1 });
    return res.json(measurements);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
}

exports.getMonthlySummary = async (req, res) => {
  const userId = req.user.id;
  try {
    const latestMeasurement = await Measurement.findOne({ user: userId })
      .sort({ createdAt: -1 });

    if (!latestMeasurement) {
      return res.status(404).json({ message: 'No recent measurements found' });
    }

    const oneMonthAgoDate = new Date();
    oneMonthAgoDate.setDate(oneMonthAgoDate.getDate() - 30);

    const oneMonthOld = await Measurement.findOne({
      user: userId,
      createdAt: { $lte: oneMonthAgoDate }
    }).sort({ createdAt: -1 });

    const extractSummary = (m) => ({
      shoulders: m.measurements?.shoulderWidth || 0,
      chest: m.measurements?.chestCircumference || 0,
      waist: m.measurements?.waistCircumference || 0,
      arms: Math.round(
        ((m.measurements?.bicepCircumferenceLeft || 0) + (m.measurements?.bicepCircumferenceRight || 0)) / 2
      ),
    });

    const response = {
      latest: extractSummary(latestMeasurement),
    };

    if (oneMonthOld) {
      response.oneMonthAgo = extractSummary(oneMonthOld);
    }

    res.json(response);
  } catch (error) {
    console.error('Error fetching measurements:', error);
    res.status(500).json({ message: 'Server error' });
  }
}


exports.getLatestAnalysis = async (req, res) => {
  try {
    const latestMeasurement = await Measurement.findOne({ user: req.user.id })
      .sort({ createdAt: -1 }) // Get the most recent entry
      .select('analysis createdAt'); // Only select what's needed

    if (!latestMeasurement) {
      return res.status(404).json({ message: "No measurement data found." });
    }

    latestMeasurement.analysis.idealRatios = {
      shoulderToWaistRatio: 1.6, // Ideal ratio: typically around 1.5-1.6
      chestToWaistRatio: 1.3, // Ideal ratio: typically around 1.2-1.3
      armSpanToHeightRatio: 1.0, // Ideal ratio: arm span = height
      upperBodyProportion: 0.45, // Ideal ratio: upper body (torso) is around 45% of height
      lowerBodyProportion: 0.55, // Ideal ratio: lower body (legs) is around 55% of height
      bicepImbalance: 0.0, // Ideal: No imbalance between left and right
      forearmImbalance: 0.0, // Ideal: No imbalance between left and right
      thighImbalance: 0.0, // Ideal: No imbalance between left and right
      calfThighRatioLeft: 0.6, // Ideal ratio: calves to thighs is often around 0.6
      calfThighRatioRight: 0.6 // Ideal ratio: calves to thighs is often around 0.6
    };
    res.status(200).json({
      message: "Latest analysis fetched successfully",
      analysis: latestMeasurement.analysis,
      date: latestMeasurement.createdAt
    });

  } catch (error) {
    console.error("Fetch analysis error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
