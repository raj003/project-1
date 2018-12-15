import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditinfoPage } from '../editinfo/editinfo';
import { PolicyPage } from '../policy/policy';


@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }

  notnow() {

  	 this.navCtrl.push(EditinfoPage);
  }
  acccessNofification() {
    this.navCtrl.push(EditinfoPage);
  }
  // redirect to policy page
  toPolicypage() {
    this.navCtrl.push(PolicyPage);
  }

}
