import {Component, OnInit, OnDestroy} from '@angular/core';
import {EkinDbReviewApiRestService} from "../../service/ekin-db-review-api-rest.service";
import {ConfigService} from "../../service/config.service";
import {CountEntriesByDates} from "../../api/countEntriesByDates";
import {TranslateService} from "@ngx-translate/core";
import {elements} from "chart.js";

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    //Block1
    cantPesadasToday = "";
    cantPesadasLastVersion = "";
    cantPesadasLastRevision = "";

    //Block2
    cantLotesProcesados = "";
    cantLotesProcesadosUltimaRevision = "";

    //Block3
    cantErrorTag = "";
    cantNewErrors = "";
    errorType = "green";

    //Block4
    cantLotesConErrores = "";
    cantLotesConErroresUltimaVersion = "";

    //Chart
    chartData: any;
    chartOptions: any;

    constructor(private service: EkinDbReviewApiRestService, private configService: ConfigService, private translateService : TranslateService) {
    }

    ngOnInit() {
        this.loadCard1Data();
        this.loadCard2Data();
        this.loadCard3Data();
        this.loadCard4Data();
        this.initChart();
    }

    ngOnDestroy() {

    }

    loadCard1Data(): void {
        this.service.getDbEntriesToday().subscribe(data => {
            this.cantPesadasToday = data;
        }, error => {
            console.log(error);
        });
        this.configService.getConfig().subscribe((data: any) => {
            this.service.getPalletsProcessedInRangeDates(new Date(data.officialDbInitDate)).subscribe(data => {
                this.cantPesadasLastVersion = <string>data;
            }, error => {
                console.log(error);
            });
            this.service.getPalletsProcessedInRangeDates(new Date(data.lastSoftwareUpdateDate)).subscribe(data => {
                this.cantPesadasLastRevision = <string>data;
            }, error => {
                console.log(error);
            });
        });
    }

    loadCard2Data() {
        this.configService.getConfig().subscribe((data: any) => {
            this.service.getCountLotesProcesados(new Date(data.officialDbInitDate), new Date()).subscribe(data => {
                this.cantLotesProcesados = <string>data;
            }, error => {
                console.log(error);
            });
            this.service.getCountLotesProcesados(new Date(data.lastSoftwareUpdateDate), new Date()).subscribe(data => {
                this.cantLotesProcesadosUltimaRevision = <string>data;
            }, error => {
                console.log(error);
            });
        });
    }

    loadCard3Data() {
        this.configService.getConfig().subscribe((data: any) => {
            this.service.getCountErrorsInTag(new Date(data.officialDbInitDate), new Date()).subscribe(data => {
                this.cantErrorTag = <string>data;
            }, error => {
                console.log(error);
            });
            let tempDate = new Date();
            tempDate.setDate(tempDate.getDate());
            this.service.getCountErrorsInTag(new Date(data.lastSoftwareUpdateDate), tempDate).subscribe(data => {
                this.cantNewErrors = ((data - 5 == 0) ? '' : '+') + ((<number>data) - 5);
                this.errorType = (data - 5 == 0) ? 'green' : 'red';
            }, error => {
                console.log(error);
            });
        });

    }

    loadCard4Data() {
        this.configService.getConfig().subscribe((data: any) => {
            this.service.getCountLotesConErrores(new Date(data.lastSoftwareUpdateDate), new Date()).subscribe(data => {
                this.cantLotesConErrores = <string>data;
            }, error => {
                console.log(error);
            });
            this.service.getCountLotesConErrores(new Date(data.lastSoftwareUpdateDate), new Date()).subscribe(data => {
                this.cantLotesConErroresUltimaVersion = '+' + <string>data;
            }, error => {
                console.log(error);
            });
        });
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);

        let labels: string[] = [];
        let valuesLlenado: number[] = [];
        let valuesVaciado: number[] = [];
        let month: string[] = [];

        this.chartData = {
            labels: labels,
            datasets: []
        };

        this.translateService.get("primeng.monthNamesShort").subscribe(data=>{
            this.translateService.get("lang").subscribe(lang=>{
                month = data;
                this.service.countEntriesVaciadoOrLLenadoByDates(false).subscribe((dataLL: CountEntriesByDates[]) => {
                    this.service.countEntriesVaciadoOrLLenadoByDates(true).subscribe((dataV: CountEntriesByDates[]) => {
                        let mayor = dataV.length > dataLL.length ? dataV : dataLL;
                        mayor.forEach(p => {
                            labels.push(month[p.monthEntries - 1] + '-' + p.yearEntries);
                        });

                        for (let datum of dataLL) {
                            valuesLlenado.push(datum.cantidadRegistros);
                        }
                        this.chartData.datasets.push(
                            {
                                label: lang.toFully,
                                data: valuesLlenado,
                                fill: false,
                                backgroundColor: documentStyle.getPropertyValue('--blue-300'),
                                borderColor: documentStyle.getPropertyValue('--blue-300'),
                                tension: .4
                            },
                        );

                        for (let datum of dataV) {
                            valuesVaciado.push(datum.cantidadRegistros);
                        }
                        this.chartData.datasets.push(
                            {
                                label: lang.toEmpty,
                                data: valuesVaciado,
                                fill: false,
                                backgroundColor: documentStyle.getPropertyValue('--red-300'),
                                borderColor: documentStyle.getPropertyValue('--red-300'),
                                tension: .4
                            }
                        );
                        this.reloadChartData(documentStyle);
                    });
                });
            });
        })
        this.reloadChartData(documentStyle);
    }

    reloadChartData(documentStyle: CSSStyleDeclaration): void {
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }
}
