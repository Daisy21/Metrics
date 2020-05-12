import { TichMaterias } from './../models/tichmaterias.model';
import { TichmetricasService } from './../services/tichmetricas.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, zip } from 'rxjs';
import { IGeneric, ITutor } from '../models/TutorModel';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-materias-tabla',
  templateUrl: './materias-tabla.component.html',
  styleUrls: ['./materias-tabla.component.css'],
  providers: [TichmetricasService]
})
export class MateriasTablaComponent implements OnInit {
  loggeduser = JSON.parse(localStorage.getItem('UserInfo'));
  nombreUsuario = this.loggeduser['nombre'];

  url = 'http://68.183.164.56:8000/api/materia/';
  // url = 'http://localhost:8000/api/materia/';
  arrMaterias: TichMaterias[];
  arrMateriasAspirantes: TichMaterias[] = [];
  arrMateriasTutores: TichMaterias[] = [];

  dtOptions: any = {};
  arrSolicitantes: ITutor[];
  arrTutores: ITutor[];
  object: IGeneric;
  tutoresAspirantes: any[] = [];
  constructor(private rest: TichmetricasService) {}

  setMateriaId(data: string) {
    sessionStorage.setItem('matId', data);
  }

  getAllMaterias(): void {
    this.rest
      .getData(this.url)
      .subscribe(
        data => (this.arrMaterias = data['materias'] as TichMaterias[])
      );
  }

  ngOnInit() {
    this.getAllMaterias();
    this.dtOptions = {
      dom: 'Bfrtip',
      buttons: ['pdf', 'print', 'excel']
    };
  }
}
