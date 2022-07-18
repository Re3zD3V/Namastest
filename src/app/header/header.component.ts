import { Component, OnInit, HostListener } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ScreensizeService } from '../services/screensize.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isDesktop: boolean;
  // public appPages = [
  //   { title: 'Accueil', url: '/dashboard', icon: 'home' },
  //   { title: 'Tests', url: '/test/list', icon: 'newspaper' },
  //   { title: 'Catalogues', url: '/catalog/list', icon: 'folder' },
  //   { title: 'Campagnes', url: '/project/list', icon: 'file-tray-full' },
  //   { title: 'Profil', url: '/profile', icon: 'person' },
  //   { title: 'Documentation', url: '', icon: 'book' },
  //   { title: 'Options', url: '', icon: 'settings' },
  //   { title: 'Nous contacter', url: '', icon: 'mail' },
  //   { title: 'Mentions Légales', url: '/legal', icon: 'information' },
  // ];
  constructor(
    private platform: Platform,
    private screensizeService: ScreensizeService
  ) {
    this.initializeApp();
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      this.isDesktop = isDesktop;
    });
  }
  @HostListener('window:resize', ['$event'])
  private onResize(event) {
    this.screensizeService.onResize(event.target.innerWidth);
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.screensizeService.onResize(this.platform.width());
    });
  }

  ngOnInit() {}
}
