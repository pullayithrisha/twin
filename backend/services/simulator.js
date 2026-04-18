// calculate BMR using Mifflin-St Jeor equation
const calculateBMR = (gender, weightKg, heightCm, age) => {
  if (gender === 'male' || gender === 'Male') {
    return 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    return 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }
};

const getTDEEMultiplier = (exerciseFrequency) => {
  // exerciseFrequency: 0-7 days/week
  if (exerciseFrequency === 0) return 1.2;
  if (exerciseFrequency <= 2) return 1.375;
  if (exerciseFrequency <= 5) return 1.55;
  return 1.725;
};

const calculateBMI = (weightKg, heightCm) => {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
};

const calculateCurrentMetrics = (twinState) => {
  const { weight, height, age, gender } = twinState.biometrics;
  const bmr = calculateBMR(gender, weight, height, age);
  const tdee = bmr * getTDEEMultiplier(twinState.lifestyle.exercise);
  const bmi = calculateBMI(weight, height);

  return { bmr, tdee, bmi };
};

const generateProjections = (twinState, currentMetrics) => {
  const { calories } = twinState.lifestyle;
  const { tdee } = currentMetrics;
  let { weight } = twinState.biometrics;

  const dailyDeficit = tdee - calories;
  // 1 kg of fat is ~7700 kcal
  const yearlyWeightChange = (dailyDeficit * 365) / 7700; 

  const projections = [];
  let simulatedWeight = weight;
  
  for (let year = 1; year <= 10; year++) {
    // Diminishing returns on weight loss/gain
    let weightChange = -(yearlyWeightChange * Math.pow(0.9, year - 1)); 
    simulatedWeight = Math.max(30, simulatedWeight + weightChange); 
    
    // Simulate other biomarkers
    const bmi = calculateBMI(simulatedWeight, twinState.biometrics.height);
    const bgBase = 90 + (bmi > 25 ? (bmi - 25) * 2 : 0) - (twinState.lifestyle.exercise * 1.5) + ((twinState.lifestyle.sugarIntake === 'High') ? 10 : 0);
    
    // Extrapolate a mock progression for risks and health score based on bmi
    let healthFactor = (twinState.lifestyle.exercise * 2) - ((bmi > 25) ? (bmi - 25) : 0);
    let mockHealthScore = 100 + healthFactor * year;
    let mockCardio = 50 - healthFactor * year;
    let mockDiabetes = 30 + (bmi > 25 ? (bmi - 25) * year : -year * 2);
    let mockObesity = bmi > 25 ? 60 + (bmi - 25) * year : 20 - year * 2;

    projections.push({
      year,
      weight: parseFloat(simulatedWeight.toFixed(1)),
      bmi: parseFloat(bmi.toFixed(1)),
      bloodGlucose: parseFloat(Math.min(250, bgBase).toFixed(1)),
      healthScore: parseFloat(Math.max(0, Math.min(100, mockHealthScore)).toFixed(1)),
      cardioRisk: parseFloat(Math.max(0, Math.min(100, mockCardio)).toFixed(1)),
      diabetesRisk: parseFloat(Math.max(0, Math.min(100, mockDiabetes)).toFixed(1)),
      obesityRisk: parseFloat(Math.max(0, Math.min(100, Math.max(0, mockObesity))).toFixed(1)),
    });
  }

  return {
    oneYear: projections[0],
    fiveYear: projections[4],
    tenYear: projections[9],
    timeSeries: projections
  };
};

const generateRiskScores = (twinState, currentMetrics, aiRisks) => {
  // Combine mathematical basics with AI output
  const { bmi } = currentMetrics;
  const { smoking, alcohol, sleep, exercise } = twinState.lifestyle;
  
  let heartRisk = aiRisks.cardioRisk;
  let diabetesRisk = aiRisks.diabetesRisk;
  let liverRisk = aiRisks.obesityRisk * 0.8; // Rough proxy
  
  // Apply direct math penalties
  if (smoking === 'Yes' || smoking === true) heartRisk += 25;
  if (alcohol === 'Frequent') liverRisk += 30;
  if (sleep < 6) { heartRisk += 10; diabetesRisk += 5; }
  
  // Cap at 100
  return {
    cardioRisk: Math.min(100, Math.round(heartRisk)),
    diabetesRisk: Math.min(100, Math.round(diabetesRisk)),
    obesityRisk: Math.min(100, Math.round(liverRisk)),
    strokeRisk: Math.min(100, Math.round((heartRisk + diabetesRisk) / 2))
  };
};

const estimateBiologicalAge = (twinState, currentMetrics) => {
  const { age } = twinState.biometrics;
  let bioAge = age;
  
  if (currentMetrics.bmi > 25) bioAge += (currentMetrics.bmi - 25) * 0.5;
  if (twinState.lifestyle.smoking === 'Yes' || twinState.lifestyle.smoking === true) bioAge += 5;
  if (twinState.lifestyle.sleep < 7) bioAge += (7 - twinState.lifestyle.sleep);
  if (twinState.lifestyle.exercise >= 3) bioAge -= 3;
  if (twinState.lifestyle.calories > currentMetrics.tdee + 500) bioAge += 2;
  
  return Math.max(18, Math.round(bioAge));
};

const calculateOrganStress = (risks) => {
  // Low: <30, Medium: 30-70, High: >70
  return {
    heart: risks.heartDisease,
    liver: risks.fattyLiver,
    pancreas: risks.diabetes,
    brain: risks.stroke,
    lungs: risks.heartDisease * 0.8 // Rough proxy 
  };
};

const calculateHealthScore = (biologicalAge, chronologicalAge, risks) => {
  let score = 100;
  const ageDiff = biologicalAge - chronologicalAge;
  
  score -= ageDiff * 2; // Penalty for older bio age
  score -= (risks.heartDisease * 0.3);
  score -= (risks.diabetes * 0.3);
  score -= (risks.fattyLiver * 0.2);
  
  return Math.max(0, Math.min(100, Math.round(score)));
};

module.exports = {
  calculateCurrentMetrics,
  generateProjections,
  generateRiskScores,
  estimateBiologicalAge,
  calculateOrganStress,
  calculateHealthScore
};
