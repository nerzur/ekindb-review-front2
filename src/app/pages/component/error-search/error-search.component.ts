import {Component, OnInit} from '@angular/core';
import {EntriesList} from "../../api/EntriesList";
import {EK_PesajeLinea} from "../../api/EK_PesajeLinea";
import {EkinDbReviewApiRestService} from "../../service/ekin-db-review-api-rest.service";
import {ConfigService} from "../../service/config.service";
import {DatePipe} from "@angular/common";
import {MessageService, PrimeNGConfig} from "primeng/api";
import * as FileSaver from 'file-saver';
import {Entry} from "../../api/Entry";


interface ExportColumn {
    title: string;
    dataKey: string;
}

interface ExportData {
    group: number;
    tag: string;
    zone: string;
    weigth: string;
    date: Date;
    lote: String;
}

@Component({
  selector: 'app-error-search',
  templateUrl: './error-search.component.html',
  styleUrl: './error-search.component.scss'
})
export class ErrorSearchComponent implements OnInit{

    entriesList: EntriesList[] = [];
    loading: boolean = false;
    dateRange: Date[] = [];
    datesMinMax: Date[] = [];
    dialogVisible: boolean = false;

    tagDialogHeader = "";
    dialogEntries: EK_PesajeLinea[] = [];
    loadingDialog: boolean = false;
    exportColumns!: ExportColumn[];
    exportData: ExportData[] = [];

    constructor(private service: EkinDbReviewApiRestService,
                private configService: ConfigService,
                private datePipe: DatePipe,
                private primeConfig: PrimeNGConfig,
                private messageService: MessageService) {
    }

    getExportData(): ExportData[] {
        for (let i = 0; i < this.entriesList.length; i++) {
            for (let entry of this.entriesList[i].entriesList) {
                let exportData: ExportData = {
                    group: i,
                    tag: this.entriesList[i].tag,
                    zone: entry.zone,
                    weigth: entry.weigth,
                    date: entry.date,
                    lote: entry.lote
                };
                this.exportData.push(exportData);
            }
        }
        return this.exportData;
    }


    ngOnInit(): void {
        let minDate = new Date();
        this.configService.getConfig().subscribe((data: any) => {
            minDate = new Date(data.lastEkinsaSoftwareInstallDate);
            minDate.setDate(minDate.getDate() + 1);
            this.datesMinMax.push(minDate, new Date());
            this.dateRange = [new Date('2023-08-24'), new Date()];
            this.searchDb();
        }, error => {
            console.log(error);
        });

        this.primeConfig.setTranslation({
            today: "Hoy",
            clear: "Limpiar",
            monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            dayNamesMin: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
        });
    }

    searchDb() {
        if (this.dateRange.length != 2) {
            console.log("ERRORS IN FORM");
            return;
        }
        this.loading = true;
        this.service.getErrorsByDates(this.dateRange[0], this.dateRange[1]).subscribe(data => {
            this.entriesList = data;
            this.loading = false;
            this.messageService.add({
                severity: this.entriesList.length == 0 ? 'success' : 'warn',
                summary: this.entriesList.length == 0 ? 'Success' : 'Warning',
                detail: this.entriesList.length == 0 ? 'No se han detectado errores en los Tags' : 'Se han detectado ' + this.entriesList.length + ' tags con errores.'
            });
        }, error => {
            console.log(error);
            this.loading = false;
        });
    }

    missingZone(entries: Entry[]) {
        if (entries == null)
            return "";
        let line1: number = 0;
        let line2: number = 0;
        for (let entry of entries) {
            switch (parseInt(entry.zone)) {
                case 1:
                    line1++;
                    break;
                case 2:
                    line1--;
                    break;
                case 3:
                    line2++;
                    break;
                case 4:
                    line2--;
                    break;
                default:
            }
        }
        return Math.abs(line1 - line2);
    }

    showDialog(tag: string) {
        this.tagDialogHeader = tag;
        this.dialogVisible = true;
        this.loadingDialog = true;
        this.service.getRegistriesByTag(tag).subscribe(data => {
            this.dialogEntries = data;
            this.loadingDialog = false;
        }, error => {
            console.log(error);
        })
    }

    exportPdf() {
        let PDF_EXTENSION = '.pdf';
        import('jspdf').then((jsPDF) => {
            import('jspdf-autotable').then((x) => {
                const doc = new jsPDF.default('p', 'px', 'a4');
                (doc as any).autoTable(this.exportColumns, this.getExportData());
                doc.save('EntriesWithErrors_export_'+ new Date().getTime() + PDF_EXTENSION);
            });
        });
    }

    exportExcel() {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(this.getExportData());
            const workbook = {Sheets: {data: worksheet}, SheetNames: ['data']};
            const excelBuffer: any = xlsx.write(workbook, {bookType: 'xlsx', type: 'array'});
            this.saveAsExcelFile(excelBuffer, 'EntriesWithErrors');
        });
    }

    saveAsExcelFile(buffer
                        :
                        any, fileName
                        :
                        string
    ):
        void {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data
            :
            Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }

}
