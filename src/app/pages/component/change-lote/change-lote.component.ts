import {Component, OnInit} from '@angular/core';
import {ConfigService} from "../../service/config.service";
import {EkinDbReviewApiRestService} from "../../service/ekin-db-review-api-rest.service";
import {Searchable} from "../../api/Searchable";
import {ConfirmationService, MessageService} from "primeng/api";
import {UpdateLote} from "../../api/UpdateLote";

declare const require: (path: string) => any;

@Component({
    selector: 'change-lote',
    templateUrl: './change-lote.component.html',
    styleUrl: './change-lote.component.scss'
})
export class ChangeLoteComponent implements OnInit {

    public isLlenado: boolean = true;
    public invalidClass: string;
    public isFormInvalid: boolean = true;

    public loteList: Searchable[] = [];

    public prevLoteSelected = [];
    public newLoteSelected = [];

    public availableTags: Searchable[] = [];
    public selectedTags: Searchable[] = [];

    public lang = require('../../../../assets/lang/es.json');

    visible: boolean = false;

    constructor(private configService : ConfigService,
                private service : EkinDbReviewApiRestService,
                private confirmationService: ConfirmationService,
                private messageService : MessageService) {
    }

    ngOnInit(): void {
        this.visible = true;
        this.configService.getConfig().subscribe((data: any) => {
            this.service.findLotes(new Date(data.lastEkinsaSoftwareInstallDate)).subscribe(data => {
                this.loteList = [];
                data.forEach((e: string) => {
                    this.loteList.push(new Searchable(e));
                });
            })
        });
    }

    searchTagsByLote() {
        if (this.prevLoteSelected.length > 0)
            this.service.findTagsByNumeroLote(this.prevLoteSelected[0].name, !this.isLlenado).subscribe(data => {
                this.availableTags = [];
                this.selectedTags = [];
                data.forEach((e: string) => {
                    this.availableTags.push(new Searchable(e))
                });
            });
        else {
            this.availableTags = [];
            this.selectedTags = [];
        }
    }

    validateIfLoteSelectedIsNotEquals() {
        if (this.prevLoteSelected.length > 0 && this.newLoteSelected.length > 0) {
            if(this.prevLoteSelected[0].name == this.newLoteSelected[0].name){
                this.writeInvalidClass(true);
                this.isFormInvalid = true;
            }
            else {
                this.writeInvalidClass(false);
                this.isFormInvalid = false;
            }
        } else{
            this.writeInvalidClass(true);
            this.isFormInvalid = true;
        }
    }

    writeInvalidClass(state: boolean) {
        this.invalidClass = state ? "ng-dirty ng-invalid" : "";
    }

    execute(){
        let tags = [];
        this.selectedTags.forEach(e=>{
            tags.push(e.name);
        });
        let updateLote = new UpdateLote(tags, this.prevLoteSelected[0].name, this.newLoteSelected[0].name, !this.isLlenado)

        this.service.updateLote(updateLote, true).subscribe(data=>{
            this.confirmationService.confirm({
                message: this.lang.modifyDialog1 + data.length + this.lang.modifyDialog2,
                header: this.lang.alertHeader,
                icon: 'pi pi-exclamation-triangle',
                acceptIcon:"none",
                acceptLabel: this.lang.yes,
                rejectLabel: this.lang.no,
                rejectIcon:"none",
                rejectButtonStyleClass:"p-button-text",

                accept: () => {
                    this.service.updateLote(updateLote, false).subscribe(data=>{
                        this.prevLoteSelected = [];
                        this.newLoteSelected = [];
                        this.selectedTags = [];
                        this.availableTags = [];
                        this.messageService.add({ severity: 'success', summary: this.lang.successHeader, detail: this.lang.successMessage });
                    }, error => {
                        this.messageService.add({ severity: 'error', summary: this.lang.errorHeader, detail: this.lang.errorMessage });
                    });
                },
                reject: () => {
                    this.messageService.add({ severity: 'error', summary: this.lang.cancelledHeader, detail: this.lang.cancelledMessage, life: 3000 });
                }
            });
        });




    }
}
