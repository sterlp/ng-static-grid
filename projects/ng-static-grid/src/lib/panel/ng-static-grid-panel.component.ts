import { Component, Input, ContentChildren, QueryList, AfterViewChecked, OnInit } from '@angular/core';
import { NgStaticGridItemComponent } from '../ng-static-grid-item.component';
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
export class NgStaticGridPanelComponent implements OnInit, AfterViewChecked {

  @ContentChildren(NgStaticGridItemComponent) items: QueryList<NgStaticGridItemComponent>;

  @Input() rows ? = 12;
  @Input() columns ? = 12;

  @Input() width ? = '100%';
  @Input() height ? = '100%';

  private internalModel: NgStaticGridModel;
  get model(): NgStaticGridModel {
    const result: NgStaticGridModel = {
      width: this.width,
      height: this.height,
      columns: this.columns,
      rows: this.rows,
      items: new Map()
    };
    if (this.items) {
      this.items.forEach(i => {
        if (i.id) {
          result.items[i.id] = {
            height: i.height, width: i.width,
            x: i.x, y: i.y
          };
        }
      });
    }
    return result;
  }
  set model(val: NgStaticGridModel) {
    this.internalModel = val;
    this.rows = INT_PARSER(val.rows) || 12;
    this.columns = INT_PARSER(val.columns) || 12;
    this.width = val.width;
    this.height = val.height;
  }

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
      if (this.internalModel && this.internalModel.items && this.internalModel.items[item.id]) {
        item.model = this.internalModel.items[item.id];
      }
      item.doPosition(w, h);
    });
  }
}
