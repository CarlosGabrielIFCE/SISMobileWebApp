import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageProvider {
  inIgnorarBd: boolean;
  url: string = '';
  user: number;
  bd: number;
  empregado: any;
  visitas: any = [];
  services: any = [];
  objetosVisita: any = [];
  retornosPendentes: any = [];
  novosClientes: any = [];
  tipo: any = {};
  probabilidadeReforco: any = [];
  textosPadrao: any = [];
  posicaoTexto: any = [];
  lucratividade: any = [];
  adequacao: any = [];
  avisos: any = [];
  areasVisitadas: any = [];
  servicosSincronizados = [];
  visitasSincronizadas = [];
  perfis: any = []; 
  contadorPontoEletronico: number;
  horasTrabalhadas: String;
  dataFolhaPonto: String;
  urlProducao: string = "https://www.sisdedetizadora.com.br/new/seam/resource/rest";
  urlDesenvolvimentoLocal: string = "http://localhost:8080/new/seam/resource/rest";
  urlDesenvolvimentoIp: string = "http://192.168.0.133:8080/new/seam/resource/rest";

  constructor() {
    this.inIgnorarBd = true;
    this.url = this.urlProducao;
    this.user = -1;
    this.bd = -1;
    this.visitas = [];
    this.services = [];
    this.objetosVisita = [];
    this.retornosPendentes = [];
    this.novosClientes = [];
    this.tipo = {};
    this.probabilidadeReforco = [];
    this.textosPadrao = [];
    this.posicaoTexto = [];
    this.lucratividade = [];
    this.adequacao = [];
    this.empregado = [];
    this.avisos = [];
    this.areasVisitadas = [];
    this.servicosSincronizados = [];
    this.visitasSincronizadas = [];
    this.perfis = [];
    this.contadorPontoEletronico = 1;
    this.horasTrabalhadas = "00:00";
    this.dataFolhaPonto = '';
  }

  getDataFolhaPonto() {
    return this.dataFolhaPonto;
  }

  setDataFolhaPonto(dataFolhaPonto) {
    this.dataFolhaPonto = dataFolhaPonto;
  }

  getHorasTrabalhadas() {
    return this.horasTrabalhadas;
  }

  setHorasTrabalhadas(horasTrabalhadas) {
    this.horasTrabalhadas = horasTrabalhadas;
  }

  getContadorPontoEletronico() {
    return this.contadorPontoEletronico;
  }

  setContadorPontoEletronico(contadorPontoEletronico) {
    this.contadorPontoEletronico = contadorPontoEletronico;
  }

  getUrl() {
    return this.url;
  }

  setUrl(url) {
    this.url = url;
  }

  loginSQLite(bd, empregado, novosClientes, retornosPendentes, services, user, visitas, dataFolhaPonto) {
    this.bd = bd;
    this.empregado = empregado;
    this.novosClientes = novosClientes;
    this.retornosPendentes = retornosPendentes;
    this.services = services;
    this.visitas = visitas;
    this.user = user;
    this.dataFolhaPonto = dataFolhaPonto;
  }

  setVisitasSincronizadas(visitasSincronizadas) {
    this.visitasSincronizadas = visitasSincronizadas;
  }

  getVisitasSincronizadas() {
    return this.visitasSincronizadas;
  }

  setPerfis(perfis) {
    this.perfis = perfis;
  }

  getPerfis() {
    return this.perfis;
  }

  setServicosSincronizados(servicosSincronizados) {
    this.servicosSincronizados = servicosSincronizados;
  }

  getServicosSincronizados() {
    return this.servicosSincronizados;
  }

  getAreasVisitas() {
    return this.areasVisitadas;
  }

  setAreasVisitadas(areasVisitadas) {
    this.areasVisitadas = areasVisitadas;
  }

  getAvisos() {
    return this.avisos;
  }

  setAvisos(avisos) {
    this.avisos = avisos;
  }

  getEmpregado() {
    return this.empregado;
  }

  setEmpregado(empregado) {
    this.empregado = empregado;
  }

  setAdequacao(adequacao) {
    this.adequacao = adequacao;
  }

  getAdequacao() {
    return this.adequacao;
  }

  setTipo(tipo) {
    this.tipo = tipo;
  }

  getTipo() {
    return this.tipo;
  }

  setProbabilidadeReforco(probabilidadeReforco) {
    this.probabilidadeReforco = probabilidadeReforco;
  }

  getProbabilidadeReforco() {
    return this.probabilidadeReforco;
  }

  setTextosPadrao(textosPadrao) {
    this.textosPadrao = textosPadrao;
  }

  getTextosPadrao() {
    return this.textosPadrao;
  }

  setLucratividade(lucratividade) {
    this.lucratividade = lucratividade;
  }

  getLucratividade() {
    return this.lucratividade;
  }

  setPosicaoTexto(posicaoTexto) {
    this.posicaoTexto = posicaoTexto;
  }

  getPosicaoTexto() {
    return this.posicaoTexto;
  }

  setUser(user) {
    this.user = user;
  }

  setbd(bd) {
    this.bd = bd;
  }

  getUser() {
    return this.user;
  }

  getbd() {
    return this.bd;
  }

  setVisitas(visitas) {
    this.visitas = visitas;
  }


  getVisitas() {
    return this.visitas;
  }

  setServices(services) {
    this.services = services;
  }

  getServices() {
    return this.services;
  }

  setObjetosVisita(objetosVisita) {
    this.objetosVisita = objetosVisita;
  }

  getObjetosVisita() {
    return this.objetosVisita;
  }

  setRetornosPendentes(retornosPendentes) {
    this.retornosPendentes = retornosPendentes;
  }

  getRetornosPendentes() {
    return this.retornosPendentes;
  }

  setNovosClientes(novosClientes) {
    this.novosClientes = novosClientes;
  }

  getNovosClientes() {
    return this.novosClientes;
  }


}
