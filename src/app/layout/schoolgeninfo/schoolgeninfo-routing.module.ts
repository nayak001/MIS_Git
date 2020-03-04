import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchoolgeninfoComponent } from './schoolgeninfo.component';

const routes: Routes = [
  { path: '', component: SchoolgeninfoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolgeninfoRoutingModule { }
