import {Component, OnDestroy, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {TranslateService} from "@ngx-translate/core";
import {Subscription} from "rxjs";
import {UserService} from "./pages/service/user.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

    // lang: string = "en";

    subscription: Subscription;

    constructor(public translate: TranslateService,
                public primeNGConfig: PrimeNGConfig,
                private userService: UserService) {
        translate.addLangs(['es', 'en', 'fr', 'cn']);
        translate.setDefaultLang('es');

        // const browserLang = translate.getBrowserLang();
        // let lang = browserLang.match(/es|en|fr|cn/) ? browserLang : 'es';

        userService.getUserLang().subscribe(data=>{
            this.changeLang(data.lang);
            this.clearSubscription();
            this.subscription = this.translate.stream('primeng').subscribe(data => {
                this.primeNGConfig.setTranslation(data);
            });
        },error => console.error(error))
    }

    changeLang(lang: string) {
        this.translate.use(lang);
    }

    ngOnInit() {
        this.primeNGConfig.ripple = true;
    }

    ngOnDestroy() {
        this.clearSubscription();
    }

    clearSubscription(){
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
