# TwinHealth: AI-Powered Physiological Digital Twin

TwinHealth is a next-generation healthcare platform that creates a high-fidelity **Physiological Digital Twin** of a user. By combining real-time biometric inputs with the **Google Gemini 1.5 Flash** AI engine and **Three.js** anatomical visualization, TwinHealth predicts metabolic trajectories and visualizes systemic stress in an immersive 3D environment.

---

## 🚀 Key Features

### 1. Neural Diagnostic Console
A professional-grade 3-tier dashboard designed for medical-grade interaction:
*   **Health Intake:** Compact biometric and lifestyle entry with persistent "Start Simulator" access.
*   **3D Projection Node:** Real-time anatomical model (Male/Female) with dynamic emissive organ stress mapping.
*   **Neural Health Assessment:** Instant, AI-driven narrative summaries generated as you input data.

### 2. Full Twin Simulation
Trigger deep-brain metabolic analysis to receive:
*   **Risk Categorization:** Quantification of Cardiovascular, Diabetes, Obesity, and Stroke risks.
*   **Intelligence Action Plan:** AI-generated, actionable lifestyle modifications unique to your twin's data.
*   **Metabolic Statistics:** Data-driven visualizations of your systemic health state.
*   **Projection Trajectory:** 10-year weight and blood glucose forecasting based on current caloric and physical trends.

### 3. Historical Data Persistence
*   Save and reload simulations from a secure cloud history.
*   Track metabolic changes over time and view previous 3D projections.
*   Export diagnostic reports as professional PDFs.

---

## 🛠️ Technology Stack

### Frontend
- **Framework:** React 18 (Vite)
- **3D Engine:** Three.js / `@react-three/fiber` / `@react-three/drei`
- **Animations:** Framer Motion
- **Styling:** TailwindCSS (Custom "Diagnostic Chamber" Dark Theme)
- **Icons:** Lucide React
- **Charts:** Recharts

### Backend
- **Server:** Node.js / Express
- **Database:** MongoDB (via Mongoose)
- **AI Integration:** Google Generative AI (Gemini 1.5 Flash)

---

## 📂 Project Structure

```text
├── backend/
│   ├── models/          # Mongoose schemas (Report)
│   ├── routes/          # API endpoints (/analyze, /save)
│   ├── services/
│   │   ├── aiModel.js   # Gemini AI prompt engineering & integration
│   │   └── simulator.js # Heuristic metabolic calculation engine
│   └── index.js         # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # Dashboard UI components & 3D models
│   │   ├── pages/       # Main Dashboard view
│   │   ├── utils/       # PDF generators & math helpers
│   │   └── App.jsx      # Router & Global state
```

---

## ⚙️ Setup & Installation

### Prerequisites
*   Node.js (v18+)
*   MongoDB Instance
*   Google Gemini API Key

### Backend Configuration
1. Navigate to `/backend`.
2. Create a `.env` file:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   GEMINI_API_KEY=your_gemini_api_key
   ```
3. Run `npm install` then `npm start`.

### Frontend Configuration
1. Navigate to `/frontend`.
2. Run `npm install` then `npm run dev`.
3. Open `http://localhost:5173`.

---

## 🧠 AI Simulation Logic

The **Neural Engine** uses a dual-layer approach:
1.  **Heuristic Layer (Node.js):** Performs immediate, low-latency mathematical calculations for organ stress mapping as the user types.
2.  **Generative Layer (Gemini 1.5):** Processes 20+ biometric/lifestyle variables through a specialized prompt to return clinical-grade summaries and specific risk percentages.

---

## 📈 Future Roadmap
*   **Wearable Sync:** Direct API integration with Apple Health and Google Fit.
*   **Organ Inspection:** Click-to-inspect functionality for deep-dives into specific biological systems.
*   **Trajectory Modification:** Interactive "What If" sliders to visualize how specific changes (e.g., quitting smoking) instantly alter the 10-year projection.

---

*TwinHealth v5.2 - Built for a high-performance metabolic future.*
