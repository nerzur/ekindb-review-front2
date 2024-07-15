import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {ErrorSearchComponent} from "./error-search.component";
import {ErrorSearchRoutingModule} from "./error-search-routing.module";
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";
import {RippleModule} from "primeng/ripple";
import {DividerModule} from "primeng/divider";
import {TableModule} from "primeng/table";
import {BadgeModule} from "primeng/badge";
import {DockModule} from "primeng/dock";
import {DialogModule} from "primeng/dialog";
import {EkinDbReviewApiRestService} from "../../service/ekin-db-review-api-rest.service";
import {ConfigService} from "../../service/config.service";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
      ErrorSearchComponent,
  ],
    imports: [
        ErrorSearchRoutingModule,
        CommonModule,
        CalendarModule,
        FormsModule,
        RippleModule,
        DividerModule,
        TableModule,
        BadgeModule,
        DockModule,
        DialogModule,
        ToastModule,
        TranslateModule
    ],
    providers: [
        EkinDbReviewApiRestService,
        ConfigService,
        DatePipe,
        MessageService
    ]
})
export class ErrorSearchModule { }
