import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellpropriataireComponent } from './shellpropriataire.component';

describe('ShellpropriataireComponent', () => {
  let component: ShellpropriataireComponent;
  let fixture: ComponentFixture<ShellpropriataireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShellpropriataireComponent]
    });
    fixture = TestBed.createComponent(ShellpropriataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
