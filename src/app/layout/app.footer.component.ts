import {Component, OnInit} from '@angular/core';
import { LayoutService } from "./service/app.layout.service";

declare const require: (path: string) => any;

@Component({
    selector: 'app-footer',
    templateUrl: './app.footer.component.html'
})
export class AppFooterComponent implements OnInit{

    public version: string;
    public year: number;
    public license : string;

    constructor(public layoutService: LayoutService) {

    }

    ngOnInit(): void {
        const APP_VERSION = require('../../../package.json').version;
        const LICENSE = require('../../../package.json').license;
        this.year = new Date().getFullYear();
        APP_VERSION != null ? this.version = APP_VERSION : "0.1.0-Beta";
        LICENSE != null ? this.license = LICENSE : "MIT";
    }
}
