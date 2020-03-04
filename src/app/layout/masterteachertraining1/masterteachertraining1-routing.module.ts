import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Masterteachertraining1Component } from './masterteachertraining1.component';

const routes: Routes = [
    { path: '', component: Masterteachertraining1Component }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Masterteachertraining1RoutingModule {
}
