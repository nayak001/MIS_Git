import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LearningOutcomesComponent } from './learningOutcomes.component';

const routes: Routes = [
    { path: '', component:LearningOutcomesComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LearningOutcomesRoutingModule {
}
