import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccChangeCityComponent } from './acc-change-city.component';

describe('AccChangeCityComponent', () => {
  let component: AccChangeCityComponent;
  let fixture: ComponentFixture<AccChangeCityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccChangeCityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccChangeCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
