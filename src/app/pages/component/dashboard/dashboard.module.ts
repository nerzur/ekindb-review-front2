import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import {ChartModule} from "primeng/chart";
import {TranslateModule} from "@ngx-translate/core";
import {PrimeTemplate} from "primeng/api";
import {TableModule} from "primeng/table";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DashboardsRoutingModule,
        ChartModule,
        TranslateModule,
        PrimeTemplate,
        TableModule
    ],
    declarations: [DashboardComponent]
})
export class DashboardModule { }
