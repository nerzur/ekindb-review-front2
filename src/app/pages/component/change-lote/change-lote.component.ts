import {Component, OnInit} from '@angular/core';
import {ConfigService} from "../../service/config.service";
import {EkinDbReviewApiRestService} from "../../service/ekin-db-review-api-rest.service";
import {Searchable} from "../../api/Searchable";
import {MessageService} from "primeng/api";
import {UpdateLote} from "../../api/UpdateLote";

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

    constructor(private configService : ConfigService,
                private service : EkinDbReviewApiRestService,
                private messageService : MessageService) {
    }

    ngOnInit(): void {
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
        this.service.updateLote(updateLote, false).subscribe(data=>{
            this.prevLoteSelected = [];
            this.newLoteSelected = [];
            this.selectedTags = [];
            this.availableTags = [];
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The operation has be execute successfully.' });
        }, error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'One error has been occurred.' });
        });
    }
}
