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
    apiRestDirection: string = environment.apiServerURL + "/api/ekinsadb-review-service/v1/pesajesLinea";

    /**With docker**/
    // apiRestDirection: string = "http://10.10.17.0:8091";

    constructor(private http: HttpClient, private datePipe: DatePipe) {
    }

    getDbEntries(): Observable<any> {
        return this.http.get(this.apiRestDirection);
    }

    getDbEntriesToday(): Observable<any> {
        return this.http.get(this.apiRestDirection + "/pesajesToday");
    }

    getPalletsProcessedInRangeDates(startDate: Date): Observable<any> {
        return this.http.get(this.apiRestDirection + "/countPesajesAfterDate?startDate="
            + this.convertDate(startDate, this.dateFormat));
    }

    getErrorsByDates(startDate: Date, endDate: Date): Observable<any> {
        // return this.http.get(this.apiRestDirection + "/listAllPesajesWithErrorsInZoneByDates?startDate="
        return this.http.get(this.apiRestDirection + "/pesajesErroresZonaInRangeDate?startDate="
            + this.convertDate(startDate, this.dateFormat) + "&endDate="
            + this.convertDate(endDate, this.dateFormat));
    }

    getCountLotesProcesados(startDate: Date, endDate: Date): Observable<any> {
        return this.http.get(this.apiRestDirection + "/countLotesByDates?startDate="
            + this.convertDate(startDate, this.dateFormat) + "&endDate="
            + this.convertDate(endDate, this.dateFormat));
    }

    getCountLotesConErrores(startDate: Date, endDate: Date): Observable<any> {
        return this.http.get(this.apiRestDirection + "/countLotesWithErrorsInTagByDates?startDate="
            + this.convertDate(startDate, this.dateFormat) + "&endDate="
            + this.convertDate(endDate, this.dateFormat));
    }

    getCountErrorsInTag(startDate: Date, endDate: Date): Observable<any> {
        return this.http.get(this.apiRestDirection + "/countErrorsInTagByDates?startDate="
            + this.convertDate(startDate, this.dateFormat) + "&endDate="
            + this.convertDate(endDate, this.dateFormat));
    }

    getRegistriesByTag(tag: string): Observable<any> {
        return this.http.get(this.apiRestDirection + "/findEkPesajesLineaByTag?tag=" + tag);
    }

    CountEntriesByDates(): Observable<any> {
        return this.http.get(this.apiRestDirection + "/countEntriesByDates");
    }

    countEntriesVaciadoOrLLenadoByDates(isVaciado: boolean): Observable<any> {
        return this.http.get(this.apiRestDirection + "/countEntriesVaciadoOrLLenadoByDates/" + isVaciado);
    }

    convertDate(date: Date, format: string): string {
        return <string>this.datePipe.transform(date, format)
    }

    findTagsByNumeroLote(numeroLote: string, isVaciado: boolean): Observable<any> {
        return this.http.get(this.apiRestDirection + "/findTagsByNúmeroLote?numeroLote="
            + numeroLote + "&isVaciado=" + isVaciado);
    }

    updateLote(updateLote: UpdateLote, isTest: boolean):Observable<any>{
        let testString = isTest ? "testU" : "u";
        return this.http.post(this.apiRestDirection + "/update/" + testString + "pdateLote", updateLote);
    }

    findLotes(startDate: Date):Observable<any>{
        return this.http.get(this.apiRestDirection + "/findNumeroLoteByDate?startDate="
            + this.convertDate(startDate, this.dateFormat) + "&endDate="
            + this.convertDate(new Date(Date.now()), this.dateFormat));
    }

    getCurrentDate(): string {
        return <string>this.datePipe.transform(Date.now(), this.dateFormat);
    }


}
