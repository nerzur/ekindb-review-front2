import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';
import { AppMenuComponent } from './app.menu.component';
import { AppMenuitemComponent } from './app.menuitem.component';
import { RouterModule } from '@angular/router';
import { AppTopBarComponent } from './app.topbar.component';
import { AppFooterComponent } from './app.footer.component';
import { AppConfigModule } from './config/config.module';
import { AppSidebarComponent } from "./app.sidebar.component";
import { AppLayoutComponent } from "./app.layout.component";
import {TooltipModule} from "primeng/tooltip";
import {ConfigService} from "../pages/service/config.service";
import {DatePipe} from "@angular/common";
import {MessageService} from "primeng/api";
import {EkinDbReviewApiRestService} from "../pages/service/ekin-db-review-api-rest.service";
import {BlockUIModule} from "primeng/blockui";
import {MessagesModule} from "primeng/messages";
import {DropdownModule} from "primeng/dropdown";
import {TranslateModule} from "@ngx-translate/core";
import {ButtonDirective} from "primeng/button";

@NgModule({ declarations: [
        AppMenuitemComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppMenuComponent,
        AppSidebarComponent,
        AppLayoutComponent,
    ],
    exports: [
        AppLayoutComponent
    ], imports: [BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        InputTextModule,
        SidebarModule,
        BadgeModule,
        RadioButtonModule,
        InputSwitchModule,
        RippleModule,
        RouterModule,
        AppConfigModule,
        TooltipModule,
        BlockUIModule,
        MessagesModule, DropdownModule, TranslateModule, ButtonDirective], providers: [
        EkinDbReviewApiRestService,
        ConfigService,
        DatePipe,
        MessageService,
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppLayoutModule { }
