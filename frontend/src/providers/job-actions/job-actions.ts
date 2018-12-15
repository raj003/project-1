import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigsProvider } from '../configs/configs';
import {DatePipe} from '@angular/common';
import { AuthService } from '../../services/auth.service';
import {Http, Headers} from '@angular/http';


@Injectable()
export class JobActionsProvider {

  jobslist: any;
  failedjoblist: any;
  savedjoblist: any;
  url : string; // config file address
  db_url: any;  // assign the db url
  content = ''
  date: any;
  profile: any;
  
  constructor(public http: HttpClient, private configs: ConfigsProvider, private datePipe: DatePipe, 
    private authService: AuthService) {
    this.jobslist = null;
    this.failedjoblist = null;
    this.savedjoblist = null;
    this.url = 'assets/ionic-config.json';
    this.callTheDbUrl();    // calls the method as class is intiated
    
  }
  IonViewDidEnter() {
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    let data = {
      data1: 'hello'
    }
    console.log(data);
    this.http.post('http://localhost:3000/api/hello', data, {headers: headers})
  }
  
  // here we get the localhost url from the config file.
  async callTheDbUrl() {
    let baseUrl = await this.configs.loadJSON(this.url);
    this.db_url = baseUrl[0].db_url2;
    console.log(this.db_url);
  }

  //posting the applied jobs
  async addJobList(jobitem) {
    let appliedDate = await this.dateAndTime();
    let userId = await this.profileId();
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    let selected = {
      companyTitle : jobitem.company,
      jobTitle : jobitem.jobtitle,
      location : jobitem.location,
      date: appliedDate,
      id: userId
    }
    console.log(selected);
    return this.http.post(this.db_url + 'jobApplied', selected,{headers: headers})
    //return this.http.post('http://192.168.0.102:3000/api/jobApplied',selected,{headers: headers}) 
  }

  // getting the applied jobs
  getAppliedjobList(userId) {
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    console.log(this.db_url);
    return this.http.get(this.db_url + 'jobApplied/' + userId,{headers: headers})
    
  }

  // getting the failed jobs
  getfailedjobList(profileId) {
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.get(this.db_url + 'failedjobs/' + profileId,{headers: headers})
    
  }


  // adding failed jobs
  async addfailedJobList(jobitem) {
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    var failed = {
      companyTitle : jobitem.company,
      jobTitle : jobitem.jobtitle,
      location : jobitem.location,
      date: await this.dateAndTime(),
      id: await this.profileId()
    }
    console.log(failed);
    console.log(this.db_url);
    //return this.http.post(this.db_url + 'failedjobs', failed,{headers: headers})
    return this.http.post(this.db_url + 'failedjobs',failed, {headers: headers})

  }
  

  // posting saved jobs
  addSavedjobList(jobdetails) {
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    let saveddetails = {
      companyTitle: jobdetails.company,
      jobTitle : jobdetails.jobtitle,
      location : jobdetails.location
    }
    console.log(saveddetails); 
    return this.http.post(this.db_url + 'savedjobslist', saveddetails,{headers: headers})
    
  } 


  // getting saved jobs
  getSavedjoblslist() {
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.get(this.db_url + 'savedjobslist', { headers: headers})
    
  }

  // get the date and time
  dateAndTime() {
    return new Promise((resolve) => {
      let date = new Date();
      var month = date.getMonth() + 1;
      let moment = date.getDate()+ '-'+ month + '-'+ date.getFullYear()+'-'+ date.getHours()+'-'+ date.getMinutes();
      console.log(moment);
      resolve(moment)
    })
  }

  // get the profile id from the auth services.
  profileId() {
    return new Promise((resolve) => {
      this.authService.getProfile().subscribe((profile: any) => {
        let userId = profile.user._id;
        resolve(userId)
      },(error : any) => {
        console.log('err in getting profile ' +error);
      })
    })
  }

  
}
