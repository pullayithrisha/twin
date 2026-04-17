import { create } from 'zustand';
import axios from 'axios';

const useTwinStore = create((set, get) => ({
  biometrics: {
    age: 35,
    gender: 'Male',
    height: 175,
    weight: 80,
    bp: '120/80',
  },
  lifestyle: {
    calories: 2500,
    carbs: 50,
    protein: 20,
    fat: 30,
    sleep: 7,
    exercise: 3,
    steps: 8000,
    smoking: 'No',
    alcohol: 'None',
    water: 2,
    stress: 3,
  },
  conditions: [],
  predictions: null,
  loading: false,

  setBiometrics: (newData) => set((state) => ({ 
    biometrics: { ...state.biometrics, ...newData } 
  })),

  setLifestyle: (newData) => set((state) => ({ 
    lifestyle: { ...state.lifestyle, ...newData } 
  })),

  setConditions: (conditions) => set({ conditions }),

  fetchPredictions: async () => {
    set({ loading: true });
    try {
      const state = get();
      const response = await axios.post('http://localhost:5000/api/predict', {
        biometrics: state.biometrics,
        lifestyle: state.lifestyle,
        conditions: state.conditions
      });
      set({ predictions: response.data, loading: false });
    } catch (error) {
      console.error('Failed to fetch predictions:', error);
      set({ loading: false });
    }
  }
}));

export default useTwinStore;
