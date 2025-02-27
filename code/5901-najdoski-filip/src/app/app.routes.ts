import { Routes } from '@angular/router';
import { MovieListComponent } from './movies/movie-list/movie-list.component';
import { MovieDetailsComponent } from './movies/movie-details/movie-details.component';
import { MovieEditComponent } from './movies/movie-edit/movie-edit.component';
import { MovieCreateComponent } from './movies/movie-create/movie-create.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ActorDetailsComponent } from './actors/actor-details/actor-details.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  { path: 'movies', component: MovieListComponent },
  { path: 'movies/create', component: MovieCreateComponent },
  { path: 'movies/:id', component: MovieDetailsComponent },
  { path: 'movies/:id/edit', component: MovieEditComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'actor/:id', component: ActorDetailsComponent }
];