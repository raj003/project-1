import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { JobsDataProvider } from '../../providers/jobs-data/jobs-data';
import { ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidateService } from '../../services/validate.service';
import { ValidationService } from '../../app/validation.service';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

@IonicPage({
  segment: 'reset/:token'
})
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {

  password: string;
  repassword: string;
  emailId: string;
  token: any;
  passwordForm: any;
  userForm: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public authservices: AuthService, public jobspage: JobsDataProvider,
              private alertCtrl: AlertController, public toastCtrl: ToastController,private formBuilder: FormBuilder,
              private validateService: ValidateService
              ) {
              this.userForm = this.formBuilder.group({
                'password': ['', [Validators.required, ValidationService.passwordValidator]],
                'repassword': ['', [Validators.required, ValidationService.passwordValidator]]
              });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
    //this.emailId = this.navParams.get('emailid');
    //console.log(this.emailId);

    // this.authservices.getProfile().subscribe(profile => {
    //   console.log(profile.user);
    //});
    this.token = this.navParams.get('token');
    console.log(this.token);

  }

  closebtn() {
    this.navCtrl.push(HomePage);
  }
  // rstpwd() {
  //   this.navCtrl.push(LoginPage);
  // }

  newpasswordSubmit() {
    if(this.password === this.repassword) {
      console.log('hey its working');
      let passwordData = {
        password: this.password,
        //emailId: this.emailId
        token: this.token
      }
      this.authservices.resetPassword(passwordData)
      .subscribe((data: any)=> {
        if( data.success ) {
          let tempMsg = 'Password has been changed successfully'
          this.popAlert(tempMsg);
        }
      });
    } else {
        let tempMsg = 'Both the passwords does not match.';
        this.presentAlert(tempMsg);
      }
  }

  // alert controls
 presentAlert(tempMsg) {
   let alert = this.alertCtrl.create({
     title: 'ERROR',
     subTitle: tempMsg,
     buttons: ['Dismiss']
   });
   alert.present();
 }

 // to show alert msg
 popAlert(tempMsg) {
   let alert = this.alertCtrl.create({
        title: '',
        subTitle: tempMsg,
        buttons: [{
          text: 'ok',
          handler: () => {
            this.navCtrl.push(LoginPage);
          }
        }]
      });
    alert.present();
  }

}
