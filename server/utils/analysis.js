const calculateRatios = require('./calculateRatios');
const { generateSuggestions } = require('./generateSuggestions');

function analyzeMeasurement(measurements) {
  const currentRatios = calculateRatios(measurements);
  const { focusAreas, suggestions } = generateSuggestions(currentRatios, measurements);

  return {
    focusAreas,
    suggestions,
    currentRatios,
  };
}

module.exports = {
  analyzeMeasurement,
}