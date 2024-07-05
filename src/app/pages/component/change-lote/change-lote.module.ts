import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChangeLoteComponent} from "./change-lote.component";
import {ChangeLoteRoutingModule} from "./change-lote-routing.module";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {ToggleButtonModule} from "primeng/togglebutton";
import {PickListModule} from "primeng/picklist";
import {MultiSelectModule} from "primeng/multiselect";
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {RippleModule} from "primeng/ripple";
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService} from "primeng/api";
import {DialogModule} from "primeng/dialog";

@NgModule({
  declarations: [
      ChangeLoteComponent
  ],
    imports: [
        CommonModule,
        ChangeLoteRoutingModule,
        FormsModule,
        InputTextModule,
        ToggleButtonModule,
        PickListModule,
        MultiSelectModule,
        ButtonModule,
        CalendarModule,
        RippleModule,
        ToastModule,
        ConfirmDialogModule,
        DialogModule,
    ],
    providers: [
        ConfirmationService
    ]
})
export class ChangeLoteModule { }
