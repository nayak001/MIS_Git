import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveymasterComponent } from './surveymaster.component';

const routes: Routes = [
    { path: '', component: SurveymasterComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SurveymasterRoutingModule {
}
