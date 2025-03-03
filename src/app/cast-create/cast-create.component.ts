import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models/movie';

@Component({
  standalone: true,
  selector: 'app-cast-create',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cast-create.component.html',
  styleUrls: ['./cast-create.component.css']
})
export class CastCreateComponent implements OnInit {
  movie!: Movie;
  actorName: string = '';
  characterName: string = '';

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
    });
  }

  addCastMember(): void {
    if (this.actorName.trim() && this.characterName.trim()) {
      this.movie.cast.push({ actor: this.actorName, character: this.characterName });
      this.movieService.updateMovie(this.movie.id, this.movie).subscribe(() => {
        this.router.navigate(['/movies', this.movie.id]);
      });
    }
  }
}
