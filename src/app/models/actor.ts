export interface Actor {
    id: number;
    name: string;
    birthdate?: string; // Optional in "Month DD, YYYY" format
    height?: number; // Optional height in cm
    nationality?: string; // Optional nationality
    notable_works?: string[]; // Optional list of movie titles
  }
  
