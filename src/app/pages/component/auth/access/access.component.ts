import { Component } from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {Router} from '@angular/router';


@Component({
    selector: 'app-access',
    templateUrl: './access.component.html',
})
export class AccessComponent {


    constructor(private keycloakService: KeycloakService, private router:Router) {
    }

    logout(){
        this.keycloakService.logout(window.location.origin).then(e=> false);
    }
}
