import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { resolve } from 'path';


@Injectable()
export class ConfigsProvider {

  uri : string;
  dbUrl : any;
  url2: any;
  url: any;
  constructor(public http: HttpClient) {
    console.log('Hello ConfigsProvider Provider');

    this.uri = 'assets/ionic-config.json';
  }

  loadJSON(filePath) {
    const json = this.loadTextFileAjaxSync(filePath, "application/json");
    return JSON.parse(json);
  }

  loadTextFileAjaxSync(filePath, mimeType) {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    if (mimeType != null) {
        if (xmlhttp.overrideMimeType) {
            xmlhttp.overrideMimeType(mimeType);
        }
    }
    xmlhttp.send();
    if (xmlhttp.status == 200) {
        return xmlhttp.responseText;
    }
    else {
        return null;
    }
  }

  

}
