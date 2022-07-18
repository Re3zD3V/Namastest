import { Component, HostListener } from '@angular/core';
import { Platform } from '@ionic/angular';
import { TokenDecoderService } from 'src/app/shared/services/token/token-decoder.service';
import { ScreensizeService } from './services/screensize.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isDesktop: boolean;
  public appPages = [
    { title: 'Accueil', url: '/dashboard', icon: 'home' },
    { title: 'Tests', url: '/test/list', icon: 'newspaper' },
    { title: 'Catalogues', url: '/catalog/list', icon: 'folder' },
    { title: 'Projets', url: '/project/list', icon: 'file-tray-full' },
    { title: 'Profil', url: '/profile', icon: 'person' },
    { title: 'Documentation', url: '', icon: 'book' },
    { title: 'Options', url: '', icon: 'settings' },
    { title: 'Nous contacter', url: '', icon: 'mail' },
    { title: 'Mentions Légales', url: '/legal', icon: 'information' },
  ];
  public labels = [];
  public userEmail: string;

  constructor(
    private platform: Platform,
    private screensizeService: ScreensizeService,
    private tokenDecoder: TokenDecoderService
  ) {
    this.initializeApp();
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      console.log('CHANGEMENT DESKTOP :', isDesktop);
      this.isDesktop = isDesktop;
    });
    this.userEmail = this.tokenDecoder.getUsername();
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
}
