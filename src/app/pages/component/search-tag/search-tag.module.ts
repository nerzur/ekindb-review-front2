import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SearchTagComponent} from "./search-tag.component";
import {SearchTagRoutingModule} from "./search-tag-routing.module";
import {FormsModule} from "@angular/forms";
import {TableModule} from "primeng/table";
import {DividerModule} from "primeng/divider";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";
import {KeyFilterModule} from "primeng/keyfilter";
import {MessageModule} from "primeng/message";
import {TooltipModule} from "primeng/tooltip";
import {AutoFocusModule} from "primeng/autofocus";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
      SearchTagComponent
  ],
    imports: [
        CommonModule,
        SearchTagRoutingModule,
        FormsModule,
        TableModule,
        DividerModule,
        ButtonModule,
        InputTextModule,
        RippleModule,
        KeyFilterModule,
        MessageModule,
        TooltipModule,
        AutoFocusModule,
        TranslateModule
    ]
})
export class SearchTagModule { }
