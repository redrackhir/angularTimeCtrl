import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCheckinsComponent } from './edit-checkins.component';

describe('EditCheckinsComponent', () => {
  let component: EditCheckinsComponent;
  let fixture: ComponentFixture<EditCheckinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCheckinsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCheckinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
