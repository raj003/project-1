import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigsProvider } from '../configs/configs';
import { AuthService } from '../../services/auth.service';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Platform } from 'ionic-angular';


@Injectable()
export class JobServiceProvider {

  url : string; // config file address
  db_url: any;  // assign the db url

  constructor(public http: HttpClient,private configs: ConfigsProvider, private authService: AuthService, 
    private localNotification: LocalNotifications, private platform: Platform) {
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
    this.http.post(this.db_url + 'joblist',job,{headers: headers})
    .subscribe((data: any) => {
      if(data) {
        this.promptNotification(data);
      }
    },(err: any) => {
      console.log('err in applying the job ' + err);
    });
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
    this.http.post(this.db_url + 'failjoblist',job,{headers: headers}).subscribe((data: any) => {
      if(data) {
        console.log('posted the disliked job');
      }
    },(err: any) => console.log(err + 'at the posting the failed jobs'));
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
    this.http.post(this.db_url + 'savedjobList',job,{headers: headers}).subscribe((data: any) => {
      if(data) {
        console.log('posted the saved job');
      }
    },(err: any) => console.log(err + 'at the posting the saved jobs'));
  }

  // get the applied jobs list 
  getAppliedJobList(userId) {
    //let userId = await this.profileId();
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.get(this.db_url + 'joblist/' + userId,{headers: headers})
    
  }
  // get the failed job list
  getFailedJobList(userId) {
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.get(this.db_url + 'failjoblist/' + userId,{headers: headers})
  }
  // get the saved job list
  getSavedJobList(userId) {
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.get(this.db_url + 'savedjobList/' + userId,{headers: headers})
    
  }

  // to get the notifications when applied for a job.
  promptNotification(msg) {
    this.platform.ready().then(() => {
      this.localNotification.schedule({
        title: msg.companyTitle,
        text: 'You have succesfully applied to the job please click here to proceed for job interview',
        trigger: {at: new Date(new Date().getTime() + 1500)}
      });
    });
  }


}
