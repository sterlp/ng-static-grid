import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveRestoreComponent } from './save-restore.component';

describe('SaveRestoreComponent', () => {
  let component: SaveRestoreComponent;
  let fixture: ComponentFixture<SaveRestoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveRestoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveRestoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
