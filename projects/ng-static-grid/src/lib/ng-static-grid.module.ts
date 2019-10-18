import { NgModule } from '@angular/core';
import { NgStaticGridItemComponent } from './ng-static-grid-item.component';
import { NgStaticGridPanelComponent } from './panel/ng-static-grid-panel.component';



@NgModule({
  declarations: [NgStaticGridItemComponent, NgStaticGridPanelComponent],
  imports: [
  ],
  exports: [NgStaticGridItemComponent, NgStaticGridPanelComponent]
})
export class NgStaticGridModule { }
