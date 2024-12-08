import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProprietaireChatComponent } from './proprietaire-chat.component';

describe('ProprietaireChatComponent', () => {
  let component: ProprietaireChatComponent;
  let fixture: ComponentFixture<ProprietaireChatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProprietaireChatComponent]
    });
    fixture = TestBed.createComponent(ProprietaireChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
