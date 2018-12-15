import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { JobActionsProvider } from '../../providers/job-actions/job-actions';


@IonicPage()
@Component({
  selector: 'page-saved',
  templateUrl: 'saved.html',
})
export class SavedPage {

  savedjobs: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private joblist: JobActionsProvider) {
  }

  ionViewDidLoad() {
    console.log('SavedPage');
    //getting and displaying the saved jobs
    this.joblist.getSavedjoblslist().subscribe((data: any) =>  {
      console.log('displaying saved jobs ' + data);
      for(let values of data) {
        this.savedjobs.push(values);
      }
    },(err) => console.log('error in getting saved jobs '+err));
  }

  ionViewWillEnter() {
    console.log(' Into the saved jobs ');
    this.joblist.getSavedjoblslist().subscribe( (savedJobs : any) => {
      this.savedjobs = savedJobs;
    }, (error : any) => console.log('error in fetching the saved jobs ' +error))
  }

}
