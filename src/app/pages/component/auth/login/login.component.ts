import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {KeycloakService} from "keycloak-angular";
import {KeycloakLoginOptions} from "keycloak-js";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    password!: string;
    username!: string;

    constructor(public layoutService: LayoutService, private keycloakService: KeycloakService) { }

    authenticate(){
        this.keycloakService.login().then(e=>true);
    }
}
