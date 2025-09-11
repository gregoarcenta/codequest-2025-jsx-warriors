import { Component } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonMenu,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  imports: [
    IonContent,
    IonHeader,
    IonMenu,
    IonTitle,
    IonToolbar],
})
export class SidenavComponent { }