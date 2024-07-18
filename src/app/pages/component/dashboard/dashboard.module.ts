import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import {ChartModule} from "primeng/chart";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DashboardsRoutingModule,
        ChartModule,
        TranslateModule
    ],
    declarations: [DashboardComponent]
})
export class DashboardModule { }
