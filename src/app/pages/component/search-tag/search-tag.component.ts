import { Component } from '@angular/core';
import {EK_PesajeLinea} from "../../api/EK_PesajeLinea";
import {EkinDbReviewApiRestService} from "../../service/ekin-db-review-api-rest.service";

@Component({
  selector: 'app-search-tag',
  templateUrl: './search-tag.component.html',
  styleUrl: './search-tag.component.scss'
})
export class SearchTagComponent {

    registryList: EK_PesajeLinea[] = [];
    tagForm = "";
    loading = false;
    tagNumber: RegExp = /^E00[A-Z0-9]{13}$/;

    constructor(private service: EkinDbReviewApiRestService) {
    }

    searchDb() {
        this.loading = true;
        this.service.getRegistriesByTag(this.tagForm).subscribe(data => {
            this.registryList = data;
            this.loading = false;
        }, error => {
            console.log(error);
        })
    }

    validateRegex(){
        return this.tagNumber.test(this.tagForm);
    }
}
