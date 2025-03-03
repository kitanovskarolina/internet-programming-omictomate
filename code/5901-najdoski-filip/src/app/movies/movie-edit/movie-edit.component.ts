import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Genre, Movie } from '../../../models/models';
import { MovieService } from '../../../services/movie.service';

@Component({
  selector: 'app-movie-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './movie-edit.component.html',
  styleUrl: './movie-edit.component.css'
})
export class MovieEditComponent implements OnInit {
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
  currentYear = new Date().getFullYear();
  constructor(
    private route: ActivatedRoute,
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

    // Get the movie ID from the route
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    if (id) {
      // Fetch movie details
      this.movieService.getMovie(id).subscribe({
        next: (movie) => {
          this.movie = {...movie};
          // Populate selected genres
          this.selectedGenres = [...(this.movie.genre ?? [])];
          // Populate oscars
          if (this.movie.oscars) {
            this.oscars = Object.entries(this.movie.oscars).map(([type, recipient]) => ({
              type,
              recipient
            }));
          }
        },
        error: (error) => {
          console.error('Error fetching movie details', error);
        }
      });
    }
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

      // Update movie object with oscars
      this.movie.oscars = oscarsObject;

      // Update the movie
      if (this.movie.id) {
        this.movieService.updateMovie(this.movie.id, this.movie).subscribe({
          next: () => {
            // Navigate to movie details page
            this.router.navigate(['/movies', this.movie.id]);
          },
          error: (error) => {
            console.error('Error updating movie', error);
          }
        });
      }
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