import { Component } from '@angular/core';
import { IonContent, IonRouterOutlet } from '@ionic/angular/standalone';
import { TabsComponent } from './components/tabs/tabs.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  imports: [
    IonRouterOutlet,
    IonContent,
    SidenavComponent,
    ToolbarComponent,
    TabsComponent],
})
export class LayoutComponent { }