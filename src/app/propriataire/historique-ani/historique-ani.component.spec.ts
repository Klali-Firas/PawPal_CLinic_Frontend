import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueAniComponent } from './historique-ani.component';

describe('HistoriqueAniComponent', () => {
  let component: HistoriqueAniComponent;
  let fixture: ComponentFixture<HistoriqueAniComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoriqueAniComponent]
    });
    fixture = TestBed.createComponent(HistoriqueAniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
