import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedsPage } from './feeds';
import { SwingModule } from 'angular2-swing';
import { AutoCompleteModule } from 'ionic2-auto-complete';

@NgModule({
  declarations: [
    FeedsPage,
  ],
  imports: [
    IonicPageModule.forChild(FeedsPage),
    SwingModule,
    AutoCompleteModule
  ],
})
export class FeedsPageModule {}
