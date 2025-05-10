exports.generateSuggestions = (ratios, measurements) => {
  const focusAreas = [];
  const suggestions = [];

  const {
    shoulderToWaistRatio,
    chestToWaistRatio,
    armSpanToHeightRatio,
    upperBodyProportion,
    lowerBodyProportion,
    calfThighRatioLeft,
    calfThighRatioRight
  } = ratios;

  const {
    bicepCircumferenceLeft,
    bicepCircumferenceRight,
    forearmCircumferenceLeft,
    forearmCircumferenceRight,
    thighCircumferenceLeft,
    thighCircumferenceRight
  } = measurements;

  const idealRatios = {
    idealShoulderToWaistRatio: 1.618,
    idealChestToWaistRatio: 1.4,
    idealArmSpanToHeightRatio: 1.0,
    idealUpperBodyProportion: 0.45,
    idealLowerBodyProportion: 0.45
  };

  // Shoulder
  if (shoulderToWaistRatio < idealRatios.idealShoulderToWaistRatio * 0.95) {
    focusAreas.push("Shoulders");
    suggestions.push("Increase shoulder width with lateral raises and overhead presses.");
  }

  // Chest
  if (chestToWaistRatio < idealRatios.idealChestToWaistRatio * 0.95) {
    focusAreas.push("Chest");
    suggestions.push("Add more bench presses and chest flyes.");
  }

  // Arm span
  if (armSpanToHeightRatio < idealRatios.idealArmSpanToHeightRatio) {
    focusAreas.push("Arm Span");
    suggestions.push("Focus on back and chest exercises to improve arm span.");
  }

  // Upper body
  if (upperBodyProportion < idealRatios.idealUpperBodyProportion) {
    suggestions.push("Focus on building upper body muscle mass (chest, back).");
  }

  // Lower body
  if (lowerBodyProportion > idealRatios.idealLowerBodyProportion) {
    suggestions.push("Strengthen upper body to balance long legs.");
  }

  // Bicep imbalance
  const bicepImbalanceValue = Math.abs(bicepCircumferenceLeft - bicepCircumferenceRight);
  if (bicepImbalanceValue > 1.5) {
    const weakerSide = bicepCircumferenceLeft < bicepCircumferenceRight ? "Left" : "Right";
    suggestions.push(`Bicep imbalance detected. Focus on strengthening the ${weakerSide} bicep with single-arm curls and tricep extensions.`);
  }

  // Forearm imbalance
  const forearmImbalanceValue = Math.abs(forearmCircumferenceLeft - forearmCircumferenceRight);
  if (forearmImbalanceValue > 1.5) {
    const weakerSide = forearmCircumferenceLeft < forearmCircumferenceRight ? "Left" : "Right";
    suggestions.push(`Forearm imbalance detected. Focus on strengthening the ${weakerSide} forearm with wrist curls and reverse curls.`);
  }

  // Thigh imbalance
  const thighDiff = Math.abs(thighCircumferenceLeft - thighCircumferenceRight);
  if (thighDiff > 1.5) {
    const weakerSide = thighCircumferenceLeft < thighCircumferenceRight ? "Left" : "Right";
    suggestions.push(`Thigh imbalance detected. Focus on strengthening the ${weakerSide} thigh with lunges and single-leg squats.`);
  }

  // Calf-to-thigh imbalance
  if (calfThighRatioLeft < 0.6) {
    suggestions.push("Left calf is underdeveloped. Train it with seated and standing calf raises.");
  }
  if (calfThighRatioRight < 0.6) {
    suggestions.push("Right calf is underdeveloped. Train it with seated and standing calf raises.");
  }

  if (focusAreas.length === 0 && suggestions.length === 0) {
    suggestions.push("Your proportions are close to ideal. Focus on overall strength and maintenance.");
  }

  return { focusAreas, suggestions, idealRatios };
};
