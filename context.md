# Project Context: TwinHealth Digital Twin

## 🎯 Project Vision
TwinHealth is a high-fidelity **AI-Powered Physiological Digital Twin**. It allows users to input their biometric, metabolic, and lifestyle data to generate a 3D anatomical simulation and AI-driven health projections. It aims to bridge the gap between abstract health data and visual, actionable insights.

---

## ✅ Current PRD Implementation (Status: Active)

### 1. AI Analysis & Intelligence (Backend)
- **Neural Diagnostic Engine:** Powered by Google Gemini AI to analyze raw data (Age, BP, Sugar, BMI, Exercise, etc.).
- **Scoring System:** Generates a real-time **Health Efficiency Score** and **Biological Age** projection.
- **Risk Assessment:** Probabilistic mapping of metabolic risks (Cardiovascular, Diabetes, etc.).
- **Predictive Modeling:** 12-month metabolic trajectory calculation for visual graphing.
- **Persistent Memory:** Fully integrated MongoDB backend to save and retrieve past simulation "snapshots".

### 2. 3D Visualization Suite (Frontend)
- **Anatomy Sync:** Dual-model pipeline supporting both **Male** and **Female** anatomical GLB models.
- **Holographic Viewport:** Interactive R3F (React Three Fiber) canvas with orbital navigation (Rotate, Zoom).
- **Auto-Scale Logic:** Mathematical centering and scaling of complex anatomical assets to fit the viewport perfectly.
- **Real-Time Toggling:** Instant switching between anatomical views without simulation reset.

### 3. Premium UI/UX (Design System)
- **Aesthetic:** "Deep Space" Dark Mode using Deep Indigo (#6366f1) and Cyber Cyan accents.
- **Components:** Advanced glassmorphism panels, custom neomorphic inputs, and smooth Framer Motion transitions.
- **Data Viz:** Integrated AreaCharts for metabolic forecasting and Sparkline indicators for vital metrics.
- **Reporting:** Exportable PDF summaries of simulation results.

---

## 🚀 Pending Features (Roadmap)

### Phase 1: Interactive Depth (Mid-Priority)
- [ ] **Organ Interactivity:** Clickable organs in 3D to reveal specific AI insights for that localized area (e.g., click the heart for specific cardio-rhythms).
- [ ] **Dynamic Stress Mapping:** Toggleable "Heatmap" overlay on internal organs based on AI risk scores (Red/Yellow/Green transitions).
- [ ] **Comparative Sliders:** Real-time "What-if" sliders (e.g., "What if I sleep 2 hours more?") with instant 3D/Graph updates.

### Phase 2: Connectivity (High-Priority)
- [ ] **Wearable Sync:** Direct API integration with Apple Health, Fitbit, or Google Fit for automated data intake.
- [ ] **Authentication:** Multi-user support with secure login and private medical history storage.
- [ ] **Live Vitals:** Support for real-time sensor data streaming for live monitoring of the digital twin.

### Phase 3: Medical Specificity (Future)
- [ ] **Anatomical Layers:** Toggleable layers for the Skeletal, Nervous, and Muscular systems.
- [ ] **Disease Simulation:** Specific modules for simulating chronic conditions (e.g., Chronic Kidney Disease progression).
- [ ] **Community Sharing:** Anonymized data benchmarking to compare health efficiency scores with global averages.

---

## 🛠 Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, Three.js, React Three Fiber, Framer Motion, Lucide React, Recharts.
- **Backend:** Node.js, Express, Google Gemini AI (Generative AI), axios.
- **Database:** MongoDB (Atlas).
- **DevOps:** GLTFJSX for 3D model processing.
