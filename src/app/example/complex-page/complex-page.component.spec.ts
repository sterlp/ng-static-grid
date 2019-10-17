import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplexPageComponent } from './complex-page.component';

describe('ComplexPageComponent', () => {
  let component: ComplexPageComponent;
  let fixture: ComponentFixture<ComplexPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplexPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplexPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
