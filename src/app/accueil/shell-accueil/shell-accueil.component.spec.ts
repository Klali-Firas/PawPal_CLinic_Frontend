import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellAccueilComponent } from './shell-accueil.component';

describe('ShellAccueilComponent', () => {
  let component: ShellAccueilComponent;
  let fixture: ComponentFixture<ShellAccueilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShellAccueilComponent]
    });
    fixture = TestBed.createComponent(ShellAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
