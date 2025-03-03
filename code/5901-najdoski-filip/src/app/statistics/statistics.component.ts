import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { Actor, Movie } from '../../models/models';

interface StatItem {
  label: string;
  value: number | string;
}

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit {
  movies: Movie[] = [];
  actors: Actor[] = [];
  
  // Statistics objects
  generalStats: StatItem[] = [];
  oscarStats: StatItem[] = [];
  genreStats: StatItem[] = [];
  decadeStats: StatItem[] = [];
  
  // Incomplete data tracking
  incompleteMovies: Movie[] = [];
  incompleteActors: Actor[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    // Fetch all movies and actors
    this.loadData();
  }

  loadData(): void {
    // Parallel data fetching
    Promise.all([
      this.movieService.getMovies().toPromise(),
      this.movieService.getActors().toPromise()
    ]).then(([movies, actors]) => {
      this.movies = movies || [];
      this.actors = actors || [];
      
      this.calculateStatistics();
    }).catch(error => {
      console.error('Error fetching data', error);
    });
  }

  calculateStatistics(): void {
    // General Statistics
    this.generalStats = [
      { label: 'Total Movies', value: this.movies.length },
      { label: 'Total Actors', value: this.actors.length },
      { label: 'Total Genres', value: this.calculateTotalGenres() },
      { label: 'Total Oscars', value: this.calculateTotalOscars() }
    ];

    // Oscar Statistics
    this.oscarStats = this.calculateOscarsByType();

    // Genre Statistics
    this.genreStats = this.calculateOscarsByGenre();

    // Decade Statistics
    this.decadeStats = this.calculateMoviesByDecade();

    // Incomplete Data
    this.incompleteMovies = this.movies.filter(this.isMovieIncomplete);
    this.incompleteActors = this.actors.filter(this.isActorIncomplete);
  }

  calculateTotalGenres(): number {
    const uniqueGenres = new Set<string>();
    this.movies.forEach(movie => 
      movie.genre?.forEach(genre => uniqueGenres.add(genre))
    );
    return uniqueGenres.size;
  }

  calculateTotalOscars(): number {
    return this.movies.reduce((total, movie) => 
      total + (movie.oscars ? Object.keys(movie.oscars).length : 0), 0
    );
  }

  calculateOscarsByType(): StatItem[] {
    const oscarTypes: { [key: string]: number } = {};
    
    this.movies.forEach(movie => {
      if (movie.oscars) {
        Object.keys(movie.oscars).forEach(oscarType => {
          const formattedType = this.formatOscarType(oscarType);
          oscarTypes[formattedType] = (oscarTypes[formattedType] || 0) + 1;
        });
      }
    });

    return Object.entries(oscarTypes)
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value);
  }

  calculateOscarsByGenre(): StatItem[] {
    const genreOscars: { [key: string]: number } = {};
    
    this.movies.forEach(movie => {
      if (movie.oscars) {
        const oscarCount = Object.keys(movie.oscars).length;
        movie.genre?.forEach(genre => {
          genreOscars[genre] = (genreOscars[genre] || 0) + oscarCount;
        });
      }
    });

    return Object.entries(genreOscars)
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value);
  }

  calculateMoviesByDecade(): StatItem[] {
    const decadeMovies: { [key: string]: number } = {};
    
    this.movies.forEach(movie => {
      

      if(movie.year){
        const decade = `${Math.floor(movie.year / 10) * 10}s`;
         decadeMovies[decade] = (decadeMovies[decade] || 0) + 1;
      }
    });
  
    return Object.entries(decadeMovies)
      .map(([label, value]) => ({ label, value }))
      .sort((a: StatItem, b: StatItem) => {
        // Extract numeric decade value from label
        const decadeA = parseInt(a.label.replace('s', ''), 10);
        const decadeB = parseInt(b.label.replace('s', ''), 10);
        return decadeB - decadeA;
      });
  }

  // Helper methods to check for incomplete data
  isMovieIncomplete(movie: Movie): boolean {
    // Use type assertion and optional chaining
    return !movie.title || 
           !movie.year || 
           !movie.director || 
           (typeof movie.title === 'string' && movie.title.trim() === '') ||
           (typeof movie.director === 'string' && movie.director.trim() === '');
  }

  isActorIncomplete(actor: Actor): boolean {
    // Use type assertion and optional chaining
    return !actor.name || 
           !actor.birthdate || 
           !actor.nationality || 
           (typeof actor.name === 'string' && actor.name.trim() === '') ||
           (typeof actor.birthdate === 'string' && actor.birthdate.trim() === '') ||
           (typeof actor.nationality === 'string' && actor.nationality.trim() === '');
  }

  // Utility method to format oscar type
  formatOscarType(type: string): string {
    return type
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  }
}