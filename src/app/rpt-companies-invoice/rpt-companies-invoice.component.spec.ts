import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RptCompaniesInvoiceComponent } from './rpt-companies-invoice.component';

describe('RptCompaniesInvoiceComponent', () => {
  let component: RptCompaniesInvoiceComponent;
  let fixture: ComponentFixture<RptCompaniesInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RptCompaniesInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RptCompaniesInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
