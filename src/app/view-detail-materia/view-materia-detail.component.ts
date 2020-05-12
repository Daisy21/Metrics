import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TichmetricasService } from '../services/tichmetricas.service';
import { ITutoria } from '../models/TutoriaModel';
import { ITutor, IGeneric } from '../models/TutorModel';
import { TichMaterias } from '../models/tichmaterias.model';

@Component({
  selector: 'app-view-detail-materia',
  templateUrl: './view-materia-detail.html'
})
export class ViewDetailMateriaComponent implements OnInit {
  //   loggeduser = JSON.parse(localStorage.getItem('UserInfo'));
  //   nombreUsuario = this.loggeduser['nombre'];

  constructor(private rest: TichmetricasService) {}

  filtertagstut = { autorizacion: true };
  filtertagsasp = { autorizacion: false };

  materiaID: string;
  arrayTutores: any;
  arrayAceptados = [];
  arrayAspirantes = [];
  counterAspirantes = 0;
  counterAceptados = 0;

  ngOnInit() {
    this.materiaID = sessionStorage.getItem('matId');

    this.rest.getTutoresListFromMateria(this.materiaID).subscribe(res => {
      this.arrayTutores = res['tutores'];
      this.arrayAceptados = this.arrayTutores.filter(el => {
        return el.autorizacion === true;
      });
      this.arrayAspirantes = this.arrayTutores.filter(el => {
        return el.autorizacion === false;
      });
      this.counterAspirantes = this.arrayAspirantes.length;
      this.counterAceptados = this.arrayAceptados.length;
    });
  }
}
