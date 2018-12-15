import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { Http, Headers, RequestOptions } from '@angular/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Chatmsgs } from '../../services/chatmsgs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';


declare var require: any;

@IonicPage()
@Component({
  selector: 'page-chat-box',
  templateUrl: 'chat-box.html',
})
export class ChatBoxPage {

  answer = "";
  Access_token = "174fda8983514f70b4244fee5575e649";
  messages: Chatmsgs[] = [];
  userId : string;
  botId : string = "bot_default";
  

  constructor(public navCtrl: NavController,
      public navParams: NavParams,
      public http: HttpClient,public authServices: AuthService) 
      { 
        
        this.authServices.getProfile() .subscribe((profile : any) => {
          this.userId = profile.user._id;
          //console.log(profile.user._id);
        })

      }
        

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatBoxPage');
    
  }
  //to go back
  goBack() {
    this.navCtrl.pop();
  }

  ask(question) {
    let queryData = {
      query: question,
      sessionId: this.userId
    }
    let chat = new Chatmsgs(question, this.botId);
    this.messages.push(chat);
    this.authServices.dialogflow(queryData).subscribe((data: any) => {
      if(data.reply) {
        console.log(data.reply);
        let chat = new Chatmsgs(data.reply,this.userId);
        this.messages.push(chat);
      }
      else {
        console.log('sorry! bot is not responding');
      }
    });
  }
}
  








