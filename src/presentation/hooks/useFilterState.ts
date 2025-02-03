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
  const [state, setState] = useState<T>(() => {
    // Initialize from URL params
    const urlState = Object.fromEntries(searchParams.entries());
    const parsedState = Object.entries(urlState).reduce<Partial<T>>((acc, [key, value]) => {
      if (options.excludeFromUrl?.includes(key)) return acc;

      // Parse values
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

    return {
      ...initialState,
      ...parsedState
    };
  });

  // Update URL when state changes
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      const newParams = new URLSearchParams();
      Object.entries(state).forEach(([key, value]) => {
        if (options.excludeFromUrl?.includes(key)) return;
        if (value != null && value !== '') {
          newParams.set(key, String(value));
        }
      });
      setSearchParams(newParams, { replace: true });
    }, options.debounceMs || 0);

    return () => clearTimeout(debounceTimeout);
  }, [state, setSearchParams, options.excludeFromUrl, options.debounceMs]);

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