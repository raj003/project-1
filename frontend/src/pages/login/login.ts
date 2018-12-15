import { Component, ViewChild, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LocationPage} from '../location/location';
import { FlashMessagesService } from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';
import { NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidateService } from '../../services/validate.service';
import { ValidationService } from '../../app/validation.service';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { JobsDataProvider } from '../../providers/jobs-data/jobs-data';
import { ToastController } from 'ionic-angular';
@IonicPage({
  name: 'login-page',
  segment: 'login'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {
  toggleFlashMsgsVariable:boolean = false;
  userForm: any;
  username: any;
  password: any;
  readUsernames:boolean = false;
  readPswd: boolean = false;
  _timeout: any = null;
  ErrorMsgStatus: boolean = false;
   name1: any = '';
   name2: any = '';

  // formgroup: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private validateService: ValidateService,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,public lc: NgZone,
    private formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public jobs: JobsDataProvider, private toastCtrl: ToastController
    ) {
      this.userForm = this.formBuilder.group({
        'username': ['', Validators.required],
        'password': ['', [Validators.required, ValidationService.passwordValidator]]

      });
}
  ngOnInit() {

  }
  clearErr(event) {
    this.ErrorMsgStatus = false;
    // private authService:AuthService,
    // public alertCtrl: AlertController) {
  }
  gotoHomepage() {
  	this.navCtrl.push(HomePage);
  }
  ionViewDidLoad() {
  }

  // getTheValue(k) {
  //   this.showVal = true;
  // }

  readUserName() {
    this._timeout  = null;
    if(this._timeout){ //if there is already a timeout in process cancel it
      window.clearTimeout(this._timeout);
    }
    this.readUsernames = true;
    this._timeout = window.setTimeout(() => {
       this._timeout = null;
       this.lc.run(() => this.name1 = this.username);
       this.readUsernames = false;
    },2000);
 }
 readPassword() {
  this._timeout  = null;
  if(this._timeout){ //if there is already a timeout in process cancel it
    window.clearTimeout(this._timeout);
  }
  this.readPswd = true;
  this._timeout = window.setTimeout(() => {
     this._timeout = null;
     this.lc.run(() => this.name2 = this.password);
     this.readPswd = false;
  },2000);
}

  onLoginSubmit(){
    const user = {
    username: this.username,
    password: this.password
    }

    if (this.userForm.dirty && this.userForm.valid) {
      this.authService.authenticateUser(user).subscribe((data : any) => {
        if(data.success){
        this.authService.storeUserData(data.token, data.user);
        this.toggleFlashMsgsVariable = true;
        let loader = this.loadingCtrl.create({
          content: "Logging in...",
          duration: 1200
        });
        loader.present();
        // this.flashMessage.show('You are now logged in', {
        // cssClass: 'alert-success',
        // timeout: 5000});
        // this.router.navigate(['dashboard']);
        //  this.toggleFlashMsgsVariable = false;
        setTimeout(() => {
          this.navCtrl.push(LocationPage, {
              duration: 200, // The length in milliseconds the animation should take.
          });
        },1450);
       // this.navCtrl.push(LocationPage);
        } else {
        this.toggleFlashMsgsVariable = true;
        this.flashMessage.show(data.msg, {
        cssClass: 'alert-danger',
        timeout: 55000});
        //      this.toggleFlashMsgsVariable = false;
        // this.router.navigate(['login']);
        this.ErrorMsgStatus = true;
        return false;
        }
      });
    }
   }
 fp() {
  let prompt = this.alertCtrl.create({
    title: 'Reset Password',
    message: "Enter your email address to reset your password",
    inputs: [
      {
        name: 'emailid',
        placeholder: 'email ID'

      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'OK',
        handler: data => {
          this.emailVerify(data.emailid)
        }
      }
    ]
  });
  prompt.present();
}

  emailVerify(email) {
    console.log(email);
    this.authService.forgotpasswordMail(email).subscribe((data : any) => {
      if(data.success) {
        console.log(data.msg);
        // const emailobj = {
        //   emailid: email
        // }
        //this.navCtrl.push(ForgotPasswordPage);
        let tempMsg = 'please check your email for verification'
        this.popAlert(tempMsg);
      }
      else {
        this.presentToast(data.msg);
      }
    })
  }

  presentToast(errMsg) {
    let toast = this.toastCtrl.create({
      message: errMsg,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      //console.log('Dismissed toast');
    });
    toast.present();
  }

  // to show alerts
  popAlert(tempMsg) {
    let alert = this.alertCtrl.create({
     title: 'ALERT',
     subTitle: tempMsg,
     buttons: ['Dismiss']
   });
   alert.present();
 }
}
