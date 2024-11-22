import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsManagerComponent } from './appointments-manager.component';

describe('AppointmentsManagerComponent', () => {
  let component: AppointmentsManagerComponent;
  let fixture: ComponentFixture<AppointmentsManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentsManagerComponent]
    });
    fixture = TestBed.createComponent(AppointmentsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
