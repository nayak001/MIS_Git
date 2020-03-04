import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeapgrouptaskComponent } from './leapgrouptask.component';

const routes: Routes = [
  { path: '', component: LeapgrouptaskComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeapgrouptaskRoutingModule { }
