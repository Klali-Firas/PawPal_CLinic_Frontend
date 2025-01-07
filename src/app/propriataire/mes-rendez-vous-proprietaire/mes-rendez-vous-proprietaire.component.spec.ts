import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesRendezVousProprietaireComponent } from './mes-rendez-vous-proprietaire.component';

describe('MesRendezVousProprietaireComponent', () => {
  let component: MesRendezVousProprietaireComponent;
  let fixture: ComponentFixture<MesRendezVousProprietaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MesRendezVousProprietaireComponent]
    });
    fixture = TestBed.createComponent(MesRendezVousProprietaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
