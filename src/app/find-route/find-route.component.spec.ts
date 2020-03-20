import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindRootComponent } from './find-root.component';

describe('FindRootComponent', () => {
  let component: FindRootComponent;
  let fixture: ComponentFixture<FindRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
