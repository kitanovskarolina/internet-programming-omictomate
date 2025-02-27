import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css']
})
export class MovieCreateComponent {
  movie: Movie = { id: 0, title: '', year: 0, director: '', genre: [], plot: '', cast: [], oscars: {}, rating: 0 };

  constructor(private movieService: MovieService, private router: Router) {}

  createMovie() {
    this.movieService.createMovie(this.movie).subscribe(() => {
      this.router.navigate(['/movies']);
    });
  }
}