import { Component, Input, ContentChildren, QueryList, AfterViewChecked, OnInit } from '@angular/core';
import { NgStaticGridItemComponent } from '../item/ng-static-grid-item.component';
import { INT_PARSER } from '../shared/attribute.model';
import { NgStaticGridModel } from './panel.model';

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
/* tslint:disable:curly*/
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

  getModel(): NgStaticGridModel {
    const result: NgStaticGridModel = {
      width: this.width,
      height: this.height,
      columns: this.columns,
      rows: this.rows,
      items: new Map()
    };
    if (this.items) {
      this.items.forEach(i => {
        if (i.id) result.items[i.id] = i.getModel();
      });
    }
    return result;
  }
  setModel(val: NgStaticGridModel) {
    this.rows = INT_PARSER(val.rows) || 12;
    this.columns = INT_PARSER(val.columns) || 12;
    this.width = val.width;
    this.height = val.height;
    this.items.forEach(item => {
      if (val.items && val.items[item.id]) {
        item.setModel(val.items[item.id]);
      }
    });
  }
  /**
   * Position all elements in the view
   */
  doPosition() {
    const w = 100 / this.columns;
    const h = 100 / this.rows;
    this.items.forEach(item => {
      item.doPosition(w, h);
    });
  }
}
