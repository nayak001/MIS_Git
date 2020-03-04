import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Masterteachertraining2Component } from './masterteachertraining2.component';

const routes: Routes = [
    { path: '', component: Masterteachertraining2Component }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Masterteachertraining2RoutingModule {
}
