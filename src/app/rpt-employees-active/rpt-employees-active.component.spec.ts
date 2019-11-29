import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RptEmployeesActiveComponent } from './rpt-employees-active.component';

describe('RptEmployeesActiveComponent', () => {
  let component: RptEmployeesActiveComponent;
  let fixture: ComponentFixture<RptEmployeesActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RptEmployeesActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RptEmployeesActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
