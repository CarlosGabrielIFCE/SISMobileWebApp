import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController, IonicPage } from 'ionic-angular';
import { Utils } from '../../providers/utils/utils';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-folha-ponto',
  templateUrl: 'folha-ponto.html',
})
export class FolhaPontoPage {
  timerVar: any;
  mensagemBomDia: String = "";
  dataFolhaPontoDia = new Date().toLocaleDateString();
  dataFolhaPonto: any;
  days: string;
  empregado: any;
  value: string = '';
  contadorPontoEletronico: number;
  horasTrabalhadas: String;
  hour: any;
  date: any;
  mes: any;
  url: string = "";
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public utils: Utils,
    public localStorage: LocalStorageProvider,
    public http: HttpClient) {
    this.dataFolhaPonto = this.localStorage.getDataFolhaPonto();
    this.contadorPontoEletronico = this.localStorage.getContadorPontoEletronico();
    this.url = this.localStorage.getUrl();
    this.empregado = this.localStorage.getEmpregado();
    if (this.dataFolhaPonto != this.dataFolhaPontoDia) {
      this.empregado.pontoEmpregado = {
        hrEntrada: '',
        hrIntervaloIda: '',
        hrIntervaloVolta: '',
        hrSaida: ''
      }
    }
    this.localStorage.setEmpregado(this.empregado);
    let currentDate = new Date();
    let weekdays = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    let data = new Date();
    this.days = weekdays[currentDate.getDay()];
    this.date = data.toLocaleDateString();
    this.verificarValoresPonto();
    this.verificaMensagem(data);
    if (navigator.onLine) {
      this.carregarFolhaPonto();
    }
  }

  carregarFolhaPonto() {
    let post = {
      cdEmpregado: this.empregado.cdEmpregado,
      cdBd: this.empregado.cdBd,
      data: new Date()
    }
    this.http.post(this.url + "/sincronizarFolhaPonto/carregarFolhaPonto", JSON.stringify(post))
      .subscribe((data) => {
        if (data["erro"]["folhaPontoDia"] != undefined) {
          this.empregado.pontoEmpregado = data["erro"]["folhaPontoDia"][0];
        }
        console.log(this.empregado.pontoEmpregado);
        this.verificarValoresPonto();
      })
  }

  verificarValoresPonto() {
    if (this.empregado.pontoEmpregado.hrEntrada != undefined && this.empregado.pontoEmpregado.hrEntrada != "") {
      this.contadorPontoEletronico = 2;
    }
    if (this.empregado.pontoEmpregado.hrIntervaloIda != undefined && this.empregado.pontoEmpregado.hrIntervaloIda != "") {
      this.contadorPontoEletronico = 3;
    }
    if (this.empregado.pontoEmpregado.hrIntervaloVolta != undefined && this.empregado.pontoEmpregado.hrIntervaloVolta != "") {
      this.contadorPontoEletronico = 4;
    }
    if (this.empregado.pontoEmpregado.hrSaida != undefined && this.empregado.pontoEmpregado.hrSaida != "") {
      this.contadorPontoEletronico = 5;
    }
    if (this.empregado.pontoEmpregado.hrEntrada != undefined && this.empregado.pontoEmpregado.hrEntrada != "" && this.empregado.pontoEmpregado.hrIntervaloIda != undefined && this.empregado.pontoEmpregado.hrIntervaloIda != "" && this.empregado.pontoEmpregado.hrIntervaloVolta != undefined && this.empregado.pontoEmpregado.hrIntervaloVolta != "" && this.empregado.pontoEmpregado.hrSaida != undefined && this.empregado.pontoEmpregado.hrSaida != "") {
      this.contadorPontoEletronico = 5;
    }
    this.localStorage.setContadorPontoEletronico(this.contadorPontoEletronico);
  }

  verificaMensagem(data) {
    if (data.getHours() > 0 && data.getHours() < 12) {
      this.mensagemBomDia = "Bom dia, ";
    } else if (data.getHours() >= 12 && data.getHours() < 18) {
      this.mensagemBomDia = "Boa Tarde, ";
    } else if (data.getHours() >= 18 && data.getHours() < 24) {
      this.mensagemBomDia = "Boa noite, ";
    }
  }

  ionViewDidLoad() {
    this.formatarData();
    this.contadorPontoEletronico = this.localStorage.getContadorPontoEletronico();
  }

  formatarData() {
    this.timerVar = Observable.interval(1000).subscribe(x => {
      let data = new Date();
      let hora = data.getHours();
      let horaString = '';
      if (hora >= 0 && hora <= 9) {
        let aux = '0';
        horaString = aux.concat(hora.toString());
      } else {
        horaString = hora.toString();
      }
      let minuto = data.getMinutes();
      let minutoString = '';
      if (minuto >= 0 && minuto <= 9) {
        let aux = '0';
        minutoString = aux.concat(minuto.toString());
      } else {
        minutoString = minuto.toString();
      }
      let segundo = data.getSeconds();
      let segundoString = '';
      if (segundo >= 0 && segundo <= 9) {
        let aux = '0';
        segundoString = aux.concat(segundo.toString());
      } else {
        segundoString = segundo.toString();
      }
      this.hour = horaString + ':' + minutoString + ':' + segundoString;
      if (x == 60) {
        this.timerVar.unsubscribe();
        this.formatarData();
      }
    })
  }

  baterPonto() {
    console.log(this.contadorPontoEletronico);
    if (this.contadorPontoEletronico > 4) {
      this.utils.toastWarning("Todos os horários já foram registrados!");
      return;
    }
    let modalAdicionarHorario = this.modalCtrl.create('AdicionarHorarioPage', {
      cssClass: 'my-custom-modal-css',
    })
    modalAdicionarHorario.present();
  }

  atualizarSincronizacao() {
    console.log(this.empregado.pontoEmpregado);
    if (navigator.onLine) {
      let post = {
        data: new Date().toISOString(),
        cdEmpregado: this.empregado.cdEmpregado,
        cdBd: this.empregado.cdBd,
        hrEntrada: (this.empregado.pontoEmpregado.hrEntrada == "" ? "null" : this.empregado.pontoEmpregado.hrEntrada),
        hrIntervaloIda: (this.empregado.pontoEmpregado.hrIntervaloIda == "" ? "null" : this.empregado.pontoEmpregado.hrIntervaloIda),
        hrIntervaloVolta: (this.empregado.pontoEmpregado.hrIntervaloVolta == "" ? "null" : this.empregado.pontoEmpregado.hrIntervaloVolta),
        hrSaida: (this.empregado.pontoEmpregado.hrSaida == "" ? "null" : this.empregado.pontoEmpregado.hrSaida)
      }
      this.http.post(this.url + "/sincronizarFolhaPonto/baterPonto", JSON.stringify(post))
        .subscribe(data => {
          if (data["erro"].cdErro == 1) {
            this.utils.toastWarning(data["erro"].msg);
            this.contadorPontoEletronico = 1;
            this.localStorage.setContadorPontoEletronico(this.contadorPontoEletronico);
            return;
          } else if (data["erro"].cdErro == 0) {
            this.contadorPontoEletronico = 1;
            this.localStorage.setContadorPontoEletronico(this.contadorPontoEletronico);
            this.utils.toastSuccess(data["erro"].msg);
            this.navCtrl.setRoot('ServicosPage');
          } else if (data["erro"].cdErro == 2) {
            this.utils.toastWarning(data["erro"].msg);
            this.contadorPontoEletronico = 1;
            this.localStorage.setContadorPontoEletronico(this.contadorPontoEletronico);
            return;
          }
        })
    }
  }

}
