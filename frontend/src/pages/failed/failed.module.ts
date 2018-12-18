import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FailedPage } from './failed';
import { Pipe, PipeTransform } from '@angular/core';
@NgModule({
  declarations: [
    FailedPage,
  ],
  imports: [
    IonicPageModule.forChild(FailedPage),
  ],
})
export class FailedPageModule {}
