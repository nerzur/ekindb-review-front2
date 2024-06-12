import {Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDTO} from "../api/UserDTO";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    apiRestDirection: string = "http://localhost:8090/api/user-service/v1/user";

    constructor(private http: HttpClient) {
    }

    getAuthUserInformation(): Observable<any> {
        return this.http.get(this.apiRestDirection)
    }

    changeUserInformation(newUserInformation: UserDTO) : Observable<any>{
        return this.http.post(this.apiRestDirection + "/changeUserInformation", newUserInformation);
    }
}
