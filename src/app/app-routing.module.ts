import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimpleUsageComponent } from './example/simple-usage/simple-usage.component';
import { ComplexPageComponent } from './example/complex-page/complex-page.component';
import { SaveRestoreComponent } from './example/save-restore/save-restore.component';
import { GridCanvasComponent } from './example/grid-canvas/grid-canvas.component';


const routes: Routes = [
  {path: '', redirectTo: '/simple-usage', pathMatch: 'full'},
  {path: 'simple-usage', component: SimpleUsageComponent},
  {path: 'complex-usage', component: ComplexPageComponent},
  {path: 'save-restore', component: SaveRestoreComponent},
  {path: 'grid-canvas', component: GridCanvasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
