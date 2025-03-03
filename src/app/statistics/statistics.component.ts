import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../services/movie.service';
import { ActorService } from '../services/actor.service';
import { GenreService } from '../services/genre.service';
import { RouterModule } from '@angular/router'; // ✅ Import this

@Component({
  standalone: true,
  selector: 'app-statistics',
  imports: [CommonModule, RouterModule], // ✅ Add RouterModule here
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  totalMovies: number = 0;
  totalActors: number = 0;
  totalGenres: number = 0;
  totalOscars: number = 0;
  oscarsPerType: { [key: string]: number } = {};
  moviesPerDecade: { [key: string]: number } = {};
  moviesPerGenre: { [key: string]: number } = {};

  constructor(
    private movieService: MovieService,
    private actorService: ActorService,
    private genreService: GenreService
  ) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    this.movieService.getMovies().subscribe(movies => {
      this.totalMovies = movies.length;
      this.calculateMoviesPerDecade(movies);
      this.calculateMoviesPerGenre(movies);
      this.calculateOscars(movies);
    });

    this.actorService.getActors().subscribe(actors => {
      this.totalActors = actors.length;
    });

    this.genreService.getGenres().subscribe(genres => {
      this.totalGenres = genres.length;
    });
  }

  calculateMoviesPerDecade(movies: any[]): void {
    this.moviesPerDecade = {};
    movies.forEach(movie => {
      const decade = Math.floor(movie.year / 10) * 10 + 's';
      this.moviesPerDecade[decade] = (this.moviesPerDecade[decade] || 0) + 1;
    });
  }

  calculateMoviesPerGenre(movies: any[]): void {
    this.moviesPerGenre = {};
    movies.forEach(movie => {
      movie.genre.forEach((genre: string) => {
        this.moviesPerGenre[genre] = (this.moviesPerGenre[genre] || 0) + 1;
      });
    });
  }
  
  getOscarKeys(): string[] {
    return this.oscarsPerType ? Object.keys(this.oscarsPerType) : [];
  }
  
  getDecadeKeys(): string[] {
    return this.moviesPerDecade ? Object.keys(this.moviesPerDecade) : [];
  }
  
  getGenreKeys(): string[] {
    return this.moviesPerGenre ? Object.keys(this.moviesPerGenre) : [];
  }
  
  calculateOscars(movies: any[]): void {
    this.totalOscars = 0;
    this.oscarsPerType = {};
    movies.forEach(movie => {
      if (movie.oscars) {
        Object.keys(movie.oscars).forEach(oscar => {
          this.oscarsPerType[oscar] = (this.oscarsPerType[oscar] || 0) + 1;
          this.totalOscars++;
        });
      }
    });
  }
}
