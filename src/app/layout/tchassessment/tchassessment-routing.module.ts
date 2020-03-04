import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TchassessmentComponent } from './tchassessment.component';

const routes: Routes = [
    { path: '', component: TchassessmentComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TchassessmentRoutingModule {
}
