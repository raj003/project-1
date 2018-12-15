import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConversationPage } from './conversation';
//import { IonTextAvatar } from 'ionic-text-avatar';

@NgModule({
  declarations: [
    ConversationPage,
  ],
  imports: [
    IonicPageModule.forChild(ConversationPage),
  ],
})
export class ConversationPageModule {}
