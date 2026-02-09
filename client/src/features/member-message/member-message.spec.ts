import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberMessage } from './member-message';

describe('MemberMessage', () => {
  let component: MemberMessage;
  let fixture: ComponentFixture<MemberMessage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberMessage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberMessage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
