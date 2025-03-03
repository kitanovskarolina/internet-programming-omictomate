import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models/movie';

@Component({
  standalone: true,
  selector: 'app-movie-edit',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
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
    oscars: {},
    rating: undefined
  };

  genreString: string = ''; // ✅ Add this property

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMovie();
  }

  loadMovie(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.movieService.getMovieById(id).subscribe((data) => {
      this.movie = data;
      this.genreString = this.movie.genre.join(', '); // ✅ Convert array to string
    });
  }

  updateGenres(): void {
    this.movie.genre = this.genreString.split(',').map(g => g.trim()); // ✅ Convert string to array
  }

  saveMovie(): void {
    this.updateGenres(); // ✅ Ensure genres are updated before saving
    this.movieService.updateMovie(this.movie.id, this.movie).subscribe(() => {
      this.router.navigate(['/movies', this.movie.id]);
    });
  }
}


