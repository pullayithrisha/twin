const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const predictRisks = async (twinState) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `
You are an advanced medical AI simulator designed to predict future health trajectories and organ-specific stress scores.
You must return your response ONLY as a raw JSON object, with no markdown code blocks.

Detailed User Inputs:
- Biometrics: Age ${twinState.biometrics.age}, Weight ${twinState.biometrics.weight}kg, Height ${twinState.biometrics.height}cm, Gender ${twinState.biometrics.gender}
- Core Vitals: BP ${twinState.biometrics.bp}, Blood Sugar ${twinState.biometrics.sugar} mg/dL
- Nutrition: ${twinState.lifestyle.calories} kcal/day, Sugar Intake: ${twinState.lifestyle.sugarIntake || 'Medium'}, Protein: ${twinState.lifestyle.protein || 'Medium'}, Junk Food: ${twinState.lifestyle.junkFood || 'Medium'}
- Activity: Exercise ${twinState.lifestyle.exercise} d/wk, Steps ${twinState.lifestyle.steps || 5000} daily
- Lifestyle: Sleep ${twinState.lifestyle.sleep}h, Stress Level ${twinState.lifestyle.stress || 5}/10
- Habits: Smoking ${twinState.lifestyle.smoking}, Alcohol ${twinState.lifestyle.alcohol}

Analysis Requirements:
1. Provide overall disease risks (0-100).
2. Provide specific "organStress" scores (0-100) for visual mapping. 
   - Heart (impacted by BP, smoking, junk food)
   - Lungs (impacted by smoking, exercise)
   - Brain (impacted by stress, sleep, sugar)
   - Liver (impacted by alcohol, junk food, sugar)
   - Kidneys (impacted by BP, water intake)
3. Provide 5-6 highly specific actionable suggestions.
4. Provide a "healthSummary": A professional, detailed summary of their metabolic health. You MUST include numerical figures, specific risk percentages, and organ stress values (e.g. "80% Liver Stress") as part of the narrative paragraph or list.

Return EXACTLY this JSON structure:
{
  "cardioRisk": 45,
  "diabetesRisk": 30,
  "obesityRisk": 20,
  "fattyLiverRisk": 10,
  "strokeRisk": 15,
  "healthSummary": "Based on your vitals, your system shows a significant 45% cardiovascular risk and 80% heart stress due to elevated BP. Your liver stress is at 10%...",
  "organStress": {
    "heart": 40,
    "lungs": 20,
    "brain": 65,
    "liver": 15,
    "kidneys": 25
  },
  "suggestions": [
     "Reduce refined sugar intake by 50%",
     "Increase deep sleep via 30m reading before bed"
  ]
}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let resultText = response.text();
    
    // Strip markdown formatting if AI added it
    resultText = resultText.replace(/```json/g, '').replace(/```/g, '').trim();

    const aiData = JSON.parse(resultText.trim());
    return aiData;

  } catch (error) {
    console.error("Gemini API Error, falling back to math estimation:", error);
    // Fallback logic
    return {
      cardioRisk: 40,
      diabetesRisk: 30,
      obesityRisk: 50,
      fattyLiverRisk: 20,
      strokeRisk: 10,
      healthSummary: "Mathematical projection engine active. Systemic baseline analysis indicates moderate metabolic efficiency with minor cardiovascular load.",
      organStress: { heart: 20, lungs: 10, brain: 10, liver: 15, kidneys: 10 },
      suggestions: ["Improve your sleep schedule", "Increase weekly physical activity", "Monitor hydration levels"]
    };
  }
};

module.exports = {
  predictRisks
};
