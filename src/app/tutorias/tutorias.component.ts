import { Component, OnInit } from '@angular/core';
import { TichmetricasService } from '../services/tichmetricas.service';
import { ITutoria } from '../models/TutoriaModel';
import { TichMaterias } from '../models/tichmaterias.model';
import { map, filter } from 'rxjs/operators';
import { Response } from '@angular/http';
import { ITutor } from '../models/TutorModel';


@Component({
  selector: 'app-tutorias',
  templateUrl: './tutorias.component.html',
  styleUrls: ['./tutorias.component.css']
})
export class TutoriasComponent implements OnInit {

  loggeduser = JSON.parse(localStorage.getItem('UserInfo'));
  nombreUsuario = this.loggeduser["nombre"];

  constructor(private rest: TichmetricasService) { }

  arrTutorias : ITutoria[];
  arrMateriasref : TichMaterias[];
  arrTutorRef : ITutor[];

  dtOptions: any = {};

  ngOnInit() {
    this.rest.getAllTutorias().subscribe(
      res => {
        this.arrTutorias = res['tutorias'];
      }
    )

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
