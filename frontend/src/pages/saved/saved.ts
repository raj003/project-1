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
  private jobService: JobServiceProvider, private configs: ConfigsProvider, private authService: AuthService) {

    this.url = 'assets/ionic-config.json';
    this.callTheDbUrl();    // calls the method as class is intiated
  }

  ionViewDidLoad() {
    
  }

  async ionViewWillEnter() {
    this.getSavedJobs();
    
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
      });
    });
  }

  // fetching all the saved jobs
  async getSavedJobs() {
    let id = await this.profileId();
    this.jobService.getSavedJobList(id).subscribe((list: any) => {
      for (let job of list) {
        this.savedjobs.push(job);
        
      }
    },(err: any) => {
      console.log(err);
      console.log('err in getting the saved jobs');
    });
  }
}

