import { Component, OnInit } from '@angular/core';
import { Animaux } from 'src/app/interfaces/interfaces';
import { AnimauxService } from 'src/app/services/animaux.service';

@Component({
  selector: 'app-list-animaux-vet',
  templateUrl: './list-animaux-vet.component.html',
  styleUrls: ['./list-animaux-vet.component.css']
})
export class ListAnimauxVetComponent implements OnInit {
  animauxList: Animaux[] = [];

  constructor(private animauxService: AnimauxService) { }

  ngOnInit(): void {
    this.animauxService.getAllAnimaux().subscribe({
      next: (data) => this.animauxList = data,
      error: (error) => console.error('There was an error!', error)
    });
  }

}
