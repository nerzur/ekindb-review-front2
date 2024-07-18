import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

import { AccessRoutingModule } from './access-routing.module';
import { AccessComponent } from './access.component';
import {RippleModule} from "primeng/ripple";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        AccessRoutingModule,
        ButtonModule,
        RippleModule,
        TranslateModule
    ],
    declarations: [AccessComponent]
})
export class AccessModule { }
