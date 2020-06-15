import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridCanvasAltComponent } from './grid-canvas-alt.component';

describe('GridCanvasComponent', () => {
  let component: GridCanvasAltComponent;
  let fixture: ComponentFixture<GridCanvasAltComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridCanvasAltComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridCanvasAltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
