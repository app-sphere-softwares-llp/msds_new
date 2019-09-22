import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultDashboardComponent } from './default/default-dashboard.component';
import { WithBreadcrumbDashboardComponent } from './with-breadcrumb/with-breadcrumb-dashboard.component';
import { ResultComponent } from './result/result.component';


const routes: Routes = [
    {
        path: 'default',
        component: DefaultDashboardComponent,
        data: {
            title: 'Search  ',
            headerDisplay: "none"
        }
    },
    {
        path: 'with-breadcrumb',
        component: WithBreadcrumbDashboardComponent,
        data: {
            title: 'With Breadcrumb '
        }
    },
    {
        path: 'result',
        component: ResultComponent,
        data: {
            title: 'SearchResults'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {
}
