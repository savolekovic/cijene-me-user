import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

interface UseFilterStateOptions {
  excludeFromUrl?: string[];
  debounceMs?: number;
}

export type FilterValue = string | number | boolean | null | undefined;

export function useFilterState<T extends Record<string, FilterValue>>(
  initialState: T,
  options: UseFilterStateOptions = {}
): [T, (newState: T | ((prev: T) => T)) => void] {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Initialize state directly from URL params
  const [state, setState] = useState<T>(() => {
    const urlState = Object.fromEntries(searchParams.entries());
    
    // Parse URL values
    const parsedState = Object.entries(urlState).reduce<Partial<T>>((acc, [key, value]) => {
      let parsedValue: FilterValue;
      
      if (value === 'true') parsedValue = true;
      else if (value === 'false') parsedValue = false;
      else if (value === 'null') parsedValue = null;
      else if (!isNaN(Number(value))) parsedValue = Number(value);
      else parsedValue = value;

      return {
        ...acc,
        [key]: parsedValue
      };
    }, {});

    // Use URL values first, fall back to initialState for missing values only
    return {
      ...initialState,
      ...parsedState // URL values take precedence
    };
  });

  // Update URL only when state changes intentionally
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      const newParams = new URLSearchParams();
      
      // Preserve all non-null state values in URL
      Object.entries(state).forEach(([key, value]) => {
        if (value != null && value !== '') {
          newParams.set(key, String(value));
        }
      });

      if (process.env.NODE_ENV === 'development') {
        console.log('Updating URL:', {
          currentParams: Object.fromEntries(searchParams.entries()),
          newState: state,
          newParams: Object.fromEntries(newParams.entries())
        });
      }

      setSearchParams(newParams, { replace: true });
    }, options.debounceMs || 0);

    return () => clearTimeout(debounceTimeout);
  }, [state, setSearchParams, options.debounceMs]);

  const setFilterState = useCallback((
    newState: T | ((prev: T) => T)
  ) => {
    setState(prev => {
      const nextState = typeof newState === 'function' 
        ? (newState as (prev: T) => T)(prev)
        : newState;
      return nextState;
    });
  }, []);

  return [state, setFilterState];
} 