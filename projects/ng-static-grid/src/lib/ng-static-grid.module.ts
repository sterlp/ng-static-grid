import { NgModule } from '@angular/core';
import { NgStaticGridItemComponent } from './item/ng-static-grid-item.component';
import { NgStaticGridPanelComponent } from './panel/ng-static-grid-panel.component';
import { NgStaticGridCanvasComponent } from './canvas/canvas.component';



@NgModule({
  declarations: [NgStaticGridItemComponent, NgStaticGridPanelComponent, NgStaticGridCanvasComponent],
  imports: [
  ],
  exports: [NgStaticGridItemComponent, NgStaticGridPanelComponent, NgStaticGridCanvasComponent]
})
export class NgStaticGridModule { }
