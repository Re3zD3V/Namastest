import { Component, OnInit, HostListener } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ScreensizeService } from '../services/screensize.service';
@Component({
  selector: 'app-footer-menu',
  templateUrl: './footer-menu.component.html',
  styleUrls: ['./footer-menu.component.scss'],
})
export class FooterMenuComponent implements OnInit {
  isDesktop: boolean;
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
