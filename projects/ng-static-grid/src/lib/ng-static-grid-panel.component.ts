import { Component, OnInit, Input, ContentChildren, QueryList, AfterViewChecked } from '@angular/core';
import { NgStaticGridItemComponent } from './ng-static-grid-item.component';
import { DomSanitizer } from '@angular/platform-browser';

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
export class NgStaticGridPanelComponent implements AfterViewChecked {

  @ContentChildren(NgStaticGridItemComponent) items: QueryList<NgStaticGridItemComponent>;

  @Input() rows ? = 12;
  @Input() columns ? = 12;

  @Input() width ? = '100%';
  @Input() height ? = '100%';

  constructor(private sanitizer: DomSanitizer) { }

  ngAfterViewChecked(): void {
    this.doPosition();
  }

  doPosition() {
    const w = this.calcWidth();
    const h = this.calcHeight();
    this.items.forEach(item => {
      item.doPosition(w, h);
    });
  }

  calcWidth(): number {
    return 100 / this.columns;
  }
  calcHeight(): number {
    return 100 / this.rows;
  }

}
