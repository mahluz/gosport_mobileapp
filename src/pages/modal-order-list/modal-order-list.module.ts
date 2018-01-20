import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalOrderListPage } from './modal-order-list';

@NgModule({
  declarations: [
    ModalOrderListPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalOrderListPage),
  ],
})
export class ModalOrderListPageModule {}
