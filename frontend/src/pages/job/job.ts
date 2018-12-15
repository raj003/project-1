import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FeedsPage } from '../feeds/feeds';
import { MatchesPage} from '../matches/matches';
import { ConversationPage } from '../conversation/conversation';
import { ProfilePage } from '../profile/profile';
import { SettingsPage } from '../settings/settings'; 
import { JobActionsProvider } from '../../providers/job-actions/job-actions';


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

  constructor(public navCtrl: NavController, public jobAction: JobActionsProvider) {
    
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
}
