import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private keycloak: KeycloakService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = this.keycloak.getKeycloakInstance().token;
        const authReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });
        return next.handle(authReq);
    }
}
