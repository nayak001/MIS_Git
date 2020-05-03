import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Manager_todoComponent } from './manager_todo.component';

const routes: Routes = [
    { path: '', component: Manager_todoComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Manager_todoRoutingModule {
}
