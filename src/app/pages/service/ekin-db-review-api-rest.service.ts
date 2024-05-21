import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DatePipe} from "@angular/common";
import {CountEntriesByDates} from "../api/countEntriesByDates";

@Injectable({
    providedIn: 'root'
})
export class EkinDbReviewApiRestService {

    dateFormat: string = 'yyyy-MM-dd';
    /**Without docker**/
    apiRestDirection : string = "http://localhost:8090/api/ekinsadb-review-service/v1";

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

    convertDate(date: Date, format: string): string {
        return <string>this.datePipe.transform(date, format)
    }

    getCurrentDate() : string{
        return <string>this.datePipe.transform(Date.now(),this.dateFormat);
    }


}
