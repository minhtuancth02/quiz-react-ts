import React from 'react'

// random question
export const shuffleArray = (array: any[]): any[] => [...array].sort(() => Math.random()-0.5);

export function getRandomQ(max: number): number {
  return Math.floor(Math.random() * max);
}