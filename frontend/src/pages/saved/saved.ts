import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { JobActionsProvider } from '../../providers/job-actions/job-actions';
import { ConfigsProvider } from '../../providers/configs/configs';
import { AuthService } from '../../services/auth.service';
import { JobServiceProvider } from '../../providers/job-service/job-service';


@IonicPage()
@Component({
  selector: 'page-saved',
  templateUrl: 'saved.html',
})
export class SavedPage {

  savedjobs: Array<any> = [];
  url : string; // config file address
  db_url: any;  // assign the db url

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private joblist: JobServiceProvider, private configs: ConfigsProvider, private authService: AuthService) {

    this.url = 'assets/ionic-config.json';
    this.callTheDbUrl();    // calls the method as class is intiated
  }

  ionViewDidLoad() {
    // console.log('SavedPage');
    // //getting and displaying the saved jobs
    // this.joblist.getSavedjoblslist().subscribe((data: any) =>  {
    //   console.log('displaying saved jobs ' + data);
    //   for(let values of data) {
    //     this.savedjobs.push(values);
    //   }
    // },(err) => console.log('error in getting saved jobs '+err));
  }

  async ionViewWillEnter() {
    let userId = await this.profileId();
    console.log('getting the saved jobs');
    this.joblist.getSavedJobList(userId).then((list: any) => {
      this.savedjobs = list;
    }).catch((err: string) => console.log('error in getting the saved jobs' + err))

  }

  async callTheDbUrl() {
    let baseUrl = await this.configs.loadJSON(this.url);
    this.db_url = baseUrl[0].db_url2;
    console.log(this.db_url);
  }

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

// console.log(' Into the saved jobs ');
//     this.joblist.getSavedjoblslist().subscribe( (savedJobs : any) => {
//       this.savedjobs = savedJobs;
//     }, (error : any) => console.log('error in fetching the saved jobs ' +error))