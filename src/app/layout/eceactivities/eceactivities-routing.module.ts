import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EceactivitiesComponent } from './eceactivities.component';

const routes: Routes = [
    { path: '', component: EceactivitiesComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EceactivitiesRoutingModule {
}
