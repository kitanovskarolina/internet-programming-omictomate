import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cast-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cast-add.component.html',
  styleUrls: ['./cast-add.component.css']
})
export class CastAddComponent {
  actorName: string = '';
  characterName: string = '';

  constructor(private movieService: MovieService, private router: Router) {}

  addCastMember() {
    // Logic to add cast member to a movie
    this.router.navigate(['/movies']);
  }
}