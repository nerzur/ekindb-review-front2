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
    apiRestDirection: string = environment.apiServerURL + "/api/ekinsadb-review-service/v1";

    /**With docker**/
    // apiRestDirection: string = "http://10.10.17.0:8091";

    constructor(private http: HttpClient, private datePipe: DatePipe) {
    }

    getDbEntries(): Observable<any> {
        return this.http.get(this.apiRestDirection + "/pesajesLinea");
    }

    getDbEntriesToday(): Observable<any> {
        return this.http.get(this.apiRestDirection + "/pesajesLinea/pesajesToday");
    }

    getPalletsProcessedInRangeDates(startDate: Date): Observable<any> {
        return this.http.get(this.apiRestDirection + "/pesajesLinea/countPesajesAfterDate?startDate="
            + this.convertDate(startDate, this.dateFormat));
    }

    getErrorsByDates(startDate: Date, endDate: Date): Observable<any> {
        // return this.http.get(this.apiRestDirection + "/pesajesLinea/listAllPesajesWithErrorsInZoneByDates?startDate="
        return this.http.get(this.apiRestDirection + "/pesajesLinea/pesajesErroresZonaInRangeDate?startDate="
            + this.convertDate(startDate, this.dateFormat) + "&endDate="
            + this.convertDate(endDate, this.dateFormat));
    }

    getCountLotesProcesados(startDate: Date, endDate: Date): Observable<any> {
        return this.http.get(this.apiRestDirection + "/pesajesLinea/countLotesByDates?startDate="
            + this.convertDate(startDate, this.dateFormat) + "&endDate="
            + this.convertDate(endDate, this.dateFormat));
    }

    getCountLotesConErrores(startDate: Date, endDate: Date): Observable<any> {
        return this.http.get(this.apiRestDirection + "/pesajesLinea/countLotesWithErrorsInTagByDates?startDate="
            + this.convertDate(startDate, this.dateFormat) + "&endDate="
            + this.convertDate(endDate, this.dateFormat));
    }

    getCountErrorsInTag(startDate: Date, endDate: Date): Observable<any> {
        return this.http.get(this.apiRestDirection + "/pesajesLinea/countErrorsInTagByDates?startDate="
            + this.convertDate(startDate, this.dateFormat) + "&endDate="
            + this.convertDate(endDate, this.dateFormat));
    }

    getRegistriesByTag(tag: string): Observable<any> {
        return this.http.get(this.apiRestDirection + "/pesajesLinea/findEkPesajesLineaByTag?tag=" + tag);
    }

    CountEntriesByDates(): Observable<any> {
        return this.http.get(this.apiRestDirection + "/pesajesLinea/countEntriesByDates");
    }

    countEntriesVaciadoOrLLenadoByDates(isVaciado: boolean): Observable<any> {
        return this.http.get(this.apiRestDirection + "/pesajesLinea/countEntriesVaciadoOrLLenadoByDates/" + isVaciado);
    }

    convertDate(date: Date, format: string): string {
        return <string>this.datePipe.transform(date, format)
    }

    findTagsByNumeroLote(numeroLote: string, isVaciado: boolean): Observable<any> {
        return this.http.get(this.apiRestDirection + "/pesajesLinea/findTagsByNúmeroLote?numeroLote="
            + numeroLote + "&isVaciado=" + isVaciado);
    }

    updateLote(updateLote: UpdateLote, isTest: boolean):Observable<any>{
        let testString = isTest ? "testU" : "u";
        return this.http.post(this.apiRestDirection + "/pesajesLinea/" + testString + "pdateLote", updateLote);
    }

    findLotes(startDate: Date):Observable<any>{
        return this.http.get(this.apiRestDirection + "/pesajesLinea/findNumeroLoteByDate?startDate="
            + this.convertDate(startDate, this.dateFormat) + "&endDate="
            + this.convertDate(new Date(Date.now()), this.dateFormat));
    }

    getCurrentDate(): string {
        return <string>this.datePipe.transform(Date.now(), this.dateFormat);
    }


}
