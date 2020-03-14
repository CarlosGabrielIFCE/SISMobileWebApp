import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdicionarHorarioPage } from './adicionar-horario';

@NgModule({
  declarations: [
    AdicionarHorarioPage,
  ],
  imports: [
    IonicPageModule.forChild(AdicionarHorarioPage),
  ],
})
export class AdicionarHorarioPageModule {}
