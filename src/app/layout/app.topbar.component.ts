import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MenuItem, PrimeNGConfig} from 'primeng/api';
import {LayoutService} from "./service/app.layout.service";
import {KeycloakProfile} from "keycloak-js";
import {KeycloakEventType, KeycloakService} from "keycloak-angular";
import {UserService} from "../pages/service/user.service";
import {TranslateService} from "@ngx-translate/core";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit{

    public isLoggedIn = false;
    public userProfile: KeycloakProfile | null = null;

    countries: any[] | undefined;

    selectedCountry: any | undefined;


    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    subscription: Subscription;

    constructor(public layoutService: LayoutService,
                private userService: UserService,
                public primeNGConfig: PrimeNGConfig,
                private translateService : TranslateService,
                private readonly keycloak: KeycloakService) {
    }

    clearSubscription(){
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    changeLanguage(){
        this.clearSubscription();

        this.userService.setUserLang(this.selectedCountry.lang).subscribe(data=>{
                this.translateService.use(this.selectedCountry.lang);
                this.translateService.setDefaultLang(this.selectedCountry.lang);
                this.subscription = this.translateService.stream('primeng').subscribe(data => {
                    this.primeNGConfig.setTranslation(data);
            });
        });
    }

    async ngOnInit() {
        this.countries = [
            { name: 'Español', code: 'ES', lang: 'es' },
            { name: 'English', code: 'US', lang: 'en' },
            { name: 'Chinese', code: 'CN', lang: 'cn' },
            { name: 'French', code: 'FR', lang: 'fr' },
        ];
        this.userService.getUserLang().subscribe((data:any)=>{
            this.userService.defaultLang = data.lang == null ? "es" : data.lang;
            this.countries.forEach(country=>{
                if(country.lang == this.userService.defaultLang){
                    this.selectedCountry = country;
                }
            })
            if (this.selectedCountry == null)
                this.selectedCountry = this.countries[0];
            this.changeLanguage();
        }, error => console.log(error));
        this.keycloak.keycloakEvents$.subscribe({
            next(event) {
                if (event.type == KeycloakEventType.OnTokenExpired) {
                    // console.error("UPDATING TOKEN");
                    this.keycloak.updateToken(20).pipe(e => {
                        // console.log("IS TOKEN REFRESHED "+e);
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
