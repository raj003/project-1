import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FeedsPage } from '../feeds/feeds';
import { MatchesPage} from '../matches/matches';
import { ConversationPage } from '../conversation/conversation';
import { ProfilePage } from '../profile/profile';
import { SettingsPage } from '../settings/settings'; 
import { JobServiceProvider } from '../../providers/job-service/job-service';
import { AuthService } from '../../services/auth.service';
//import { JobActionsProvider } from '../../providers/job-actions/job-actions';


@IonicPage()
@Component({
  selector: 'page-job',
  templateUrl: 'job.html'
})
export class JobPage {

  feedsRoot = 'FeedsPage'
  matchesRoot = 'MatchesPage'
  conversationRoot = 'ConversationPage'
  profileRoot = 'ProfilePage'
  settingsRoot = 'SettingsPage'
  url: string;
  msgCount : any;

  constructor(public navCtrl: NavController,private jobServices: JobServiceProvider, private authService: AuthService) {
    
  }

  ionViewWillEnter() {
    this.url = 'assets/ionic-config.json';
    this.msgCount = 0;
    //this.getUrl();
  }

  // to get the applied jobs list and count no of jobs to show them in message badge
  //  getUrl() {
  //   this.jobAction.getAppliedjobList().subscribe((jobsList: any) => {
  //     // for( let value of jobsList) {
  //     //  // this.msgCount++;  // counting the no of messages.
  //     // }
  //     this.msgCount = Object.keys(jobsList).length;
  //   }, (err : any) => console.log('err in getting the applied jobs list ' +err))
  // }

  // to count messages the display in badge 
  async messageCount() {
    // by checking the no of the jobs applied we are counting the messages 
    // calling the getAppliedJobList method to retrive the applied jobs
    
    let id = await this.getProfileId();
    this.jobServices.getAppliedJobList(id).subscribe((list: any) => {
      this.msgCount = Object.keys(list).length;
    },(err: any) => {
      console.log(err + 'unable to get job list');
    });
  }

  // first calling the get profile method to user id in order to get the partricular user id.
  getProfileId() {
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
