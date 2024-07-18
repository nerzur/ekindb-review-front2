import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './layout/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import {AuthGuard} from "./guards/auth.guard";
import {PermissionGuard} from "./guards/permission.guard";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent, canActivateChild: [AuthGuard],
                children: [
                    { path: '', loadChildren: () => import('./pages/component/dashboard/dashboard.module').then(m => m.DashboardModule), data: {roles: ['COMMON_USER_ROLE']} },
                    { path: 'profile', loadChildren: () => import('./pages/component/profile/profile.module').then(m => m.ProfileModule), data: {roles: ['IS_AUTHENTICATED']} },
                    { path: 'errorSearch', loadChildren: () => import('./pages/component/error-search/error-search.module').then(m => m.ErrorSearchModule), data: {roles: ['COMMON_USER_ROLE']} },
                    { path: 'searchTag', loadChildren: () => import('./pages/component/search-tag/search-tag.module').then(m => m.SearchTagModule), data: {roles: ['COMMON_USER_ROLE']} },
                    { path: 'changeLote', loadChildren: () => import('./pages/component/change-lote/change-lote.module').then(m => m.ChangeLoteModule), data: {roles: ['MODIFIER_USER_ROLE']} },
                    // { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule), data: {roles: ['ADMIN_ROLE']} },
                    // { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule), data: {roles: ['ADMIN_ROLE']} },
                    // { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    // { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    // { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) }
                ]
            },
            { path: 'auth', loadChildren: () => import('./pages/component/auth/auth.module').then(m => m.AuthModule) },
            // { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
