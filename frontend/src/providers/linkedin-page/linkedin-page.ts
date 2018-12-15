import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ConfigsProvider } from '../configs/configs';


@Injectable()
export class LinkedinPageProvider {

  url: string; // config file address
  db_url: any;  // assign the db url
  linkedinOauthUrl : any;

  constructor(public http: HttpClient, private configs: ConfigsProvider) {
    console.log('Hello LinkedinPageProvider Provider');

    // // to get the DB url from ionic-config file
    // this.http.get(this.url).subscribe((data: any) =>{
    //   //console.log(data[0].db_url2);
    //   this.db_url = data[0].db_url2;
    // })
    this.url = 'assets/ionic-config.json'; // assigning the json directory
    this.callTheBaseUrl();
  }

  // to get the api response(profile data) from linkedin
  gettheLinkedinUserDetails(token: any): Observable<any> {
    alert(token);
    let headers = new HttpHeaders();
    //headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization','Bearer '+token);
    return this.http.get(this.linkedinOauthUrl + '' + token,{headers: headers})
    
  }

  // sending linkedin profile data to database
  postLinkedinData(profileData) {
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post(this.db_url + 'linkedinuser',profileData,{headers: headers})
    
  }

  // facebook details to db -------------------------
  //posting facebook data ---------------------------------------
  postFacebookData(fbData) {
    alert(fbData.email);
    //let headers = new HttpHeaders();
    //headers.append('Content-Type','application/json');
    return this.http.post(this.db_url + 'facebookuser',fbData)
  }
  // to get the localhost url
  async callTheBaseUrl() {
    let baseUrl = await this.configs.loadJSON(this.url);
    this.db_url = baseUrl[0].db_url2;
    this.linkedinOauthUrl = baseUrl[0].linkedinOauthUrl; // linkedin oAuth url
  }

}
