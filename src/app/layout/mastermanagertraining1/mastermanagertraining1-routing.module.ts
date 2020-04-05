import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Mastermanagertraining1Component } from './mastermanagertraining1.component';

const routes: Routes = [
    { path: '', component: Mastermanagertraining1Component }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Mastermanagertraining1RoutingModule {
}
