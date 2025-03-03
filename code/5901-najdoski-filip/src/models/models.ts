// models.ts - Place this in a shared/models folder

export interface Cast {
    actor: string;
    character: string;
  }
  
  export interface Movie {
    id: number;
    title: string;
    year?: number;
    director?: string;
    genre?: string[];
    plot?: string;
    cast?: Cast[];
    oscars?: Record<string, string>;
    rating?: number;
  }
  
  export interface Genre {
    id: string;
    name: string;
  }
  
  export interface Actor {
    id?: number;
    name: string;
    birthdate?: string;
    height?: number;
    nationality?: string;
    notable_works?: string[];
  }