import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Mastermanagertraining2Component } from './mastermanagertraining2.component';

const routes: Routes = [
    { path: '', component: Mastermanagertraining2Component }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Mastermanagertraining2RoutingModule {
}
