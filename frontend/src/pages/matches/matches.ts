import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppliedPage } from '../applied/applied';
import { FailedPage } from '../failed/failed';
import { SavedPage } from '../saved/saved';



@IonicPage()
@Component({
  selector: 'page-matches',
  templateUrl: 'matches.html',
})
export class MatchesPage {

  tab1Root = AppliedPage;
  tab2Root = FailedPage;
  tab3Root = SavedPage;

  searchbar: boolean = true;
  @ViewChild('active') tabRef;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MatchesPage');
  }

  //on click search icon search bar will appear
  opensearchbar() {
    this.searchbar = false;
  }

  IonViewDidEnter() {
    //this.navCtrl.push(AppliedPage);
    //this.tabRef.select(0);
    console.log('matches Page');
    this.navCtrl.parent.select(0);
  }

  

}
