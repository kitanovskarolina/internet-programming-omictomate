import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models/movie';

@Component({
  standalone: true,
  selector: 'app-movie-create',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css']
})
export class MovieCreateComponent {
  movie: Movie = {
    id: 0,
    title: '',
    year: new Date().getFullYear(),
    director: '',
    genre: [],
    plot: '',
    cast: [],
    oscars: {},
    rating: undefined
  };

  genreString: string = ''; // Store genre input as a string

  constructor(private movieService: MovieService, private router: Router) {}

  createMovie(): void {
    this.movie.genre = this.genreString.split(',').map(g => g.trim()); // Convert genre string to array
    this.movieService.createMovie(this.movie).subscribe(() => {
      this.router.navigate(['/movies']); // Redirect to movie list after creation
    });
  }
}

