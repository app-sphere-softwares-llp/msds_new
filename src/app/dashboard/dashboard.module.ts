import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { ThemeConstantService } from '../shared/services/theme-constant.service';

import { DefaultDashboardComponent } from './default/default-dashboard.component';
import { WithBreadcrumbDashboardComponent } from './with-breadcrumb/with-breadcrumb-dashboard.component';
import { ResultComponent } from './result/result.component';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        DashboardRoutingModule
     
    ],
    exports: [],
    declarations: [
        DefaultDashboardComponent,
        WithBreadcrumbDashboardComponent,
        ResultComponent
    ],
    providers: [
        ThemeConstantService
    ],
})
export class DashboardModule { }
