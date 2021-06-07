import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeacherperformancereportComponent } from './teacherperformancereport.component';

const routes: Routes = [
    { path: '', component: TeacherperformancereportComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TeacherperformancereportRoutingModule {
}
