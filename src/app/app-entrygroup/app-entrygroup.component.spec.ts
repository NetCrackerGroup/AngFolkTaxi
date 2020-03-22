import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppEntrygroupComponent } from './app-entrygroup.component';

describe('AppEntrygroupComponent', () => {
  let component: AppEntrygroupComponent;
  let fixture: ComponentFixture<AppEntrygroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppEntrygroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppEntrygroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
