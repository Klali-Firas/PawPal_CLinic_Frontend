import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellVeterinaireComponent } from './shell-veterinaire.component';

describe('ShellVeterinaireComponent', () => {
  let component: ShellVeterinaireComponent;
  let fixture: ComponentFixture<ShellVeterinaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShellVeterinaireComponent]
    });
    fixture = TestBed.createComponent(ShellVeterinaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
