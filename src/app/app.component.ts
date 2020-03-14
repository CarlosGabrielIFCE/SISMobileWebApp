import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';

// Side Menu Component
import { SideMenuSettings } from '../components/side-menu-content/models/side-menu-settings';
import { SideMenuContentComponent } from '../components/side-menu-content/side-menu-content.component';
import { SideMenuOption } from '../components/side-menu-content/models/side-menu-option';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // Get the instance to call the public methods
  @ViewChild(SideMenuContentComponent) sideMenu: SideMenuContentComponent;
  public options: Array<SideMenuOption>;
  selectedMenu: any;

  // Settings for the SideMenuContentComponent
  public sideMenuSettings: SideMenuSettings = {
    accordionMode: true,
    showSelectedOption: true,
    selectedOptionClass: 'active-side-menu-option'
  };

  rootPage: any = LoginPage;

  pages: Array<{ title: string, component: any }>;

  constructor(public alertCtrl: AlertController, public menuCtrl: MenuController, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.initializeOptions();
    });
  }

  initializeOptions() {
    this.options = new Array<SideMenuOption>();
    // Load options with nested items (with icons)
    // -----------------------------------------------
    this.options.push({
      displayText: 'SIS Mobile Web App',
      suboptions: [
        {
          iconName: 'time',
          displayText: 'Folha de Ponto',
          component: 'FolhaPontoPage'
        },
        {
          iconName: 'power',
          displayText: 'Encerrar SIS',
          component: null,
        },
      ]
    });
  }

  public onOptionSelected(option: SideMenuOption): void {
    this.menuCtrl.close().then(() => {
      if (option.displayText == "Encerrar SIS") {
        this.exitApp();
      }
      if (option.custom && option.custom.isLogin) {
        this.presentAlert('You\'ve clicked the login option!');
      } else if (option.custom && option.custom.isLogout) {
        this.presentAlert('You\'ve clicked the logout option!');
      } else if (option.custom && option.custom.isExternalLink) {
        let url = option.custom.externalUrl;
        window.open(url, '_blank');
      } else {
        // Get the params if any
        const params = option.custom && option.custom.param;

        // Redirect to the selected page
        this.nav.setRoot(option.component, params);
      }
    });
  }

    //Sair da Aplicação
    exitApp() {
      let alert = this.alertCtrl.create({
        title: "Sair",
        message: "Gostaria de sair do aplicativo?",
        buttons: [{
          text: "Sim",
          handler: () => {
            return this.platform.ready().then(() => {
              this.platform.exitApp();
            })
          }
        }, {
          text: "Não",
          handler: () => {
            console.log("Botão 'Não' Clicado");
          }
        }]
      })
      alert.present();
    }

  public collapseMenuOptions(): void {
    this.sideMenu.collapseAllOptions();
  }

  public presentAlert(message: string): void {
    let alert = this.alertCtrl.create({
      title: 'Information',
      message: message,
      buttons: ['Ok']
    });
    alert.present();
  }

  //Abrir uma Tab
  openPage(page, index) {
    if (page.component) {
      this.nav.setRoot(page.component);
      this.menuCtrl.close();
    } else {
      if (this.selectedMenu) {
        this.selectedMenu = 0;
      } else {
        this.selectedMenu = index;
      }
    }
  }
}
