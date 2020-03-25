import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateAfterJourneyComponent } from './rate-after-journey.component';

describe('RateAfterJourneyComponent', () => {
  let component: RateAfterJourneyComponent;
  let fixture: ComponentFixture<RateAfterJourneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateAfterJourneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateAfterJourneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
