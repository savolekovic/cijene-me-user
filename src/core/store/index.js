import { create } from 'zustand';

const useStore = create((set) => ({
  preferences: {
    theme: 'light',
    currency: 'EUR',
  },
  setPreference: (key, value) => 
    set((state) => ({
      preferences: { ...state.preferences, [key]: value }
    }))
})); 