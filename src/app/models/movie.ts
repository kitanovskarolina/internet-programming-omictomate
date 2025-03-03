export interface Movie {
    id: number;
    title: string;
    year: number;
    director: string;
    genre: string[]; // Array of genres
    plot?: string; // Optional plot description
    cast: { actor: string; character: string }[]; // Array of actors and their roles
    oscars?: Record<string, string>; // Optional, keys are oscar types, values are recipients
    rating?: number; // Optional rating
  }
  