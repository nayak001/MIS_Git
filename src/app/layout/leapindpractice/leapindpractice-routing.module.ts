import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeapindpracticeComponent } from './leapindpractice.component';

const routes: Routes = [
  { path: '', component: LeapindpracticeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeapindpracticeRoutingModule { }
