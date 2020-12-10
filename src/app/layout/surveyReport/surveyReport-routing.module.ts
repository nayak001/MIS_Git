import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveyReportComponent } from './surveyReport.component'

const routes: Routes = [
    { path: '', component: SurveyReportComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SurveyReportRoutingModule {
}
