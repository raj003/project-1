import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { JobActionsProvider } from '../../providers/job-actions/job-actions';
import { AuthService } from '../../services/auth.service';


@IonicPage()
@Component({
  selector: 'page-failed',
  templateUrl: 'failed.html',
})
export class FailedPage {

  failedjobs: Array<any> = [];
  profile: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, public jobfailList: JobActionsProvider, private authServices: AuthService) {
  }

  ionViewDidLoad() {
    
  }

  ionViewWillEnter() {
    // fetching the failed jobs list
    // getting the profile
    this.authServices.getProfile().subscribe((profile: any) => {
      this.profile = profile.user._id;
      if(this.profile) {
        this.getFailedJobsList(this.profile);
      }
    },(error: any) => console.log(' error in getting the profile id ' + error))
    
  }

  // retreving the failed jobs
  getFailedJobsList(profileId) {
    this.jobfailList.getfailedjobList(profileId).subscribe((failedJobs: any) => {
    console.log('listing the failed jobs');
    this.failedjobs = failedJobs;
    }, (err) => console.log('Error in fetching the failed jobs '+ err))
  }
  

}
