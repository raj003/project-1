import { Component } from '@angular/core';
import { NavController,Platform, IonicPage  } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { LoginPage } from '../login/login';
import { LocationPage} from '../location/location';
import { PolicyPage } from '../policy/policy';
import { TermsofusagePage } from '../termsofusage/termsofusage';
//import { LinkedIn, LinkedInLoginScopes } from '@ionic-native/linkedin';
import { AuthService } from '../../services/auth.service';
import { AlertController } from 'ionic-angular';
import {Http, Headers} from '@angular/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { IonicPageModule  } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { LinkedinPageProvider } from '../../providers/linkedin-page/linkedin-page';
import { EditinfoPage } from '../editinfo/editinfo';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

declare var window: any;


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  
  clientId = '81owhlvqu6ukaj';
  clientSecret = '84AtzJD1H7YKiVIl';
  redirect_uri = "http://localhost";
  state = 'hjfdhjGj12j';
  appScope = 'r_basicprofile%20r_emailaddress';
  userData: any;
  linkedinURL: any;
  accessToken: any;
  result: any;
  code: any;

  constructor(public navCtrl: NavController,  private authservices: AuthService,
  private alertCtrl: AlertController, private http: HttpClient, private platform: Platform,
  private iab: InAppBrowser, public lkPage: LinkedinPageProvider,private facebook: Facebook) {

    //this.platform = platform;
    //this.http = http;
    this.linkedinURL = 'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id='+this.clientId+'&redirect_uri='+this.redirect_uri+'&state='+this.state+'&scope='+this.appScope;

  }

  ionViewDidLoad() {
    
  }
  
  // redirect to the login page
  gotoSignpage() {

    this.navCtrl.push(LoginPage);

  }
  // redirect to register page
  openRegisterPage() {
    this.navCtrl.push(RegisterPage);
  }
// redirect to policy page
  toPolicypage() {
    this.navCtrl.push(PolicyPage);
  }

  // to redirect to the terms of usage page
  totermPage() {
    this.navCtrl.push(TermsofusagePage);
  }
  
  // to redirect to the linkedin OAuth login page -------------------------------------
  linkPage(): Promise<any> {
    return new Promise((resolve,reject) => {
      let browser = this.iab.create(this.linkedinURL,'_blank');
      let listner = browser.on('loadstart').subscribe((event: any) => {
        if(event.url.indexOf('oauth/v2/authorization') > -1){
          return;
        }
        if(event.url.indexOf(this.redirect_uri) > -1 ) {
          listner.unsubscribe();
          browser.close();
          var token = event.url.split('=')[1].split('&')[0];
          this.code = token;
          //alert(this.code);
          resolve(this.code);
        }
        else {
          reject('could not authenticate');
        }
      });
    });
  }
   
  // on clicking the sign-in with linkedin button
  linkedinLogin() {
    let loader;
    this.platform.ready().then(()=> {
      this.linkPage().then(success => {
        //alert(success);
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post('https://www.linkedin.com/oauth/v2/accessToken?client_id='+this.clientId+'&client_secret='+this.clientSecret+'&grant_type=authorization_code&code='+success+'&redirect_uri='+this.redirect_uri,{headers: headers})
        //.toPromise()
        .subscribe((res: any) => {
          let result = res.access_token;
          //alert(result);
          if(result !== undefined) {
            console.log('received the token');
            this.lkPage.gettheLinkedinUserDetails(result)
            .subscribe((res: any) => {
              let profileData = {
                name: res.firstName,
                username: res.firstName + ' '+res.lastName,
                linkedin_id: res.id,
                email: res.emailAddress,
                lkprofilePic: res.pictureUrl
              }
              alert(profileData.email);
              this.lkPage.postLinkedinData(profileData)
              .subscribe((data: any) => {
                if (data.success) {
                  alert('Data added sucessfully ' && data.msg);
                  this.authservices.storeUserData(data.token,data.user);
                  this.navCtrl.push(EditinfoPage);
                }
                else {
                  alert('data is not added');
                }
              }, (err) => {
                console.log('err in subscribe '+err);
              });
            },(err) => {
              alert('Error in getting the response ' +JSON.stringify(err));
            })
          }
          else {
            alert('did not received any token');
          }
        });
      });
    });
  }

  
   //facebook login ----------------------------------------------------------------

   loginWithFB() {
    this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
      this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', [])
      .then((profile: any) => {
        let fbData = {
          email: profile.email,
          first_name: profile.first_name,
          id: profile.id,
          username: profile.name
        }
        alert(JSON.stringify(profile));
        this.lkPage.postFacebookData(fbData)
        .subscribe((data: any) => {
          if (data.success) {
            alert('Data added sucessfully ' && data.msg);
            this.authservices.storeUserData(data.token,data.user);
            this.navCtrl.push(EditinfoPage);
          }
          else {
            alert('data is not added');
          }
        });
      });
    });
  }

}
