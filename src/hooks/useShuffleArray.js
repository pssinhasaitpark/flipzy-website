// src/hooks/useShuffleArray.js
import { useMemo } from 'react';

export const useShuffleArray = (array) => {
  return useMemo(() => {
    if (!array || array.length === 0) return [];

    const randomStart = Math.floor(Math.random() * array.length);
    return [...array.slice(randomStart), ...array.slice(0, randomStart)];
  }, [array]);
};
