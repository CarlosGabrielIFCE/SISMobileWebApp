import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, Injector } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { AngularFireModule } from 'angularfire2';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Utils } from '../providers/utils/utils';
import { LocalStorageProvider } from '../providers/local-storage/local-storage';
import { LoginPage } from '../pages/login/login';
import { HttpClientModule } from '@angular/common/http';
import { SideMenuContentComponent } from '../components/side-menu-content/side-menu-content.component';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SideMenuContentComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyD1RZmogQmYU9dmBjepTMYrZahavdoLQxI",
      authDomain: "sismobilewebapp.firebaseapp.com",
      databaseURL: "https://sismobilewebapp.firebaseio.com",
      projectId: "sismobilewebapp",
      storageBucket: "sismobilewebapp.appspot.com",
      messagingSenderId: "1075162442068",
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Utils,
    LocalStorageProvider,
  ]
})
export class AppModule {
    // Make the injector to be available in the entire module
  // so we can use it in the custom decorator
  static injector: Injector;

  constructor(injector: Injector) {
    AppModule.injector = injector;
  }
}
