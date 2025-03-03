import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Movie } from '../../../models/models';
import { Actor } from '../../../models/models';
import { MovieService } from '../../../services/movie.service';

@Component({
  selector: 'app-actor-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './actor-details.component.html',
  styleUrl: './actor-details.component.css'
})
export class ActorDetailsComponent implements OnInit {
  actor: Actor | null = null;
  notableWorks: Movie[] = [];

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    // Get the actor ID from the route
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    // Fetch actor details
    this.movieService.getActor(id).subscribe({
      next: (actor) => {
        this.actor = actor;
        this.fetchNotableWorks();
      },
      error: (error) => {
        console.error('Error fetching actor details', error);
      }
    });
  }

  fetchNotableWorks(): void {
    if (this.actor && this.actor.notable_works && this.actor.notable_works.length > 0) {
      // Fetch all movies to match notable works
      this.movieService.getMovies().subscribe({
        next: (movies) => {
          // Find movies that match the notable works
            this.notableWorks = movies
            .filter(movie => 
              this.actor?.notable_works?.includes(movie.title)
            )
            .sort((a, b) => a.title.localeCompare(b.title));

        },
        error: (error) => {
          console.error('Error fetching notable works', error);
        }
      });
    }
  }

  // Format height to a more readable format
  formatHeight(heightInCm: number | undefined): string
  {
    if (!heightInCm) return 'N/A';
    
    const feet = Math.floor(heightInCm / 30.48);
    const inches = Math.round((heightInCm / 2.54) % 12);
    
    return `${feet}'${inches}" (${heightInCm} cm)`;
  }

  // Calculate age or years lived
  calculateAge(): string {
    if (!this.actor || !this.actor.birthdate) return 'N/A';
    
    const birthDate = new Date(this.actor.birthdate);
    
    // Check if birthdate is valid
    if (isNaN(birthDate.getTime())) return 'N/A';
    
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return `${age} years old`;
  }
}