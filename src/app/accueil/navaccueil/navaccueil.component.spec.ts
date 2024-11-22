import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavaccueilComponent } from './navaccueil.component';

describe('NavaccueilComponent', () => {
  let component: NavaccueilComponent;
  let fixture: ComponentFixture<NavaccueilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavaccueilComponent]
    });
    fixture = TestBed.createComponent(NavaccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
