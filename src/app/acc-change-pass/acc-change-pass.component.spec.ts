import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccChangePassComponent } from './acc-change-pass.component';

describe('AccChangePassComponent', () => {
  let component: AccChangePassComponent;
  let fixture: ComponentFixture<AccChangePassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccChangePassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccChangePassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
