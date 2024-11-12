import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashBoardVetComponent } from './dash-board-vet.component';

describe('DashBoardVetComponent', () => {
  let component: DashBoardVetComponent;
  let fixture: ComponentFixture<DashBoardVetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashBoardVetComponent]
    });
    fixture = TestBed.createComponent(DashBoardVetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
