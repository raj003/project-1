import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { analyzeAndValidateNgModules } from '@angular/compiler';
//import { resolve } from 'url';
import 'rxjs/add/operator/toPromise';
import { ConfigsProvider } from '../configs/configs';

@Injectable()
export class JobsDataProvider {

  data: any;
  url: any;
  db_url: any;

  constructor(public http: HttpClient, private configs: ConfigsProvider) {
    this.data = null;
    this.url = 'assets/ionic-config.json'; // assigning the json directory
    this.callTheBaseUrl();
    
  }

  ionViewWillEnter() {
   
  }
  // to get the localhost url
  async callTheBaseUrl() {
    let baseUrl = await this.configs.loadJSON(this.url);
    this.db_url = baseUrl[0].db_url2; // from json file assigning the url value to the variable.
  }


  

  // to get the job details 
  getJobDetails() {
     //this.getTheDbUrl();
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.get(this.db_url + 'jobdetail', { headers: headers}) 
  }
  

}