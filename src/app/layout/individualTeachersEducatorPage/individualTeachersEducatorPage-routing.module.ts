import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndividualTeachersEducatorPageComponent } from './individualTeachersEducatorPage.component';

const routes: Routes = [
    { path: '', component: IndividualTeachersEducatorPageComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class IndividualTeachersEducatorPageRoutingModule {
}
