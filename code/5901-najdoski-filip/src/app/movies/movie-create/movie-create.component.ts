import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Genre, Movie } from '../../../models/models';
import { MovieService } from '../../../services/movie.service';

@Component({
  selector: 'app-movie-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './movie-create.component.html',
  styleUrl: './movie-create.component.css'
})
export class MovieCreateComponent implements OnInit {
  currentYear = new Date().getFullYear();
  
  movie: Movie = {
    id: 0,
    title: '',
    year: new Date().getFullYear(),
    director: '',
    genre: [],
    plot: '',
    cast: [],
    rating: undefined
  };

  genres: Genre[] = [];
  selectedGenres: string[] = [];
  oscars: { type: string, recipient: string }[] = [];

  constructor(
    private router: Router,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    // Fetch genres
    this.movieService.getGenres().subscribe({
      next: (genres) => {
        this.genres = genres;
      },
      error: (error) => {
        console.error('Error fetching genres', error);
      }
    });

    // Get all movies to determine the next ID
    this.movieService.getMovies().subscribe({
      next: (movies) => {
        // Find the highest ID
        const maxId = movies.reduce((max, movie) => Math.max(max, movie.id), 0);
        // Set the next sequential ID
        this.movie.id = maxId + 1;
      },
      error: (error) => {
        console.error('Error fetching movies for ID', error);
      }
    });
  }

  // Genre selection methods
  toggleGenre(genre: string): void {
    const index = this.selectedGenres.indexOf(genre);
    if (index > -1) {
      this.selectedGenres.splice(index, 1);
    } else {
      this.selectedGenres.push(genre);
    }
    this.movie.genre = this.selectedGenres;
  }

  // Oscar methods
  addOscar(): void {
    this.oscars.push({ type: '', recipient: '' });
  }

  removeOscar(index: number): void {
    this.oscars.splice(index, 1);
  }

  // Form submission
  onSubmit(form: NgForm): void {
    if (form.valid) {
      // Convert oscars array to object
      const oscarsObject: { [key: string]: string } = {};
      this.oscars.forEach(oscar => {
        if (oscar.type && oscar.recipient) {
          oscarsObject[oscar.type] = oscar.recipient;
        }
      });

      // Add oscars to movie if any exist
      if (Object.keys(oscarsObject).length > 0) {
        this.movie.oscars = oscarsObject;
      }

      // Create the movie
      this.movieService.createMovie(this.movie).subscribe({
        next: (createdMovie) => {
          // Navigate to the newly created movie's details page
          this.router.navigate(['/movies', createdMovie.id]);
        },
        error: (error) => {
          console.error('Error creating movie', error);
        }
      });
    }
  }

  // Utility method to format oscar type for display
  formatOscarType(type: string): string {
    return type
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  }
}