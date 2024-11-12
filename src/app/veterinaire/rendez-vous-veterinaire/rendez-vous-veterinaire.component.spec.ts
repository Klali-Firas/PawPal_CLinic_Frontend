import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendezVousVeterinaireComponent } from './rendez-vous-veterinaire.component';

describe('RendezVousVeterinaireComponent', () => {
  let component: RendezVousVeterinaireComponent;
  let fixture: ComponentFixture<RendezVousVeterinaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RendezVousVeterinaireComponent]
    });
    fixture = TestBed.createComponent(RendezVousVeterinaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
