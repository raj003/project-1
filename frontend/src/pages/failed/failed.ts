import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { JobActionsProvider } from '../../providers/job-actions/job-actions';
import { AuthService } from '../../services/auth.service';
import { JobServiceProvider } from '../../providers/job-service/job-service';
import { Pipe, PipeTransform } from '@angular/core';

@IonicPage()
@Component({
  selector: 'page-failed',
  templateUrl: 'failed.html',
})
@Pipe({ name: 'reverse' })

export class FailedPage implements PipeTransform {
  transform(value) {
    return value.slice().reverse();
  }


  failedjobs: Array<any> = [];
  profile: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, public jobfailList: JobServiceProvider, private authServices: AuthService) {
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
    this.jobfailList.getFailedJobList(profileId).then((failedJobs: any) => {
    console.log('listing the failed jobs');
    this.failedjobs = failedJobs;
    }).catch((err: any) => console.log(err))
  }
  

}
