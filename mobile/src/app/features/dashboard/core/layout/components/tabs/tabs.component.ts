import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, grid, search, bookmark, person, create, notifications } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon],
})
export class TabsComponent {

  public environmentInjector = inject(EnvironmentInjector);

  constructor() {
    addIcons({ home, grid, search, bookmark, person, create, notifications });
  }

}