import { Component } from '@angular/core';
import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  imports: [
    IonButtons,
    IonHeader,
    IonMenuButton,
    IonTitle,
    IonToolbar],
})
export class ToolbarComponent { }