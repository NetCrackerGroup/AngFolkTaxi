import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccChangeEmailComponent } from './acc-change-email.component';

describe('AccChangeEmailComponent', () => {
  let component: AccChangeEmailComponent;
  let fixture: ComponentFixture<AccChangeEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccChangeEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccChangeEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
