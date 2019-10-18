import { Component, Input, ContentChildren, QueryList, AfterViewChecked, OnInit } from '@angular/core';
import { NgStaticGridItemComponent } from './ng-static-grid-item.component';
import { INT_PARSER } from './shared/attribute.model';

@Component({
  selector: 'ng-static-grid-panel',
  template: `
  <div class="static-grid"
    [style.width]="width"
    [style.height]="height">
    <ng-content></ng-content>
  </div>
  `,
  styles: [`
  .static-grid {
    position: relative;
  }`]
})
export class NgStaticGridPanelComponent implements OnInit, AfterViewChecked {

  @ContentChildren(NgStaticGridItemComponent) items: QueryList<NgStaticGridItemComponent>;

  @Input() rows ? = 12;
  @Input() columns ? = 12;

  @Input() width ? = '100%';
  @Input() height ? = '100%';

  constructor() { }

  ngOnInit(): void {
    this.rows = INT_PARSER(this.rows);
    this.columns = INT_PARSER(this.columns);
  }

  ngAfterViewChecked(): void {
    this.doPosition();
  }

  doPosition() {
    const w = 100 / this.columns;
    const h = 100 / this.rows;
    this.items.forEach(item => {
      item.doPosition(w, h);
    });
  }
}
