import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimpleUsageComponent } from './example/simple-usage/simple-usage.component';
import { ComplexPageComponent } from './example/complex-page/complex-page.component';


const routes: Routes = [
  {path: 'simple-usage', component: SimpleUsageComponent},
  {path: 'complex-usage', component: ComplexPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
