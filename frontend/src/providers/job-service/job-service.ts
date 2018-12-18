import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigsProvider } from '../configs/configs';
import { AuthService } from '../../services/auth.service';



@Injectable()
export class JobServiceProvider {

  url : string; // config file address
  db_url: any;  // assign the db url

  constructor(public http: HttpClient,private configs: ConfigsProvider, private authService: AuthService) {
    console.log('Hello JobServiceProvider Provider');
    this.url = 'assets/ionic-config.json';
    this.callTheDbUrl();
  }

  async callTheDbUrl() {
    let baseUrl = await this.configs.loadJSON(this.url);
    this.db_url = baseUrl[0].db_url2;
    console.log(this.db_url);
  }

  // to get the user Id 
  profileId() {
    return new Promise((resolve) => {
      this.authService.getProfile().subscribe((profile: any) => {
        let userId = profile.user._id;
        resolve(userId)
      },(error : any) => {
        console.log('err in getting profile ' +error);
      });
    });
  }

  // get the date and time
  dateAndTime() {
    return new Promise((resolve) => {
      let date = new Date();
      var month = date.getMonth() + 1;
      let moment = date.getDate()+ '-'+ month + '-'+ date.getFullYear()+'-'+ date.getHours()+'-'+ date.getMinutes();
      console.log(moment);
      resolve(moment)
    });
  }

  // post the applied jobs 
  async postAppliedJob(jobItem) {
    let date = await this.dateAndTime();
    let userId = await this.profileId();
    let job = {
      companyTitle: jobItem.company,
      jobTitle: jobItem.jobtitle,
      location: jobItem.location,
      AppliedDate: date,
      userId: userId
    }
    console.log(job);
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    this.http.post(this.db_url + 'joblist',job,{headers: headers});
  }

  //post the failed job
  async postFailedJob(jobItem) {
    let date = await this.dateAndTime();
    let userId = await this.profileId();
    let job = {
      companyTitle: jobItem.company,
      jobTitle: jobItem.jobtitle,
      location: jobItem.location,
      AppliedDate: date,
      userId: userId
    }
    console.log(job);
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    this.http.post(this.db_url + 'failjoblist',job,{headers: headers});
  }

  // post the saved job
  async postSavedJob(jobItem) {
    let date = await this.dateAndTime();
    let userId = await this.profileId();
    let job = {
      companyTitle: jobItem.company,
      jobTitle: jobItem.jobtitle,
      location: jobItem.location,
      AppliedDate: date,
      userId: userId
    }
    console.log(job);
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    this.http.post(this.db_url + 'savedjobList',job,{headers: headers});
  }

  // get the applied jobs list 
  async getAppliedJobList(userId) {
    //let userId = await this.profileId();
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.get(this.db_url + 'joblist/' + userId,{headers: headers})
  }
  // get the failed job list
  async getFailedJobList(userId) {
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.get(this.db_url + 'failjoblist/' + userId,{headers: headers})
  }
  // get the saved job list
  async getSavedJobList(userId) {
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.get(this.db_url + 'savedjobList/' + userId,{headers: headers})
  }


}
