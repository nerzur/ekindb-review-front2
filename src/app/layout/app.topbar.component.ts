import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {LayoutService} from "./service/app.layout.service";
import {KeycloakProfile} from "keycloak-js";
import {KeycloakEventType, KeycloakService} from "keycloak-angular";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit{

    public isLoggedIn = false;
    public userProfile: KeycloakProfile | null = null;

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService,
                private readonly keycloak: KeycloakService) {
    }

    async ngOnInit() {
        this.keycloak.keycloakEvents$.subscribe({
            next(event) {
                if (event.type == KeycloakEventType.OnTokenExpired) {
                    console.error("UPDATING TOKEN");
                    this.keycloak.updateToken(20).pipe(e => {
                        console.log("IS TOKEN REFRESHED "+e);
                    });
                }
            }
        });

        this.isLoggedIn = this.keycloak.isLoggedIn();

        if(this.isLoggedIn){
            this.userProfile = await this.keycloak.loadUserProfile();
        }
    }

    public login(){
        this.keycloak.login({
            redirectUri: window.location.origin
        }).then(e=> false);
    }

    public logout(){
        this.keycloak.logout(window.location.origin)
            .then(e=>false);
    }
}
