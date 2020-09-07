import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainingMiscComponent } from './trainingmisc.component';

const routes: Routes = [
    { path: '', component: TrainingMiscComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TrainingMiscRoutingModule {
}