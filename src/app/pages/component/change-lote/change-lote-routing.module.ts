import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ChangeLoteComponent} from "./change-lote.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ChangeLoteComponent }
    ])],
    exports: [RouterModule]
})
export class ChangeLoteRoutingModule { }
