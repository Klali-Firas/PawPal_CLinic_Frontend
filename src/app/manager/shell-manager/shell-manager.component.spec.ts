import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellManagerComponent } from './shell-manager.component';

describe('ShellManagerComponent', () => {
  let component: ShellManagerComponent;
  let fixture: ComponentFixture<ShellManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShellManagerComponent]
    });
    fixture = TestBed.createComponent(ShellManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
