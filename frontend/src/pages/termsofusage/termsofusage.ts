import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-termsofusage',
  templateUrl: 'termsofusage.html',
})
export class TermsofusagePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TermsofusagePage');
  }
  clstc() {
    this.navCtrl.pop();
  }

}
