import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatePassengerComponent } from './rate-passenger.component';

describe('RateUserComponent', () => {
  let component: RatePassengerComponent;
  let fixture: ComponentFixture<RatePassengerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatePassengerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatePassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
