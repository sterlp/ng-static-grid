import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridCanvasSComponent } from './grid-canvas-s.component';

describe('GridCanvasComponent', () => {
  let component: GridCanvasSComponent;
  let fixture: ComponentFixture<GridCanvasSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridCanvasSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridCanvasSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
