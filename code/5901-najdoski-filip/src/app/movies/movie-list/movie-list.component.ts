import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Genre, Movie } from '../../../models/models';
import { MovieService } from '../../../services/movie.service';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  genres: Genre[] = [];
  
  // Filtering properties
  titleFilter: string = '';
  yearFilter: number | null = null;
  genreFilter: string | null = null;
  ratingFilter: number | null = null;
  
  // Sorting properties
  currentSortColumn: string | null = null;
  isSortAscending: boolean = true;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
    this.loadGenres();
  }

  loadMovies(): void {
    this.movieService.getMovies().subscribe({
      next: (movies) => {
        this.movies = movies || [];
      },
      error: (error) => {
        console.error('Error fetching movies', error);
      }
    });
  }

  loadGenres(): void {
    this.movieService.getGenres().subscribe({
      next: (genres) => {
        this.genres = genres || [];
      },
      error: (error) => {
        console.error('Error fetching genres', error);
      }
    });
  }

  deleteMovie(id?: number): void {
    if (id !== undefined && confirm('Are you sure you want to delete this movie?')) {
      this.movieService.deleteMovie(id).subscribe({
        next: () => {
          this.movies = this.movies.filter(movie => movie.id !== id);
        },
        error: (error) => {
          console.error('Error deleting movie', error);
        }
      });
    }
  }

  // Filtering methods
  applyFilters(): Movie[] {
    return this.movies.filter(movie => {
      const matchesTitle = !this.titleFilter || 
        movie.title.toLowerCase().includes(this.titleFilter.toLowerCase());
      
      const matchesYear = !this.yearFilter || 
        movie.year === this.yearFilter;
      
      const matchesGenre = !this.genreFilter || 
        movie.genre?.includes(this.genreFilter);
      
      const matchesRating = !this.ratingFilter || 
        (movie.rating || 0) >= this.ratingFilter;

      return matchesTitle && matchesYear && matchesGenre && matchesRating;
    });
  }

  // Sorting methods
  sortMovies(column: string): void {
    if (this.currentSortColumn === column) {
      this.isSortAscending = !this.isSortAscending;
    } else {
      this.currentSortColumn = column;
      this.isSortAscending = true;
    }

    this.movies.sort((a: any, b: any) => {
      let valueA = a[column];
      let valueB = b[column];

      // Special handling for genres
      if (column === 'genre') {
        valueA = a.genre?.length || 0;
        valueB = b.genre?.length || 0;
      }

      if (valueA == null) valueA = '';
      if (valueB == null) valueB = '';

      const comparison = 
        valueA.toString().localeCompare(valueB.toString(), undefined, { numeric: true });

      return this.isSortAscending ? comparison : -comparison;
    });
  }

  // Utility method to count oscars
  countOscars(movie: Movie): number {
    return movie.oscars ? Object.keys(movie.oscars).length : 0;
  }

  // Utility method to format genres
  formatGenres(genres?: string[]): string {
    return genres?.join(' / ') || '';
  }
}