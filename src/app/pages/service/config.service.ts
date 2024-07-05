import {Injectable, OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ConfigService{

  private configuracionUrl = 'assets/config.json';

  constructor(private http: HttpClient) { }

  getConfig(){
    return this.http.get(this.configuracionUrl);
  }
}
