# Technical Documentation: TwinHealth Digital Twin System

**Version:** 5.4.0  
**Domain:** Computational Physiology & Predictive AI  
**Theme:** Neural Diagnostic Chamber  

---

## 1. Executive Summary
TwinHealth is a high-fidelity Physiological Digital Twin platform designed to bridge the gap between abstract health data and visceral physiological understanding. By integrating **Real-time 3D Rendering (Three.js)** with **Large Language Models (Gemini 1.5 Flash)**, the system provides a predictive, visual, and narrative simulation of human health based on metabolic, lifestyle, and biometric factors.

---

## 2. System Architecture

The system operates on a decoupled **MERN-AI Architecture**:

### 2.1 Component Breakdown
| Layer | Technology | Primary Function |
| :--- | :--- | :--- |
| **Frontend UI** | React 18 / Vite | State-driven UI for diagnostic intake and results orchestration. |
| **3D Rendering** | Three.js / R3F | High-performance anatomical visualization and stress mapping. |
| **Backend API** | Node.js / Express | Logic orchestration and database persistence. |
| **AI Layer** | Gemini 1.5 Flash | Generative synthesis of diagnostic data into narrative reports. |
| **Database** | MongoDB | Archiving historical simulations and user biometrics. |

### 2.2 Data Flow Pipeline
1.  **Ingestion:** User inputs 20+ variables (Biometrics, Nutrition, Lifestyle).
2.  **Heuristic Evaluation:** Frontend instantly calculates localized stress scores for 3D emissive mapping.
3.  **Deep Simulation:** Backend processes the "Digital Twin State" through a mathematical projection engine.
4.  **AI Synthesis:** Gemini 1.5 analyzes the state against medical heuristics to generate a 10-year outlook and action plan.
5.  **Visualization:** The UI renders dual stats: Numerical (Charts) and Spatial (3D Model).

---

## 3. Simulation Methodology

### 3.1 Anatomical Stress Mapping
The 3D anatomical model (Male/Female) utilizes **Draco-compressed GLB** assets to maintain high visual fidelity beneath the GitHub and free-tier hosting limits. 

**Stress Color Spectrum:**
*   **Optimal Health (<25% Stress):** Base anatomical texture (Translucent Blue).
*   **Warning State (25% - 60% Stress):** Pulsing Muted Gold (`0x999900`). Indicates physiological strain.
*   **Critical State (>60% Stress):** High-intensity Neon Yellow (`0xffff00`). Indicates systemic disruption or potential long-term damage.

### 3.2 Predictive Trajectory Engine
The system uses a linear-recursive model to forecast weight and blood glucose levels over a 10-year horizon, adjusting for `caloric intake`, `exercise frequency`, and `metabolic baseline (age/gender)`.

---

## 4. AI Engine Integration

### 4.1 Prompt Engineering
The system utilizes a specialized "Clinical Persona" prompt for the Google Gemini 1.5 Flash model. The prompt converts raw biometric arrays into:
*   **Narrative Summaries:** Interpreting relationships between factors (e.g., how high stress amplifies the impact of sodium).
*   **Risk Quantification:** Precise percentage estimates for Cardiovascular, Diabetes, and Neurological risks.
*   **Actionable Intelligence:** Context-aware lifestyle modifications.

---

## 5. Deployment & Optimization

### 5.1 3D Asset Management
To ensure a "deployment-ready" footprint, all anatomical models are processed via `gltf-pipeline` for Draco mesh compression. This reduces the raw 200MB assets to ~12MB, enabling sub-2-second load times on production CDNs.

### 5.2 Environment Configuration
The platform is designed for **Zero-Cost Deployment**:
*   **Backend:** Render (Web Service)
*   **Frontend:** Vercel (Static Hosting)
*   **Scalability:** Uses `API_BASE_URL` env-swapping to switch between local development and production endpoints automatically.

---

## 6. Security & Privacy
*   **CORS Protection:** Restricted server-side cross-origin resource sharing.
*   **Data Masking:** Only essential non-PII (Personally Identifiable Information) is passed to the AI Layer for simulation.
*   **Environment Isolation:** Private keys are managed via production secret managers and never committed to version control.

---

## 7. Future Roadmap
*   **Vitals Sync:** Integration with HealthKit-to-JSON pipelines for real-time wearable telemetry.
*   **Cellular Inspect:** Deep-zoom capabilities into organ sub-systems (e.g., coronary artery 3D inspections).
*   **Social Impact Twin:** Visualizing the collective health metrics of a community as a single "Collective Twin."

---
*Documentation Generated on 2026-04-18 for TwinHealth v5.4.0*
