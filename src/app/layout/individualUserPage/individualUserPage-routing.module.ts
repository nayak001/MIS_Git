import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndividualUserPageComponent } from './individualUserPage.component';

const routes: Routes = [
    { path: '', component:IndividualUserPageComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class IndividualUserPageRoutingModule {
}
