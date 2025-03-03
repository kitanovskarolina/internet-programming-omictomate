import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-about',
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  currentYear: number = new Date().getFullYear();
  studentName: string = 'Karolina Kitanovska';
  studentId: number = 5491;
  githubRepo: string = 'https://github.com/kitanovskarolina/internet-programming-omictomate'; // Replace with actual GitHub link
}
