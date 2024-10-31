import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavpropriataireComponent } from './navpropriataire.component';

describe('NavpropriataireComponent', () => {
  let component: NavpropriataireComponent;
  let fixture: ComponentFixture<NavpropriataireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavpropriataireComponent]
    });
    fixture = TestBed.createComponent(NavpropriataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
