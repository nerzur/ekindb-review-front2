import { Component } from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {Router} from "@angular/router";

@Component({
    selector: 'app-notfound',
    styleUrl: './style.css',
    templateUrl: './notfound.component.html',
})
export class NotfoundComponent {

    constructor(private keycloakService: KeycloakService, private router:Router) {
    }

    logout(){
        this.keycloakService.logout(window.location.origin).then(e=> false);
    }
}
