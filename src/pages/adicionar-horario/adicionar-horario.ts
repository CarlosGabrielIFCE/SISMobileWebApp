import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { Utils } from '../../providers/utils/utils';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-adicionar-horario',
  templateUrl: 'adicionar-horario.html',
})
export class AdicionarHorarioPage {
  contadorPontoEletronico: any;
  empregado: any;
  hrEntrada = new Date().toLocaleTimeString();
  hrIntervaloIda = new Date().toLocaleTimeString();
  hrIntervaloVolta = new Date().toLocaleTimeString();
  hrSaida = new Date().toLocaleTimeString();
  horasTrabalhadas: any;
  url: String = '';
  txBaterPonto: string = '';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public localStorage: LocalStorageProvider,
    public utils: Utils,
    public http: HttpClient) {
    this.url = this.localStorage.getUrl();
    this.contadorPontoEletronico = this.localStorage.getContadorPontoEletronico();
    this.empregado = this.localStorage.getEmpregado();
    this.horasTrabalhadas = this.localStorage.getHorasTrabalhadas();
    this.carregarTextoBaterPonto();
  }

  dismiss() {
    this.navCtrl.pop();
  }

  carregarTextoBaterPonto() {
    if (this.contadorPontoEletronico == 1) {
      this.txBaterPonto = "Hora de Entrada";
    }else if (this.contadorPontoEletronico == 2) {
      this.txBaterPonto = "Hora de Intervalo - Ida"
    }else if (this.contadorPontoEletronico == 3) {
      this.txBaterPonto = "Hora de Intervalo - Volta";
    }else if (this.contadorPontoEletronico == 4) {
      this.txBaterPonto = "Hora de Saída";
    }
  }

  salvarPonto() {
    var post = {}
    if (this.contadorPontoEletronico == 1) {
      this.empregado.pontoEmpregado.hrEntrada = this.hrEntrada;
      this.contadorPontoEletronico++;
      this.localStorage.setContadorPontoEletronico(this.contadorPontoEletronico);
      post = {
        data: new Date().toISOString(),
        cdEmpregado: this.empregado.cdEmpregado,
        cdBd: this.empregado.cdBd,
        hrEntrada: this.empregado.pontoEmpregado.hrEntrada,
        hrIntervaloIda: null,
        hrIntervaloVolta: null,
        hrSaida: null
      }
    }
    else if (this.contadorPontoEletronico == 2) {
      this.empregado.pontoEmpregado.hrIntervaloIda = this.hrIntervaloIda;
      this.contadorPontoEletronico++;
      this.localStorage.setContadorPontoEletronico(this.contadorPontoEletronico);
      post = {
        data: new Date().toISOString(),
        cdEmpregado: this.empregado.cdEmpregado,
        cdBd: this.empregado.cdBd,
        hrEntrada: this.empregado.pontoEmpregado.hrEntrada,
        hrIntervaloIda: this.empregado.pontoEmpregado.hrIntervaloIda,
        hrIntervaloVolta: null,
        hrSaida: null
      }
    }
    else if (this.contadorPontoEletronico == 3) {
      this.empregado.pontoEmpregado.hrIntervaloVolta = this.hrIntervaloVolta;
      this.contadorPontoEletronico++;
      this.localStorage.setContadorPontoEletronico(this.contadorPontoEletronico);
      post = {
        data: new Date().toISOString(),
        cdEmpregado: this.empregado.cdEmpregado,
        cdBd: this.empregado.cdBd,
        hrEntrada: this.empregado.pontoEmpregado.hrEntrada,
        hrIntervaloIda: this.empregado.pontoEmpregado.hrIntervaloIda,
        hrIntervaloVolta: this.empregado.pontoEmpregado.hrIntervaloVolta,
        hrSaida: null
      }
    }
    else if (this.contadorPontoEletronico == 4) {
      this.empregado.pontoEmpregado.hrSaida = this.hrSaida;
      this.contadorPontoEletronico++;
      this.localStorage.setContadorPontoEletronico(this.contadorPontoEletronico);
      post = {
        data: new Date().toISOString(),
        cdEmpregado: this.empregado.cdEmpregado,
        cdBd: this.empregado.cdBd,
        hrEntrada: this.empregado.pontoEmpregado.hrEntrada,
        hrIntervaloIda: this.empregado.pontoEmpregado.hrIntervaloIda,
        hrIntervaloVolta: this.empregado.pontoEmpregado.hrIntervaloVolta,
        hrSaida: this.empregado.pontoEmpregado.hrSaida
      }
    }
    if (navigator.onLine) {
      this.atualizarSincronizacao(post);
    }
    this.navCtrl.pop();
  }

  atualizarSincronizacao(post) {
    this.http.post(this.url + "/sincronizarFolhaPonto/baterPonto", JSON.stringify(post))
      .subscribe(data => {
        if (data["erro"].cdErro == 1) {
          this.utils.toastWarning(data["erro"].msg);
          return;
        } else if (data["erro"].cdErro == 0) {
          this.utils.toastSuccess(data["erro"].msg);
        } else if (data["erro"].cdErro == 2) {
          this.utils.toastWarning(data["erro"].msg);
          return;
        }
      })
  }
}
