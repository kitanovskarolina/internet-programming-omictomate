export interface Movie {
  id: number;
  title: string;
  year: number;
  director: string;
  genre: string[];
  plot: string;
  cast: { actor: string; character: string }[];
  oscars: Record<string, string>;
  rating: number;
}
