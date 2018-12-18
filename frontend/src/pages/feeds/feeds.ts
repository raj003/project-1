import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions} from '@ionic-native/native-page-transitions';
import { JobDetailPage } from '../job-detail/job-detail';
import { JobsDataProvider } from '../../providers/jobs-data/jobs-data';
import { ModalPage } from '../modal/modal';
import {
  StackConfig,
  DragEvent,
  SwingStackComponent,
  SwingCardComponent
} from 'angular2-swing';
//import { JobActionsProvider } from '../../providers/job-actions/job-actions';
import { LocalNotifications } from '@ionic-native/local-notifications';
//import { JobFunctionsProvider } from '../../providers/job-functions/job-functions';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { JobServiceProvider } from '../../providers/job-service/job-service';


@IonicPage()
@Component({
  selector: 'page-feeds',
  templateUrl: 'feeds.html',
})
export class FeedsPage {

  @ViewChild('myswing1') swingStack: SwingStackComponent;
  @ViewChildren('mycards1') swingCards: QueryList<SwingCardComponent>;
  stackConfig: StackConfig;
  recentCard: string = '';
  cards: Array<any> = [];
  buttonColor: string = '#F2F0F4';
  likeSymbol: boolean = false;
  jobtitletosave: string;
  showdropdown: boolean = false;
  searchQuery: string = '';
  items: string[];
  jdetails: Array<any> = [];
  
  constructor( public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
    private nativePageTransitions: NativePageTransitions,
    public jobdetail: JobsDataProvider,
     private localNotifications: LocalNotifications, private platform: Platform,
    private jobService: JobServiceProvider, private http: HttpClient, private authServices: AuthService,

    )
   {
    this.stackConfig = {
      throwOutConfidence: (offsetX, offsetY, element: any) => {
        return Math.min(Math.abs(offsetX) / (element.offsetWidth/2), 1);
        
      },
      transform: (element, x, y, r) => {
        this.onItemMove(element, x, y, r);
      },
      throwOutDistance: (d) => {
        return 800;
      }
    };
    this.initializeItems();
    
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedsPage');
    
  }

  launchjobDescriptionPage(card) {
    let options: NativeTransitionOptions = {
      direction: 'down',
      duration: 100,
      slowdownfactor: -1,
      iosdelay: 50,
      androiddelay: 50, 
    }
    this.nativePageTransitions.fade(options);
    this.navCtrl.push(JobDetailPage,card);
  }
  // filter page
  showAlert() {
    let modal = this.modalCtrl.create(ModalPage);
    modal.present();
    
  }
  ngAfterViewInit() {
    // Either subscribe in controller or set in HTML
    this.swingStack.throwin.subscribe((event: DragEvent) => {
      event.target.style.background = '#ffffff';
    });
    this.jobdetail.getJobDetails().subscribe((data: any) => {
      this.jdetails = data;
      //console.log(this.jdetails);
      this.addnewCards();
    },(err : any) => { console.log('err in getting job des ' + err)});
    
  }

  ionViewWillEnter() {
    
  }

  onItemMove(element, x, y, r) {
    let color = '';
    const abs = Math.abs(x);
    const min = Math.trunc(Math.min(16 * 16 - abs, 16 * 16));
    const hexCode = this.decimalToHex(min, 2);

    if (x > 0) {
      color = '#' + hexCode + 'FF' + hexCode;
    } else {
      color = '#FF' + hexCode + hexCode;
    }

    element.style.background = color;
    element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
  }

  
  decimalToHex(d, padding) {
    let hex = Number(d).toString(16);
    const numPadding = typeof (padding) === 'undefined' || padding === null ? 2 : padding;

    while (hex.length < numPadding) {
      hex = '0' + hex;
    }

    return hex;
  }
  //like symbol
  tapEvent(e) {
    this.likeSymbol = true;
    if(this.likeSymbol) {
      this.buttonColor = '#E24B4B';
    }
    else {
      this.buttonColor = '#F2F0F4';
    }
  }
  // job roles to display in dropdown
  initializeItems() {
    this.items = [
      'java developer',
      '.Net developer',
      'python developer',
      'Full Stack developer',
      'UX/UI design',
      'MEAN stack developer',
      'hadoop',
      'Data scientist',
      'js developer'
    ];
  }
  // get job items
  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();
    // set val to the value of the searchbar
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      this.showdropdown = true;
    } else {
      this.showdropdown = false;
    }
  }

  // swiping cards functionality 
  voteUp(like: boolean) {
    let removedCard = this.cards.pop();
    // when card is swiped right is is going to call the post the applied job method
    if (like) {
      console.log('you have liked '+ removedCard.jobtitle + ' '+ removedCard.company + ' '+ removedCard.location);
      
      this.jobService.postAppliedJob(removedCard)
      // .then((response: any) => {
      //   if(response.success) {
      //     this.promptNotification(response.listData); // after applying the job -> prompt notification
      //   }
      //   else {
      //     alert('Error in applying for the job');
      //   }
      // })
    }
    // when the card is swiped left it's going to call the post the failed job method. 
    else {
      console.log('you have disliked '+ removedCard.jobtitle+ ' '+ removedCard.company + ' '+ removedCard.location);
      this.jobService.postFailedJob(removedCard);
    }
  }
  // add new cards
  addnewCards() {
    for (let val of this.jdetails) {
      this.cards.push(val);
    }
  }

  // for notifications data 
  promptNotification(msg) {
    this.platform.ready().then(() => {
      this.localNotifications.schedule({
        title: msg.companyTitle,
        text: 'you have applied for the job please click here to participate in the interview',
        trigger: {at: new Date(new Date().getTime() + 1000)}
      });
    });
  }
// --------------------------------------------------------------------------
  

}