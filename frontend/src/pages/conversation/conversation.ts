import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatBoxPage } from '../chat-box/chat-box';
//import { JobActionsProvider } from '../../providers/job-actions/job-actions';
import { IonTextAvatar } from 'ionic-text-avatar';
import { JobServiceProvider } from '../../providers/job-service/job-service';
import { AuthService } from '../../services/auth.service';


@IonicPage()
@Component({
  selector: 'page-conversation',
  templateUrl: 'conversation.html',
})
export class ConversationPage {

  jobList : Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,private jobServices: JobServiceProvider,
    private authService: AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConversationPage');
    this.getAppliedJobs();
  }

  gotoChatbox() {
    this.navCtrl.push(ChatBoxPage);
  }

  // to get the all the job details and display them in the conversation page.
  async getAppliedJobs() {
    let id = await this.profileId();
    this.jobServices.getAppliedJobList(id).subscribe((data: any) => {
      for (let job of data) {
        this.jobList.push(job);
      }
      //console.log(this.jobList);
    }, (err: any) => {
      console.log(err);
    });
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
}
