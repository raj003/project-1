import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, IonicPageModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { HttpModule } from '@angular/http';
import { HttpClient,HttpHeaders, HttpClientModule } from '@angular/common/http';
import { IonTextAvatar } from 'ionic-text-avatar';
import { SwingModule } from 'angular2-swing';
import { IonicSwipeAllModule } from 'ionic-swipe-all';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {RegisterPage} from '../pages/register/register';
import { LoginPage } from '../pages/login/login';
import { LocationPage } from '../pages/location/location';
import { NotificationPage } from '../pages/notification/notification';
import { EditinfoPage } from '../pages/editinfo/editinfo';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { SlidesPage } from '../pages/slides/slides';
import { JobPage } from '../pages/job/job';
import { ChatBoxPage } from '../pages/chat-box/chat-box';
import { JobDetailPage } from '../pages/job-detail/job-detail';
import { AppliedPage } from '../pages/applied/applied';
import { FailedPage } from '../pages/failed/failed';
import { SavedPage } from '../pages/saved/saved';
import { ModalPage } from '../pages/modal/modal';
import { ValidateService } from '../services/validate.service';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {AuthService} from '../services/auth.service';
import { ValidationService } from './validation.service';
import { ControlMessagesComponent } from './control-messages.component';
import { HandleUserDataService } from '../services/handleUserData.service';
import { PolicyPage } from '../pages/policy/policy';
import { TermsofusagePage } from '../pages/termsofusage/termsofusage';
import { JobsDataProvider } from '../providers/jobs-data/jobs-data';
import { JobActionsProvider } from '../providers/job-actions/job-actions';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { Camera } from '@ionic-native/camera';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Deeplinks } from '@ionic-native/deeplinks';
import { LinkedinPageProvider } from '../providers/linkedin-page/linkedin-page';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { ConfigsProvider } from '../providers/configs/configs';
import {DatePipe} from '@angular/common';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { JobFunctionsProvider } from '../providers/job-functions/job-functions';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisterPage,
    LoginPage,
    LocationPage,
    NotificationPage,
    EditinfoPage,
    SlidesPage,
    JobPage,
    ChatBoxPage,
    JobDetailPage,
    AppliedPage,
    FailedPage,
    SavedPage,
    IonTextAvatar,
    ModalPage,
    ControlMessagesComponent,
    ForgotPasswordPage,
    PolicyPage,
    TermsofusagePage,
    
  ],
  imports: [ 
    FormsModule, 
    BrowserModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp),
    FlashMessagesModule.forRoot(),
    HttpModule,
    SwingModule,
    IonicSwipeAllModule,
    HttpClientModule,
    

   
    

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisterPage,
    LoginPage,  
    LocationPage,
    NotificationPage,
    EditinfoPage,
    SlidesPage,
    JobPage,
    ChatBoxPage,
    JobDetailPage,
    AppliedPage,
    FailedPage,
    SavedPage,
    ModalPage,
    ForgotPasswordPage,
    PolicyPage,
    TermsofusagePage ,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    HandleUserDataService,
    NativePageTransitions,
    ValidateService,
    NativeGeocoder,
    AuthService,
    ValidationService, 
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    JobsDataProvider,
    JobActionsProvider,
    File,FileChooser,Camera,InAppBrowser,Deeplinks,
    LinkedinPageProvider,Facebook,
    ConfigsProvider, DatePipe, LocalNotifications,
    JobFunctionsProvider
    
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class AppModule {
  
}
