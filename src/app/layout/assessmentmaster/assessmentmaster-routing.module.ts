import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssessmentmasterComponent } from './assessmentmaster.component';

const routes: Routes = [
    { path: '', component: AssessmentmasterComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AssessmentmasterRoutingModule {
}
