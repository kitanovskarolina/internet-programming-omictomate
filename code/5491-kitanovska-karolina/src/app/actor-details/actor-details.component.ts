import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { ActorService } from '../../services/actor.service';
// import { Actor } from '../models/actor.model';
import { CommonModule } from '@angular/common';
import { ActorService } from 'src/app/services/actor.service';
import { Actor } from '../../models/actor';

@Component({
  selector: 'app-actor-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './actor-details.component.html',
  styleUrls: ['./actor-details.component.css']
})
export class ActorDetailsComponent implements OnInit {
  actor!: Actor;

  constructor(private route: ActivatedRoute, private actorService: ActorService) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.actorService.getActor(id).subscribe((data) => {
      this.actor = data;
    });
  }
}