import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ErrorSearchComponent } from './error-search.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ErrorSearchComponent }
    ])],
    exports: [RouterModule]
})
export class ErrorSearchRoutingModule { }
