import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActorService } from '../services/actor.service';
import { Actor } from '../models/actor';

@Component({
  standalone: true,
  selector: 'app-actor-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './actor-details.component.html',
  styleUrls: ['./actor-details.component.css']
})
export class ActorDetailsComponent implements OnInit {
  actor: Actor | null = null; // ✅ Initialize as null

  constructor(
    private route: ActivatedRoute,
    private actorService: ActorService
  ) {}

  ngOnInit(): void {
    this.loadActor();
  }

  loadActor(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.actorService.getActorById(id).subscribe((data) => {
      this.actor = data;
    });
  }
}

