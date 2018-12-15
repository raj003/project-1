import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { JobActionsProvider } from '../../providers/job-actions/job-actions';

@IonicPage()
@Component({
  selector: 'page-job-detail',
  templateUrl: 'job-detail.html',
})
export class JobDetailPage {

  company: any;
  jobtitle: any;
  location: any;
  jobtype: any;
  jobDes: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public actionSheetCtrl: ActionSheetController,
    private nativePageTransitions: NativePageTransitions,
    private joblist: JobActionsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JobDetailPage');
    this.company = this.navParams.get('company');
    this.jobtitle = this.navParams.get('jobtitle');
    this.location = this.navParams.get('location');
    this.jobtype = this.navParams.get('jobtype');
    this.jobDes = this.navParams.get('jobdescrition');
  }
  moreOptions() {

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Additional Options',
      
      buttons: [
        {
          text: 'Save Job',
          handler: () => {
            this.savethejob();
          }
        },
        {
          text: 'Share'
        },
        {
          text: 'Flag as Spam',
          role: 'destructive'
        },
        {
          text: 'cancel',
          role: 'cancel'
        }

      ]
    });
    actionSheet.present();

  }
  minimizePage() {
    let options: NativeTransitionOptions = {
      direction: 'down',
      duration: 100,
      slowdownfactor: -1,
      iosdelay: 50,
      androiddelay: 50,
    }
    this.nativePageTransitions.slide(options);
    this.navCtrl.pop();
  }

  //saving the job in db
  savethejob() {
    let jobdetails = {
      company: this.company,
      jobtitle: this.jobtitle,
      location: this.location
    }
    this.joblist.addSavedjobList(jobdetails);
  }

  //to close page
  cancelbtn() {
    this.navCtrl.pop();
  }

  //apply job
  applyjob() {
    let applyjobdetails = {
      company: this.company,
      jobtitle: this.jobtitle,
      location: this.location
    }
    this.joblist.addJobList(applyjobdetails);
  }

}
