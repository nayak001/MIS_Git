import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssessmentinfoComponent } from './assessmentinfo.component';

const routes: Routes = [
    { path: '', component: AssessmentinfoComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AssessmentinfoRoutingModule {
}
