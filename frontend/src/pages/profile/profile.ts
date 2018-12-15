import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { AuthService } from '../../services/auth.service';
//import { Jsonp } from '@angular/http';
import { Camera } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  about: string;
  education: string;
  expirence: string;
   unlock: boolean = false;
  lock: boolean = true;
  resume: any;
  profilePic: any;
  userSpecificData: any = {_id:'-', resume:'', about: '',education:'', expirence:'', profilePic: ''}
  resumeName: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
  private file: File, private fileChooser: FileChooser,
  public authservices: AuthService,public camera: Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.authservices.getProfile().subscribe( (profile: any) => {
      this.userSpecificData = profile.user;
      console.log(profile.user);
      console.log(this.userSpecificData)
     });

     if( this.userSpecificData.resume == '' ){
       this.userSpecificData.resume = 'upload resume';
     }
     if(this.userSpecificData.profilePic == null) {
       this.userSpecificData.profilePic = "assets/imgs/pp.jpeg";
      }
  }
  

  editContent() {
    this.lock = false;
    this.unlock = true;
  }

  profileSubmit() {
    
    const userProfiledata = {
      _id:this.userSpecificData._id,
      about: this.userSpecificData.about,
      education: this.userSpecificData.education,
      expirence: this.userSpecificData.expirence,
      resume: this.userSpecificData.resume,
      profilePic: this.userSpecificData.profilePic
    }
    console.log(userProfiledata);
    //this.storeProfile(profiledata);
    this.authservices.updateProfile(userProfiledata).subscribe((data: any) => {
      //this.userSpecificData = data;
      console.log(data);
      this.userSpecificData.about = data.about;
      this.userSpecificData.education = data.education;
      this.userSpecificData.expirence = data.expirence;
      this.userSpecificData.profilePic = data.profilePic
      if(!data.resume) {
        this.resumeName = 'Upload Resume';
      } else {
        this.userSpecificData.resume = data.resume;
      }
    });
    
    this.unlock = false;
    this.lock = true;
  }

  // storeProfile(profile) {
  //   let headers = new 
  // }

  uploadFile() {
    this.fileChooser.open().then((uri) => {
       console.log(uri);

       this.file.resolveLocalFilesystemUrl(uri).then((newURL) => {
         console.log(JSON.stringify(newURL));

         let dirPath = newURL.nativeURL;
         let dirPathSegments = dirPath.split('/');   // break string into array
         this.resumeName = dirPathSegments.pop() // removes the file name
         dirPath = dirPathSegments.join('/')
 
         this.file.readAsArrayBuffer(dirPath, newURL.name).then(async (buffer) => {
          await this.upload(buffer,newURL.name)
         })
       })
    }) 
  }

  async upload(buffer, name) {
    this.resume = new this.resume([buffer],{ type:"pdf" });
    this.userSpecificData.resume = this.resume;
  }

// to access gallery
  openGaller() {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.camera.DestinationType.DATA_URL
     }).then((imageData) => {
       this.userSpecificData.profilePic = 'data:image/jpeg;base64,'+imageData;
      }, (err) => {
       console.log(err);
     });
  }

}
