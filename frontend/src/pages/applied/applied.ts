import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { JobActionsProvider } from '../../providers/job-actions/job-actions';
import { ConfigsProvider } from '../../providers/configs/configs';
import { AuthService } from '../../services/auth.service';



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
              private getjobs: JobActionsProvider,private authServices: AuthService)
  {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppliedPage');
  }

  ionViewWillEnter() {
    // getting the user id to get/post data for a specific person
    this.authServices.getProfile().subscribe((profile: any) => {
      this.userId = profile.user._id;
      if(this.userId) {
        this.getTheAppliedJobs(this.userId);
      }
    }, (err) => console.log('unable to get the profile data ' + err))
    // retreving & displaying all the applied jobs 
    console.log('retreving the applied jobs list');
    
    
  }
  // to get only user applied jobs
  getTheAppliedJobs(userId) {
    this.getjobs.getAppliedjobList(userId) .subscribe((AppliedList: any) => {
      this.appliedjobs = AppliedList;
    }, (err) => console.log('Error in fetching the applied job data ' + err))
  }

  
  

}
