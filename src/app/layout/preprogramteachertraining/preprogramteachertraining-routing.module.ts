import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreprogrmateachertrainingComponent } from './preprogramteachertraining.component';

const routes: Routes = [
    { path: '', component: PreprogrmateachertrainingComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PreprogramteachertrainingRoutingModule {
}
