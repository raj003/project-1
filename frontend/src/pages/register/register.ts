import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { LocationPage} from '../location/location';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../app/validation.service';
import { HandleUserDataService } from '../../services/handleUserData.service';
 // import {Router} from '@angular/router';
 import { PolicyPage } from '../policy/policy';
import { TermsofusagePage } from '../termsofusage/termsofusage';


@Injectable()
@IonicPage({
  name: 'page-register',
  segment: 'register'
})
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage implements OnInit {
  userForm: any;
  name:string;
  username:string;
  email:string;
  password:any;
  phone:any = "";
  location:any = "";
  title:string = "";
  company:string = "";
  education:string = "";
  
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private validateService: ValidateService,
     private flashMessage:FlashMessagesService,
     private authService:AuthService,
     private formBuilder: FormBuilder,
     public userDataService: HandleUserDataService
    ) {
      this.userForm = this.formBuilder.group({
        'name': ['', Validators.required],
        'username': ['', Validators.required],
        'email': ['', [Validators.required,ValidationService.emailValidator]],
        'password': ['', [Validators.required, ValidationService.passwordValidator]]
        
      });
     
  }

 

  ngOnInit() {
    // this.rbar.open();
   }
  goBack() {

  	this.navCtrl.pop();
  }

  gotoSigninPage() {
    this.navCtrl.push(LoginPage);
  }

  onRegisterSubmit(){
    console.log('submit clickd');
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password,
      phone:this.phone,
      location:this.location,
      title:this.title,
      company:this.company,
      education:this.education
    }
    
   this.userDataService.getUserData(user);
    if (this.userForm.dirty && this.userForm.valid) {
// Required Fields
if(!this.validateService.validateRegister(user)){
  this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 4000});
  this.flashMessage.grayOut(true);
  return false;
}

// Validate Email
if(!this.validateService.validateEmail(user.email)){
  this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 4000});
  this.flashMessage.grayOut(true);
  return false;
}
// Register user
console.log('sdsd00');
this.authService.registerUser(user).subscribe((data: any) => {
  console.log('data',data);
  if(data.success){
   this.flashMessage.show('You are now successfully registered, redirecting to Login page..', {cssClass: 'alert-success', timeout: 4000});
  setTimeout(() => {
    this.navCtrl.push(LoginPage, {
        duration: 200, // The length in milliseconds the animation should take.
    });
  },2500);
   console.log('sucess');
  } else {
    this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 4000});
   // this.router.navigate(['/register']);
   console.log('faild');
   return false;
  }
});
    }
    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  // redirect to policy page
  toPolicypage() {
    this.navCtrl.push(PolicyPage);
  }
  totermPage() {
    this.navCtrl.push(TermsofusagePage);
  }
}
