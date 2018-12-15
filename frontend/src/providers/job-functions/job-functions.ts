import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigsProvider } from '../configs/configs';
import { AuthService } from '../../services/auth.service';


@Injectable()
export class JobFunctionsProvider {
  db_url: any;
  url: any;
  constructor(public http: HttpClient, private configs: ConfigsProvider, private authService: AuthService) {
    console.log('Hello JobFunctionsProvider Provider');
    this.url = 'assets/ionic-config.json';
    this.callTheDbUrl();    // calls the method as class is intiated
  }

  async callTheDbUrl() {
    let baseUrl = await this.configs.loadJSON(this.url);
    this.db_url = baseUrl[0].db_url2;
    console.log(this.db_url);
  }


  async addJobList(jobitem) {
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    let selected = {
      companyTitle : jobitem.company,
      jobTitle : jobitem.jobtitle,
      location : jobitem.location,
      date: this.dateAndTime(),
      id: await this.profileId()
    }
    //console.log('reached here')
     this.http.post(this.db_url + 'jobApplied', selected,{headers: headers})
    //return this.http.post('http://192.168.0.102:3000/api/jobApplied',selected,{headers: headers}) 
  }

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
