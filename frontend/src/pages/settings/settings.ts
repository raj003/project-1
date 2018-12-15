import { Component, ViewChild, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { FlashMessagesService } from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';
import { TermsofusagePage } from '../termsofusage/termsofusage';
import { PolicyPage } from '../policy/policy';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  userSpecificId: any = {_id:'-'};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private flashMessage:FlashMessagesService,
    private authService:AuthService, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
    this.authService.getProfile().subscribe((profile : any) => {
      this.userSpecificId = profile.user;
    });
  }
  onLogOutClick() {
    this.authService.logout();
    this.navCtrl.push(HomePage);

  }
  gotoTermsPage() {
    this.navCtrl.push(TermsofusagePage);
  }

  gotoPolicyPage() {
    this.navCtrl.push(PolicyPage);
  }

  //to delete account
  deleteAccount() {
    
    this.authService.deleteUser(this.userSpecificId._id).subscribe((data: any) => {
      if(data.success) {
        this.presentToast();
        this.navCtrl.push(HomePage);
      }
      else{
        alert('something went wrong');
      }
    });
  }

  presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Account deleted successfully',
      duration: 3000
    });
    toast.present();
  }

}
