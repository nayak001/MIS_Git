import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchoolindpracticeComponent } from './schoolindpractice.component';

const routes: Routes = [
  { path: '', component: SchoolindpracticeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolindpracticeRoutingModule { }
