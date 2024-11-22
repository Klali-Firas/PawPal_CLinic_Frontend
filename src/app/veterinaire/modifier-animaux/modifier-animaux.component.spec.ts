import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierAnimauxComponent } from './modifier-animaux.component';

describe('ModifierAnimauxComponent', () => {
  let component: ModifierAnimauxComponent;
  let fixture: ComponentFixture<ModifierAnimauxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifierAnimauxComponent]
    });
    fixture = TestBed.createComponent(ModifierAnimauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
