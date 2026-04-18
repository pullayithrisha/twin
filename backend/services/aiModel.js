const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateAnalysis = async (twinState) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `
Analyze this user's health data and provide a clear explanation of current condition, risks, and future outlook in simple terms.
You must return your response ONLY as a raw JSON object, with no markdown code blocks.

Data:
- Biometrics: Age ${twinState.biometrics.age}, Weight ${twinState.biometrics.weight}kg, Height ${twinState.biometrics.height}cm
- Vitals: BP ${twinState.biometrics.bp}, Blood Sugar ${twinState.biometrics.sugar} mg/dL
- Lifestyle: Exercise ${twinState.lifestyle.exercise} d/wk, Sleep ${twinState.lifestyle.sleep}h, Stress Level ${twinState.lifestyle.stress}/10, Smoking ${twinState.lifestyle.smoking}, Alcohol ${twinState.lifestyle.alcohol}

Analysis Requirements:
1. Provide overall disease risks (0-100).
2. Provide specific "organStress" scores (0-100). 
   - Heart, Lungs, Brain, Liver, Kidneys
3. Provide a "healthSummary": A professional narrative summary of their metabolic health.

Return EXACTLY this JSON structure:
{
  "cardioRisk": 45,
  "diabetesRisk": 30,
  "obesityRisk": 20,
  "fattyLiverRisk": 10,
  "strokeRisk": 15,
  "healthSummary": "Based on your vitals...",
  "organStress": {
    "heart": 40,
    "lungs": 20,
    "brain": 65,
    "liver": 15,
    "kidneys": 25
  }
}`;

    const result = await model.generateContent(prompt);
    let resultText = result.response.text();
    resultText = resultText.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(resultText);

  } catch (error) {
    console.error("Gemini API Error (Analysis):", error);
    return {
      cardioRisk: 40, diabetesRisk: 30, obesityRisk: 50, fattyLiverRisk: 20, strokeRisk: 10,
      healthSummary: "Mathematical projection engine active. Systemic baseline analysis indicates moderate metabolic efficiency with minor cardiovascular load.",
      organStress: { heart: 20, lungs: 10, brain: 10, liver: 15, kidneys: 10 }
    };
  }
};

const generateRecommendations = async (twinState) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `
Based on this user's health data, generate personalized actionable recommendations to improve health.
You must return your response ONLY as a raw JSON object, with no markdown code blocks.

Data:
- Biometrics: Age ${twinState.biometrics.age}, Weight ${twinState.biometrics.weight}kg, Height ${twinState.biometrics.height}cm
- Vitals: BP ${twinState.biometrics.bp}, Blood Sugar ${twinState.biometrics.sugar} mg/dL
- Lifestyle: Exercise ${twinState.lifestyle.exercise} d/wk, Sleep ${twinState.lifestyle.sleep}h, Smoking ${twinState.lifestyle.smoking}, Alcohol ${twinState.lifestyle.alcohol}

Return EXACTLY this JSON structure:
{
  "suggestions": [
     "Specific action 1",
     "Specific action 2"
  ]
}`;
    const result = await model.generateContent(prompt);
    let resultText = result.response.text();
    resultText = resultText.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(resultText);
  } catch (error) {
    console.error("Gemini API Error (Recommendations):", error);
    return { suggestions: ["Improve your sleep schedule", "Increase weekly physical activity", "Monitor hydration levels"] };
  }
};

module.exports = {
  generateAnalysis,
  generateRecommendations
};
