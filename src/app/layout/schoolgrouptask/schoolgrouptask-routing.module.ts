import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchoolgrouptaskComponent } from './schoolgrouptask.component';

const routes: Routes = [
  { path: '', component: SchoolgrouptaskComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolgrouptaskRoutingModule { }
