const Measurement = require('../models/Measurement');
const calculateRatios = require('./calculateRatios');

async function generateMotivationalMessage(userId) {
  const now = new Date();
  const oneMonthAgo = new Date(now.setDate(now.getDate() - 30));

  // Get the most recent measurement
  const currentMeasurement = await Measurement.findOne({ user: userId })
    .sort({ createdAt: -1 });

  if (!currentMeasurement) return null;

  // Get the most recent measurement from around 1 month ago
  const baselineMeasurement = await Measurement.findOne({
    user: userId,
    createdAt: { $lte: oneMonthAgo },
  }).sort({ createdAt: -1 });

  if (!baselineMeasurement) return null;

  const latest = currentMeasurement.measurements;
  const prev = baselineMeasurement.measurements;

  const changes = [];

  // 1. Raw measurement progress
  const metrics = {
    chestCircumference: 'chest',
    waistCircumference: 'waist',
    bicepCircumferenceRight: 'right bicep',
    thighCircumferenceRight: 'right thigh',
    shoulderWidth: 'shoulders',
  };

  for (const key in metrics) {
    const diff = latest[key] - prev[key];
    if (diff > 0.5) {
      changes.push(`Your ${metrics[key]} grew by ${diff.toFixed(1)} cm 💪`);
    } else if (diff < -0.5) {
      changes.push(`You trimmed ${Math.abs(diff).toFixed(1)} cm from your ${metrics[key]} 🔥`);
    }
  }

  // 2. Proportional progress
  const latestRatios = calculateRatios(latest);
  const prevRatios = calculateRatios(prev);

  const proportionDiffs = [
    {
      key: 'shoulderToWaistRatio',
      label: 'shoulder-to-waist ratio',
      improvement: 'more V-shaped',
    },
    {
      key: 'chestToWaistRatio',
      label: 'chest-to-waist ratio',
      improvement: 'more athletic',
    },
    {
      key: 'bicepImbalance',
      label: 'bicep symmetry',
      lowerIsBetter: true,
    },
  ];

  proportionDiffs.forEach(({ key, label, improvement, lowerIsBetter }) => {
    const latestVal = parseFloat(latestRatios[key]);
    const prevVal = parseFloat(prevRatios[key]);

    if (!isNaN(latestVal) && !isNaN(prevVal)) {
      const diff = latestVal - prevVal;

      if (!lowerIsBetter && diff > 0.03) {
        changes.push(`Your ${label} improved — looking ${improvement || 'better'} 🔥`);
      } else if (lowerIsBetter && diff < -0.02) {
        changes.push(`Your ${label} is improving — more balanced 💪`);
      }
    }
  });

  if (changes.length === 0) return null;

  return `Monthly Progress: ${changes.slice(0, 2).join(' And ')}. Keep it up! 🚀`;
}

module.exports = { generateMotivationalMessage };
