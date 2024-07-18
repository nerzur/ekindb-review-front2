import {Component, OnInit} from '@angular/core';
import {ConfigService} from "../../service/config.service";
import {EkinDbReviewApiRestService} from "../../service/ekin-db-review-api-rest.service";
import {Searchable} from "../../api/Searchable";
import {ConfirmationService, MessageService} from "primeng/api";
import {UpdateLote} from "../../api/UpdateLote";
import {TranslateService} from "@ngx-translate/core";

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

    visible: boolean = false;

    constructor(private configService : ConfigService,
                private translateService : TranslateService,
                private service : EkinDbReviewApiRestService,
                private confirmationService: ConfirmationService,
                private messageService : MessageService) {
    }

    ngOnInit(): void {
        this.visible = true;
        this.configService.getConfig().subscribe((data: any) => {
            this.service.findLotes(new Date(data.lastSoftwareUpdateDate)).subscribe(data => {
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
        if(!this.isFormInvalid){
            let tags = [];
            this.selectedTags.forEach(e=>{
                tags.push(e.name);
            });
            let updateLote = new UpdateLote(tags, this.prevLoteSelected[0].name, this.newLoteSelected[0].name, !this.isLlenado)

            this.service.updateLote(updateLote, true).subscribe(data=>{
                this.translateService.get("lang").subscribe(langData =>{
                    this.confirmationService.confirm({
                        message: langData.modifyDialog1 + data.length + langData.modifyDialog2,
                        header: langData.alertHeader,
                        icon: 'pi pi-exclamation-triangle',
                        acceptIcon:"none",
                        acceptLabel: langData.yes,
                        rejectLabel: langData.no,
                        rejectIcon:"none",
                        rejectButtonStyleClass:"p-button-text",

                        accept: () => {
                            this.service.updateLote(updateLote, false).subscribe(any=>{
                                this.prevLoteSelected = [];
                                this.newLoteSelected = [];
                                this.selectedTags = [];
                                this.availableTags = [];
                                this.messageService.add({ severity: 'success', summary: langData.successHeader, detail: langData.successMessage });
                            }, error => {
                                this.messageService.add({ severity: 'error', summary: langData.errorHeader, detail: langData.errorMessage });
                            });
                        },
                        reject: () => {
                            this.messageService.add({ severity: 'error', summary: langData.cancelledHeader, detail: langData.cancelledMessage, life: 3000 });
                        }
                    });
                })
            });
        }
    }
}
