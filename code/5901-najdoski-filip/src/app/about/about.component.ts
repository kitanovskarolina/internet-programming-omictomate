import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  studentName = 'Filip Najdoski';
  studentId = '5901';
  currentYear = new Date().getFullYear();
  githubRepositoryUrl = 'https://github.com/fnajdoski/internet-programming-omictomate';

  // Additional information about the project
  projectDetails = [
    {
      title: 'Project Overview',
      description: 'A comprehensive Movie Management System built with Angular, allowing users to view, create, edit, and manage movie information.'
    },
    {
      title: 'Key Features',
      features: [
        'Movie listing with advanced filtering and sorting',
        'Detailed movie and actor information',
        'Create, edit, and delete movies',
        'Statistics dashboard',
        'Responsive design'
      ]
    },
    {
      title: 'Technologies Used',
      technologies: [
        'Angular',
        'TypeScript',
        'RxJS',
        'HTML5',
        'CSS3'
      ]
    }
  ];
}