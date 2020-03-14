import { Injectable } from '@angular/core';
import { ToastController, LoadingController, Loading } from 'ionic-angular';

@Injectable()
export class Utils {

  constructor(public toast: ToastController, public loadingCtrl: LoadingController) {
  }

  //TOASTS - START
  toastWarning(text) {
    this.toast.create({ message: text, duration: 3000, cssClass: 'toastWarning' }).present();
  }

  toastSuccess(text) {
    this.toast.create({ message: text, duration: 3000, cssClass: 'toastSuccess' }).present();
  }

  toastFail(text) {
    this.toast.create({ message: text, duration: 3000, cssClass: 'toastFail' }).present();
  }

  toastWarningWithTime(text, warning) {
    this.toast.create({ message: text, duration: warning, cssClass: 'toastWarning' }).present();
  }

  toastSuccessWithTime(text, warning) {
    this.toast.create({ message: text, duration: warning, cssClass: 'toastSuccess' }).present();
  }

  toastFailWithTime(text, warning) {
    this.toast.create({ message: text, duration: warning, cssClass: 'toastFail' }).present();
  }
  //TOASTS - END

  //Mostrar um Grupo
  toggleGroup(group) {
    group.show = !group.show;
  }
  isGroupShown(group) {
    return group.show;
  };

  //HashCode
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

  //Campos Obrigatórios
  campoRequerido(value) {
    if (value == "" || value == undefined) {
      return false;
    }
    return true;
  }

  //Mostra o Conteúdo do Objeto de Serviço
  showContentServObj(serv, obj) {
    if (serv == "D" || obj == "D") {
      return false;
    } else {
      return true;
    };
  }

  //Abrir Detalhes de um produto
  showContentProd(prod) {
    if (prod == "D") {
      return false;
    } else {
      return true;
    };
  };

  //Adiciona um zero à esquerda para números entre 0 e 9
  minTwoDigits(n) {
    return (n < 10 ? '0' : '') + n;
  }

  showLoading(text?: string): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: `Aguarde a ${text}...`
    })
    loading.present();
    return loading;
  }

}
