import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeapgeneralinfoComponent } from './leapgeneralinfo.component';

const routes: Routes = [
  { path: '', component: LeapgeneralinfoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeapgeneralinfoRoutingModule { }
