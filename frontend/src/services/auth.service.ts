import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
//import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
// import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/take';
import { ConfigsProvider } from '../providers/configs/configs';
//import * as dbUrl from '../assets/ionic-config.json';



@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  uri: string = 'http://localhost:8100/#/reset';
  url: string; // config file address
  db_url: any;
  db_url2: any;

  constructor(private http:Http, private configs: ConfigsProvider) {
    
    this.url = 'assets/ionic-config.json'; // assigning the json directory
    this.callTheBaseUrl();
   }

   // to get the localhost url
  async callTheBaseUrl() {
    let baseUrl = await this.configs.loadJSON(this.url);
    this.db_url2 = baseUrl[0].db_url2; // from json file assigning the url value to the variable.
    this.db_url = baseUrl[0].db_url;
  }
   

  registerUser(user) {
    let headers = new Headers();
    console.log(headers,user);
    headers.append('Content-Type','application/json');
    //return this.http.post('http://192.168.0.100:3000/users/register', user,{headers: headers})
    return this.http.post(this.db_url + 'register',user,{headers: headers})
     .map(res => res.json());
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //return this.http.post('http://192.168.0.100:3000/users/authenticate', user,{headers: headers})
    return this.http.post(this.db_url + 'authenticate',user,{headers: headers})
      .map(res => res.json());
  }
  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    //console.log(this.authToken);
    //return this.http.get('http://192.168.0.100:3000/users/profile',{headers: headers})
    return this.http.get(this.db_url + 'profile',{headers: headers})
      .map(res => res.json());
  }
  
  updateUserData(user) {
    let headers = new Headers();
    console.log(headers,user);
    headers.append('Content-Type','application/json');
    //return this.http.put('http://192.168.0.104:3000/api/user/' + user._id, user,{headers: headers})
    return this.http.put(this.db_url2 + user._id, user,{headers: headers})
      .map(res => res.json());
  }

 loadToken(){
   const token = localStorage.getItem('id_token');
   this.authToken = token;
 }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  // for mail verification
  forgotpasswordMail(email) {
    console.log(email);
    let emailId = {
      email: email
    }
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.db_url2 +'forgot',emailId,{headers: headers})
    // return this.http.post('http://192.168.0.104:3000/api/forgot',emailId,{headers: headers})
    .map(res => res.json());
  }
// password reset functionality


  // getPassword(tokenData) {
  //   let headers = new Headers();
  //   //console.log(passwordData);
  //   headers.append('Content-Type','application/json');
  //   return this.http.get('http://localhost:8100/api/reset/' + tokenData,{headers: headers})
  //   .map(res => res.json());
  // }


  loggedIn(){

  //  return tokenNotExpired();
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
  // to update the user profile
  updateProfile(userProfiledata) {
    let headers = new Headers();
    //console.log(headers,user);
    headers.append('Content-Type','application/json');
    return this.http.put(this.db_url + 'profile/'+userProfiledata._id, userProfiledata,{headers: headers})
    //return this.http.put('http://192.168.0.104:3000/api/profile/' + userProfiledata._id, userProfiledata,{headers: headers})
      .map(res => res.json());
  }

  // delete the user
  deleteUser(userId) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.delete(this.db_url + 'register/' +userId,{headers: headers})
    //return this.http.delete('http://192.168.0.104:3000/users/register/' + userId,{headers: headers})
    .map(res => res.json());

  }

  resetPassword(passwordData) {
    let headers = new Headers();
    console.log(passwordData);
    headers.append('Content-Type','application/json');
    return this.http.put(this.db_url2 +'reset/' +passwordData.token,passwordData,{headers:headers})
    //return this.http.put('http://192.168.0.104:3000/users/reset/'+passwordData.token,passwordData,{headers:headers})
    .map(res => res.json());
  }

  // send and receive the messages from the dialogflow
  dialogflow(queryData) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.db_url2 + 'dialogflow',queryData,{headers: headers})
    //return this.http.post('http://192.168.0.104:3000/api/dialogflow',queryData,{headers: headers})
    .map(res => res.json());
  }

}
