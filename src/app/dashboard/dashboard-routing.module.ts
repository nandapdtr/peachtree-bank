import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Route[] = [
    { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
