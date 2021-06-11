import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PgskillmasterComponent } from './pgeskillmaster.component';

const routes: Routes = [
    { path: '', component: PgskillmasterComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PgeskillmasterRoutingModule {
}
