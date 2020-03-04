import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentDetailsPageComponent } from './studentDetailsPage.component';

const routes: Routes = [
    { path: '', component:StudentDetailsPageComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StudentDetailsPageRoutingModule {
}
