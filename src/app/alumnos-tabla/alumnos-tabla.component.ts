import { Component, OnInit } from '@angular/core';
import { TichmetricasService } from '../services/tichmetricas.service';
import { IAlumno } from '../models/AlumnoModel';

@Component({
  selector: 'app-alumnos-tabla',
  templateUrl: './alumnos-tabla.component.html',
  styleUrls: ['./alumnos-tabla.component.css']
})
export class AlumnosTablaComponent implements OnInit {

  loggeduser = JSON.parse(localStorage.getItem('UserInfo'));
  nombreUsuario = this.loggeduser["nombre"];

  constructor(private rest: TichmetricasService) { }

  arrAlumnos : IAlumno[];
  
  dtOptions: any = {};

  

  ngOnInit(){

    this.rest.getAllAlumnos()
    .subscribe(res => {
      this.arrAlumnos = (res ['alumnos'] as IAlumno[])
    })

    this.dtOptions = {
      dom: 'Bfrtip',
      buttons:[
        'pdf',
        'print',
        'excel'
      ]
    }

  }

}
