import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YamapComponent } from './yamap.component';

describe('YamapComponent', () => {
  let component: YamapComponent;
  let fixture: ComponentFixture<YamapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YamapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YamapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
