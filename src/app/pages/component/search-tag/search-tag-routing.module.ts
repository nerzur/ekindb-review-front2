import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {SearchTagComponent} from "./search-tag.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: SearchTagComponent }
    ])],
    exports: [RouterModule]
})
export class SearchTagRoutingModule { }
