import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TchbaselineComponent } from './tchbaseline.component';

const routes: Routes = [
    { path: '', component: TchbaselineComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TchbaselineRoutingModule {
}
