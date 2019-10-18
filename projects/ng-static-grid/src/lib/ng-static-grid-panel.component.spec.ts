import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgStaticGridPanelComponent } from './ng-static-grid-panel.component';

describe('NgGridComponent', () => {
  let component: NgStaticGridPanelComponent;
  let fixture: ComponentFixture<NgStaticGridPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgStaticGridPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgStaticGridPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.columns).toBe(12);
    expect(component.rows).toBe(12);
  });
});
