import { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

interface UseFilterStateOptions {
  excludeFromUrl?: string[];
  debounceMs?: number;
}

export type FilterValue = string | number | boolean | null | undefined;

// Extract parsing logic to a pure function
const parseUrlState = <T extends Record<string, FilterValue>>(
  urlParams: URLSearchParams
): Partial<T> => {
  const urlState = Object.fromEntries(urlParams.entries());
  return Object.entries(urlState).reduce<Partial<T>>((acc, [key, value]) => {
    let parsedValue: FilterValue;
    
    if (value === 'true') parsedValue = true;
    else if (value === 'false') parsedValue = false;
    else if (value === 'null') parsedValue = null;
    else if (!isNaN(Number(value))) parsedValue = Number(value);
    else parsedValue = value;

    return { ...acc, [key]: parsedValue };
  }, {});
};

export function useFilterState<T extends Record<string, FilterValue>>(
  initialState: T,
  options: UseFilterStateOptions = {}
): [T, (newState: T | ((prev: T) => T)) => void] {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isUrlUpdate = useRef(false);
  const debounceTimer = useRef<NodeJS.Timeout>();
  const lastUrl = useRef(searchParams.toString());
  
  // Initialize state from URL params
  const [state, setState] = useState<T>(() => ({
    ...initialState,
    ...parseUrlState<T>(searchParams)
  }));

  // Cleanup debounce timer
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  // Update URL when state changes
  useEffect(() => {
    if (isUrlUpdate.current) {
      isUrlUpdate.current = false;
      return;
    }

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      const newParams = new URLSearchParams();
      
      Object.entries(state).forEach(([key, value]) => {
        if (value != null && value !== '' && !options.excludeFromUrl?.includes(key)) {
          newParams.set(key, String(value));
        }
      });

      const newSearch = newParams.toString();
      if (newSearch !== lastUrl.current) {
        lastUrl.current = newSearch;
        navigate(`?${newSearch}`, { replace: false });
      }
    }, options.debounceMs || 0);
  }, [state, navigate, options.debounceMs, options.excludeFromUrl]);

  // Listen for URL changes
  useEffect(() => {
    const currentUrl = searchParams.toString();
    if (currentUrl === lastUrl.current) {
      return;
    }

    lastUrl.current = currentUrl;
    isUrlUpdate.current = true;
    setState({
      ...initialState,
      ...parseUrlState<T>(searchParams)
    });
  }, [searchParams, initialState]);

  const setFilterState = useCallback((newState: T | ((prev: T) => T)) => {
    setState(prev => {
      const nextState = typeof newState === 'function' 
        ? (newState as (prev: T) => T)(prev)
        : newState;
      return nextState;
    });
  }, []);

  return [state, setFilterState];
} 