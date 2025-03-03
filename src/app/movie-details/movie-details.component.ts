import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models/movie';

@Component({
  standalone: true,
  selector: 'app-movie-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movie!: Movie;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.loadMovie();
  }

  loadMovie(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.movieService.getMovieById(id).subscribe((data) => {
      this.movie = data;
    });
  }

  hasOscars(movie: Movie): boolean {
    return !!(movie.oscars && Object.keys(movie.oscars).length > 0);
  }
  

  getOscarList(movie: Movie): string[] {
    return movie.oscars ? Object.entries(movie.oscars).map(([key, value]) => `${key}: ${value}`) : [];
  }
}
