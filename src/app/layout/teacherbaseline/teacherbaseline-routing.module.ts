import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeacherbaselineComponent } from './teacherbaseline.component';

const routes: Routes = [
    { path: '', component: TeacherbaselineComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class teacherbaselineRoutingModule {
}
