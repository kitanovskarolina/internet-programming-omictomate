import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MovieService } from '../../../services/movie.service';
import { Actor, Movie } from '../../../models/models';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit {
  movie: Movie | null = null;
  similarMovies: Movie[] = [];
  actorDetails: { [key: string]: Actor } = {};
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    // Get the movie ID from the route
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    if (isNaN(id)) {
      this.error = 'Invalid movie ID';
      this.loading = false;
      return;
    }

    // Fetch movie details
    this.movieService.getMovie(id).subscribe({
      next: (movie) => {
        this.movie = movie;
        this.loading = false;

        // Fetch similar movies by genre
        if (movie.genre && movie.genre.length > 0) {
          this.fetchSimilarMovies(movie.genre);
        }
        
        // Fetch actor details
        if (movie.cast && movie.cast.length > 0) {
          this.fetchActorDetails(movie.cast);
        }
      },
      error: (error) => {
        console.error('Error fetching movie details', error);
        this.error = 'Failed to load movie details';
        this.loading = false;
      }
    });
  }

  fetchSimilarMovies(genres: string[]): void {
    this.movieService.getMovies().subscribe({
      next: (movies) => {
        // Find movies with at least one matching genre, excluding the current movie
        this.similarMovies = movies
          .filter(m =>
            m.genre?.some(genre => genres.includes(genre)) &&
            m.id !== this.movie?.id
          )
          .sort((a, b) => a.title.localeCompare(b.title))
          .slice(0, 5); // Limit to 5 similar movies
      }
    });
  }

  fetchActorDetails(cast: { actor: string, character: string }[]): void {
    // Get all actors first
    this.movieService.getActors().subscribe({
      next: (actors) => {
        // Process each cast member
        cast.forEach(member => {
          // Try to find the actor in the actors list
          const foundActor = actors.find(a => a.name.toLowerCase() === member.actor.toLowerCase());
          
          if (foundActor) {
            // If found, use the actor's details
            this.actorDetails[member.actor] = foundActor;
          } else {
            // If not found, create a placeholder with id = 0
            this.actorDetails[member.actor] = {
              id: 0,
              name: member.actor,
              birthdate: 'N/A',
              height: 0,
              nationality: 'N/A',
              notable_works: []
            };
          }
        });
      },
      error: (error) => {
        console.error('Error fetching actors:', error);
        // Handle the error by setting placeholder data for all cast members
        cast.forEach(member => {
          this.actorDetails[member.actor] = {
            id: 0,
            name: member.actor,
            birthdate: 'N/A',
            height: 0,
            nationality: 'N/A',
            notable_works: []
          };
        });
      }
    });
  }

  // Utility method to format oscar names
  formatOscarName(oscarKey: string): string {
    // Convert camelCase to Title Case and add spaces
    return oscarKey
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  }

  // Method to get oscar keys safely
  getOscarKeys(): string[] {
    return this.movie?.oscars ? Object.keys(this.movie.oscars) : [];
  }

  // Delete movie method
  deleteMovie(): void {
    if (this.movie && this.movie.id && confirm('Are you sure you want to delete this movie?')) {
      this.movieService.deleteMovie(this.movie.id).subscribe({
        next: () => {
          // Navigate back to movie list
          this.router.navigate(['/movies']);
        },
        error: (error) => {
          console.error('Error deleting movie', error);
          alert('Failed to delete movie');
        }
      });
    }
  }

  // Safe method to sort cast
  sortedCast() {
    return this.movie?.cast 
      ? [...this.movie.cast].sort((a, b) => a.actor.localeCompare(b.actor)) 
      : [];
  }
}