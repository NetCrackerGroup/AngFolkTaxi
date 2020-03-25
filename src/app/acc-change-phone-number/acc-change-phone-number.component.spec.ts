import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccChangePhoneNumberComponent } from './acc-change-phone-number.component';

describe('AccChangePhoneNumberComponent', () => {
  let component: AccChangePhoneNumberComponent;
  let fixture: ComponentFixture<AccChangePhoneNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccChangePhoneNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccChangePhoneNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
