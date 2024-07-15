import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileComponent} from "./profile.component";
import {ProfileRoutingModule} from "./profile-routing.module";
import {UserService} from "../../service/user.service";
import {TagModule} from "primeng/tag";
import {InputTextModule} from "primeng/inputtext";
import {MultiSelectModule} from "primeng/multiselect";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {PasswordModule} from "primeng/password";
import {DividerModule} from "primeng/divider";
import {AvatarModule} from "primeng/avatar";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
      ProfileComponent
  ],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        TagModule,
        InputTextModule,
        MultiSelectModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        PasswordModule,
        DividerModule,
        AvatarModule,
        TranslateModule
    ],
    providers:[
        UserService,
        MessageService
    ]
})
export class ProfileModule { }
