import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Actor, Genre, Movie } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Movies endpoints
  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/movies`);
  }

  getMovie(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/movies/${id}`);
  }

  createMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.apiUrl}/movies`, movie);
  }

  updateMovie(id: number, movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${this.apiUrl}/movies/${id}`, movie);
  }

  deleteMovie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/movies/${id}`);
  }

  // Genres endpoints
  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${this.apiUrl}/genres`);
  }

  // Actors endpoints
  getActors(): Observable<Actor[]> {
    return this.http.get<Actor[]>(`${this.apiUrl}/actors`);
  }

  getActor(id: number): Observable<Actor> {
    return this.http.get<Actor>(`${this.apiUrl}/actors/${id}`);
  }

  getActorByName(name: string): Observable<Actor> {
    return this.http.get<Actor>(`${this.apiUrl}/actors?name=${encodeURIComponent(name)}`);
  }
}