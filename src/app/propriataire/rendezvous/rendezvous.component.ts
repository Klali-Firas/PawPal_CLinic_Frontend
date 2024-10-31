import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RendezVous } from 'src/app/interfaces/interfaces';
import { RendezvousService } from 'src/app/services/rendezvous.service';

@Component({
  selector: 'app-rendezvous',
  templateUrl: './rendezvous.component.html',
  styleUrls: ['./rendezvous.component.css']
})
export class RendezvousComponent implements OnInit {
  rendezvousForm: FormGroup;

  constructor(private fb: FormBuilder,private rendevousservice: RendezvousService) {
    this.rendezvousForm = this.fb.group({
      id: [null, Validators.required],
      animalId: [null, Validators.required],
      dateRendezVous: [null, Validators.required],
      motif: [null],
    });
  }

  ngOnInit(): void {
    // You can initialize the form with default values if needed
  }

  onSubmit(): void {
    if (this.rendezvousForm.valid) {
      const rendezvous: RendezVous = this.rendezvousForm.value;
      console.log('Form Submitted', rendezvous);
      // Handle form submission, e.g., send it to a service
      this.rendevousservice.createRendezVous(rendezvous).subscribe({
        next: (response: any) => {
          console.log('Rendezvous added', response);
          
        },error: (error: any) => {
          console.error('Error adding rendezvous', error);}
      });

    }
  }
}