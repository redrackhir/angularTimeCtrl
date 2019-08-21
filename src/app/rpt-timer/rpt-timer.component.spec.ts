import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RptTimerComponent } from './rpt-timer.component';

describe('RptTimerComponent', () => {
  let component: RptTimerComponent;
  let fixture: ComponentFixture<RptTimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RptTimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RptTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
