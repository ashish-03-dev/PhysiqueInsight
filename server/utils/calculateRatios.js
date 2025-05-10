function calculateRatios(measurements) {
  const {
    height,
    shoulderWidth,
    waistCircumference,
    chestCircumference,
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
  } = measurements;

  return {
    shoulderToWaistRatio: ((shoulderWidth * 2) / waistCircumference).toFixed(2),
    chestToWaistRatio: (chestCircumference / waistCircumference).toFixed(2),
    armSpanToHeightRatio: (armSpan / height).toFixed(2),
    upperBodyProportion: (torsoLength / height).toFixed(2),
    lowerBodyProportion: (legLength / height).toFixed(2),
    bicepImbalance: Math.abs(bicepCircumferenceLeft - bicepCircumferenceRight).toFixed(2),
    forearmImbalance: Math.abs(forearmCircumferenceLeft - forearmCircumferenceRight).toFixed(2),
    thighImbalance: Math.abs(thighCircumferenceLeft - thighCircumferenceRight).toFixed(2),
    calfThighRatioLeft: (calfCircumferenceLeft / thighCircumferenceLeft).toFixed(2),
    calfThighRatioRight: (calfCircumferenceRight / thighCircumferenceRight).toFixed(2)
  };
}

module.exports = calculateRatios;