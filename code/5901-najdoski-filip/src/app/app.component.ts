import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { delay, Observable } from 'rxjs';

interface NavRoute {
  linkName: string;
  url: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  welcomeMessage = 'Welcome to the Movie Management System!';
  statusMessage = 'Checking data connection...';

  routes: NavRoute[] = [
    { linkName: 'Movies', url: '/movies' },
    { linkName: 'Statistics', url: '/statistics' },
    { linkName: 'About', url: '/about' }
  ];

  private dataTest: Observable<any>;

  constructor(private http: HttpClient) { 
    this.dataTest = this.http.get('http://localhost:3000', {responseType: "text"})
      .pipe(delay(1000), takeUntilDestroyed());
  }

  ngOnInit() {
    this.dataTest.subscribe({
      next: () => {
        this.statusMessage = 'Data connection is working!';
      },
      error: (error) => {
        this.statusMessage = `Data connection failed! ${error.message}`;
        console.error(error);
      }
    });
  }
}