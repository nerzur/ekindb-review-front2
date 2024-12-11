import {Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import {DatePipe} from "@angular/common";
import {CountEntriesByDates} from "../api/countEntriesByDates";
import {UpdateLote} from "../api/UpdateLote";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class EkinDbReviewApiRestService {

    dateFormat: string = 'yyyy-MM-dd';
    /**Without docker**/
    apiRestURL: string = environment.apiServerURL + "/api/ekinsadb-review-service/v1";

    pesajesLineaApiUrl: string = this.apiRestURL + "/pesajesLinea";
    bufferApiURL : string =  this.apiRestURL + "/buffer";

    /**With docker**/
    // pesajesLineaApiUrl: string = "http://10.10.17.0:8091";

    constructor(private http: HttpClient, private datePipe: DatePipe) {
    }

    getDbEntries(): Observable<any> {
        return this.http.get(this.pesajesLineaApiUrl);
    }

    getDbEntriesToday(): Observable<any> {
        return this.http.get(this.pesajesLineaApiUrl + "/pesajesToday");
    }

    getPalletsProcessedInRangeDates(startDate: Date): Observable<any> {
        return this.http.get(this.pesajesLineaApiUrl + "/countPesajesAfterDate?startDate="
            + this.convertDate(startDate, this.dateFormat));
    }

    getErrorsByDates(startDate: Date, endDate: Date): Observable<any> {
        // return this.http.get(this.pesajesLineaApiUrl + "/listAllPesajesWithErrorsInZoneByDates?startDate="
        return this.http.get(this.pesajesLineaApiUrl + "/pesajesErroresZonaInRangeDate?startDate="
            + this.convertDate(startDate, this.dateFormat) + "&endDate="
            + this.convertDate(endDate, this.dateFormat));
    }

    getCountLotesProcesados(startDate: Date, endDate: Date): Observable<any> {
        return this.http.get(this.pesajesLineaApiUrl + "/countLotesByDates?startDate="
            + this.convertDate(startDate, this.dateFormat) + "&endDate="
            + this.convertDate(endDate, this.dateFormat));
    }

    getCountLotesConErrores(startDate: Date, endDate: Date): Observable<any> {
        return this.http.get(this.pesajesLineaApiUrl + "/countLotesWithErrorsInTagByDates?startDate="
            + this.convertDate(startDate, this.dateFormat) + "&endDate="
            + this.convertDate(endDate, this.dateFormat));
    }

    getCountErrorsInTag(startDate: Date, endDate: Date): Observable<any> {
        return this.http.get(this.pesajesLineaApiUrl + "/countErrorsInTagByDates?startDate="
            + this.convertDate(startDate, this.dateFormat) + "&endDate="
            + this.convertDate(endDate, this.dateFormat));
    }

    getRegistriesByTag(tag: string): Observable<any> {
        return this.http.get(this.pesajesLineaApiUrl + "/findEkPesajesLineaByTag?tag=" + tag);
    }

    CountEntriesByDates(): Observable<any> {
        return this.http.get(this.pesajesLineaApiUrl + "/countEntriesByDates");
    }

    countEntriesVaciadoOrLLenadoByDates(isVaciado: boolean): Observable<any> {
        return this.http.get(this.pesajesLineaApiUrl + "/countEntriesVaciadoOrLLenadoByDates/" + isVaciado);
    }

    convertDate(date: Date, format: string): string {
        return <string>this.datePipe.transform(date, format)
    }

    findTagsByNumeroLote(numeroLote: string, isVaciado: boolean): Observable<any> {
        return this.http.get(this.pesajesLineaApiUrl + "/findTagsByNúmeroLote?numeroLote="
            + numeroLote + "&isVaciado=" + isVaciado);
    }

    updateLote(updateLote: UpdateLote, isTest: boolean):Observable<any>{
        let testString = isTest ? "testU" : "u";
        return this.http.post(this.pesajesLineaApiUrl + "/update/" + testString + "pdateLote", updateLote);
    }

    findLotes(startDate: Date):Observable<any>{
        return this.http.get(this.pesajesLineaApiUrl + "/findNumeroLoteByDate?startDate="
            + this.convertDate(startDate, this.dateFormat) + "&endDate="
            + this.convertDate(new Date(Date.now()), this.dateFormat));
    }

    getBufferVaciado(): Observable<any>{
        return this.http.get(this.bufferApiURL + "/bufferVaciado");
    }

    getBufferLlenado(): Observable<any>{
        return this.http.get(this.bufferApiURL + "/bufferLlenado");
    }

    getCurrentDate(): string {
        return <string>this.datePipe.transform(Date.now(), this.dateFormat);
    }


}
