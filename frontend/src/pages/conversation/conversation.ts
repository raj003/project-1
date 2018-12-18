import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatBoxPage } from '../chat-box/chat-box';
//import { JobActionsProvider } from '../../providers/job-actions/job-actions';
import { IonTextAvatar } from 'ionic-text-avatar';


@IonicPage()
@Component({
  selector: 'page-conversation',
  templateUrl: 'conversation.html',
})
export class ConversationPage {

  jobList : Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConversationPage');
  }

  gotoChatbox() {
    this.navCtrl.push(ChatBoxPage);
  }

  // to get the all the job details and display them in the conversation page.
  // getAppliedJobs() {
  //   this.appliedJobs.getAppliedjobList().subscribe((list : any) => {
  //     this.jobList = list;
  //   }, (err : any) => {
  //     console.log('error in getting the jobs list ' + err);
  //   })
  // }
}
