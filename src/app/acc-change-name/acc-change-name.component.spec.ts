import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccChangeNameComponent } from './acc-change-name.component';

describe('AccChangeNameComponent', () => {
  let component: AccChangeNameComponent;
  let fixture: ComponentFixture<AccChangeNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccChangeNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccChangeNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
