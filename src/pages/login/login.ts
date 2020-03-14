/* Plugins */
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Platform, MenuController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { Utils } from '../../providers/utils/utils';
import 'rxjs/'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  dataFolhaPonto: any;
  empregado: any = {
    gps: [],
    logado: 0
  };
  model: string;
  senha: string = "";
  user: string = "";
  UUID: string;
  url: string = '';

  constructor(
    public alertCtrl: AlertController,
    public utils: Utils,
    public http: HttpClient,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public localStorage: LocalStorageProvider,
    public menuCtrl: MenuController
  ) {
    this.url = this.localStorage.getUrl();
  }

  //Verifica se o cliente está logado ou não, através do banco de dados
  ionViewDidEnter() {
  }

  //Login do Usuário
  login() {
    if (this.user == "" || this.senha == "") {
      this.utils.toastWarning("Preencha os Campos Obrigatórios para realizar o Login!");
    } else {
      this.model = "-1";
      this.UUID = "-1";
      let loading = this.loadingCtrl.create();
      loading.present();
      this.http.get(this.url + "/loginFuncionario/" + this.user + "/" + this.HashCode(this.senha) + "/" + this.model + "/" + this.UUID)
        .timeout(20000)
        .subscribe((data: any) => {
          if (data["erro"] != undefined || data["erro"] != null) {
            loading.dismiss();
            this.utils.toastFail(data.erro.msg);
          } else {
            if (data["perfis"].length != 0) {
              this.localStorage.setPerfis(data["perfis"]);
            }
            loading.dismiss();
            if (data["empregado"] == undefined) {
              this.utils.toastWarning("Usuário ou Senha incorretos, certifique-se de que preencheu os dados corretamente!");
              return;
            }
            var user = {
              cdEmpregado: data["empregado"][0].cdEmpregado,
              cdBd: data["empregado"][0].cdBd,
              gps: [],
              logado: 1,
              nmEmpregado: data["empregado"][0].nmEmpregado,
              inBaterPontoMobile: data["empregado"][0].inBaterPontoMobile,
              nmEmpresa: data["empregado"][0].nmEmpresa,
              perfis: data["empregado"][0].perfis,
              pass: this.HashCode(this.senha),
              senha: this.senha,
              user: this.user,
              pontoEmpregado: {
                hrEntrada: '',
                hrIntervaloIda: '',
                hrIntervaloVolta: '',
                hrSaida: ''
              }
            }
            this.dataFolhaPonto = new Date().toLocaleDateString();
            this.localStorage.setDataFolhaPonto(this.dataFolhaPonto);
            this.empregado = user;
            this.localStorage.setEmpregado(this.empregado);
            this.localStorage.setUser(user.cdEmpregado);
            this.localStorage.setbd(user.cdBd);
            this.utils.toastSuccess("Bem vindo, " + user.nmEmpregado + "!");
            this.menuCtrl.enable(true, "menuPrincipal");
            this.navCtrl.setRoot('FolhaPontoPage', {
              empregado: this.empregado,
            });
          }
        })
    }
  }

  //Criptografia da Senha
  HashCode(str: string) {
    var hash = 0, i, chr;
    if (str.length === 0) {
      return hash;
    }
    for (i = 0; i < str.length; i++) {
      chr = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0;
    }
    return hash;
  }

  //Encerra o Aplicativo
  encerrar() {
    this.alertCtrl.create({
      title: "Encerrar", subTitle: "Gostaria de encerrar o App?", buttons: [
        {
          text: "Sim",
          handler: () => {
            this.exitApp();
          }
        }, {
          text: "Não",
          handler: () => {
            console.log("Não quero deslogar");
          }
        }
      ]
    })
  }

  exitApp() {
    this.platform.exitApp();
  }

}
