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
              public navParams: NavParams, public jobService: JobServiceProvider, private authServices: AuthService) {
  }

  ionViewDidLoad() {
    
  }

  ionViewWillEnter() {
    this.listingFailedJobs();
    
  }

  // retreving the failed jobs
  async listingFailedJobs() {
    let id = await this.profileId();
    this.jobService.getFailedJobList(id).subscribe((list : any) => {
      for(let job of list) {
        this.failedjobs.push(job);
      }
    },(err: any) => console.log(err));
  }

  profileId() {
    return new Promise((resolve) => {
      this.authServices.getProfile().subscribe((profile: any) => {
        let userId = profile.user._id;
        resolve(userId)
      },(error : any) => {
        console.log('err in getting profile ' +error);
      });
    });
  }
  

}
