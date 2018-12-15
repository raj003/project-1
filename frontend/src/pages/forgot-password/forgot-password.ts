import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthService } from '../../services/auth.service';



@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {

  password: string;
  repassword: string;
  emailId: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public authservices: AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
    //this.emailId = this.navParams.get('emailid');
    //console.log(this.emailId);
    // this.authservices.getProfile().subscribe(profile => {
    //   console.log(profile.user);
    // });

    //this.authservices.getPassword().subscribe(token => console.log(token));
  }

  closebtn() {
    this.navCtrl.pop();
  }
  rstpwd() {
    this.navCtrl.push(LoginPage);
  }

  newpasswordSubmit() {
    // if(this.password === this.repassword) {
    //   let passwordData = {
    //     password: this.password,
    //     token: '967249d2a8a17b2ff5ea6d6cc1def80535ac2bef'
    //   }
    //   //this.authservices.resetPassword(passwordData);
    // }else {
    //   console.log('password does not match');
    // }
  }

}
