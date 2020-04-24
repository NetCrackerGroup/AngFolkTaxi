import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockedErrorComponent } from './blocked-error.component';

describe('BlockedErrorComponent', () => {
  let component: BlockedErrorComponent;
  let fixture: ComponentFixture<BlockedErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockedErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockedErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
