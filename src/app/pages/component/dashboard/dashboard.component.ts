import { Component, OnInit, OnDestroy } from '@angular/core';
import {EkinDbReviewApiRestService} from "../../service/ekin-db-review-api-rest.service";
import {ConfigService} from "../../service/config.service";

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    //Block1
    cantPesadasToday = "0";
    cantPesadasLastVersion = "0";
    cantPesadasLastRevision = "0";

    //Block2
    cantLotesProcesados = "0";
    cantLotesProcesadosUltimaRevision = "0";

    //Block3
    cantErrorTag = "0";
    cantNewErrors = "0";
    errorType = "green";

    //Block4
    cantLotesConErrores = "0";
    cantLotesConErroresUltimaVersion = "0";

    constructor(private service: EkinDbReviewApiRestService, private configService: ConfigService) {
    }

    ngOnInit() {
        this.loadCard1Data();
    }

    ngOnDestroy() {

    }

    loadCard1Data():void{
        this.service.getDbEntriesToday().subscribe(data => {
            this.cantPesadasToday = data;
        }, error => {
            console.log(error);
        });
        this.configService.getConfig().subscribe((data: any) => {
            this.service.getPalletsProcessedInRangeDates(new Date(data.lastEkinsaSoftwareInstallDate)).subscribe(data => {
                this.cantPesadasLastVersion = <string>data;
            }, error => {
                console.log(error);
            });
            this.service.getPalletsProcessedInRangeDates(new Date(data.initLastEkinsaSoftwareRevisionDate)).subscribe(data => {
                this.cantPesadasLastRevision = <string>data;
            }, error => {
                console.log(error);
            });
        });
    }
}
