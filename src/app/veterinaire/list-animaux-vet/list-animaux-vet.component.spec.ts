import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAnimauxVetComponent } from './list-animaux-vet.component';

describe('ListAnimauxVetComponent', () => {
  let component: ListAnimauxVetComponent;
  let fixture: ComponentFixture<ListAnimauxVetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAnimauxVetComponent]
    });
    fixture = TestBed.createComponent(ListAnimauxVetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
