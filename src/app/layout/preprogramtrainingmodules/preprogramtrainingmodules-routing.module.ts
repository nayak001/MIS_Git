import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreprogramTrainingComponent } from './preprogramtrainingmodules.component';

const routes: Routes = [
    { path: '', component: PreprogramTrainingComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PreprogrameTrainingRoutingModule {
}
