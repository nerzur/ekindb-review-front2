import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {KeycloakService} from "keycloak-angular";
import {PermissionGuard} from "./permission.guard";

export const AuthGuard: CanActivateFn = (route, state) => {
    const keycloakService = inject(KeycloakService);
    const router = inject(Router);

    if(!keycloakService.isLoggedIn() || keycloakService.isTokenExpired()){
        keycloakService.login().then(r=>false);
        return false;
        // router.navigateByUrl('/auth/login').then(r => false);
    }

    let permissionGuard = (route.data as PermissionGuard);
    if(permissionGuard.roles != null){
        let permissionGuardRoles= permissionGuard.roles;
        let userRoles = keycloakService.getUserRoles(true).filter(e=> e.endsWith("_ROLE"));

        if(!permissionGuardRoles.some(e=> userRoles.includes(e) || e == "IS_AUTHENTICATED"))
            router.navigateByUrl('/auth/access').then(r => false);
    }

    return true;
};


