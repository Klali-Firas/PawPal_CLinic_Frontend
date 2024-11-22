import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavVeterinaireComponent } from './nav-veterinaire.component';

describe('NavVeterinaireComponent', () => {
  let component: NavVeterinaireComponent;
  let fixture: ComponentFixture<NavVeterinaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavVeterinaireComponent]
    });
    fixture = TestBed.createComponent(NavVeterinaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
