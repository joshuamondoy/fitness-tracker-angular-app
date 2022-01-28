import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingComponent } from './training.component';


const routes: Routes = [
  // Lazy loading this will merge it with other router behind the scene, this will only load upon call after the login
  { path: '', component: TrainingComponent} // , canActivate: [AuthGuard]. for route guard

];

@NgModule({
  imports: [RouterModule.forChild(routes)], 
  exports: [RouterModule],
})
export class TrainingRoutingModule { }
