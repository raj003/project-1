import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { JobActionsProvider } from '../../providers/job-actions/job-actions';
import { ConfigsProvider } from '../../providers/configs/configs';
import { AuthService } from '../../services/auth.service';
import { JobServiceProvider } from '../../providers/job-service/job-service';



@IonicPage()
@Component({
  selector: 'page-applied',
  templateUrl: 'applied.html',
})
export class AppliedPage {

  appliedjobs: Array<any> = [];
  char: String;
  userId: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private jobService: JobServiceProvider,private authServices: AuthService)
  {
    //this.appliedjobs = null;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppliedPage');
  }

  ionViewWillEnter() {
    this.appliedJob();
  }
  // to get the user id
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

  async appliedJob() {
    let id = await this.profileId();
    this.jobService.getAppliedJobList(id).subscribe((list : any) => {
      for(let job of list) {
        this.appliedjobs.push(job);
      }
    },(err: any) => console.log(err));
  }

  
  

}
