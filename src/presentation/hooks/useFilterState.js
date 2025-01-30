import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useFilterState(initialState, options = {}) {
  const { 
    excludeFromUrl = [], // Parameters to exclude from URL
    parseValues = true,  // Auto-parse numbers and booleans
    debounceMs = 0      // Debounce URL updates
  } = options;

  const [searchParams, setSearchParams] = useSearchParams();
  
  // Initialize state from URL or defaults
  const getInitialState = () => {
    const state = { ...initialState };
    
    for (const [key, defaultValue] of Object.entries(initialState)) {
      if (excludeFromUrl.includes(key)) continue;
      
      const value = searchParams.get(key);
      if (value === null) continue;

      if (parseValues) {
        if (typeof defaultValue === 'number') {
          state[key] = Number(value);
        } else if (typeof defaultValue === 'boolean') {
          state[key] = value === 'true';
        } else {
          state[key] = value;
        }
      } else {
        state[key] = value;
      }
    }
    
    return state;
  };

  const [state, setState] = useState(getInitialState);

  // Update URL when state changes
  useEffect(() => {
    const params = new URLSearchParams();
    
    Object.entries(state).forEach(([key, value]) => {
      if (
        value !== null && 
        value !== '' && 
        !excludeFromUrl.includes(key)
      ) {
        params.set(key, value.toString());
      }
    });
    
    const timeoutId = setTimeout(() => {
      setSearchParams(params, { replace: true });
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [state, setSearchParams, excludeFromUrl, debounceMs]);

  return [state, setState];
} 