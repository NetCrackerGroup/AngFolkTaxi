import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccChangeInfoComponent } from './acc-change-info.component';

describe('AccChangeInfoComponent', () => {
  let component: AccChangeInfoComponent;
  let fixture: ComponentFixture<AccChangeInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccChangeInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccChangeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
