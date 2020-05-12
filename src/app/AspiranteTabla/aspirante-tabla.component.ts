import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TichMaterias } from '../models/tichmaterias.model';
import { TichmetricasService } from '../services/tichmetricas.service';
import { ITutor, IGeneric } from '../models/TutorModel';

@Component({
  selector: 'app-aspirante-tabla',
  templateUrl: './aspirante-tabla.component.html',
  styleUrls: ['./aspirante-tabla.component.css']
})
export class AdminTablesComponent implements OnInit {
  loggeduser = JSON.parse(localStorage.getItem('UserInfo'));
  nombreUsuario = this.loggeduser['nombre'];

  constructor(private rest: TichmetricasService) {}

  arrSolicitantes: any[];
  arrMaterias: TichMaterias[];
  object: IGeneric;

  dtOptions: any = {};

  getUserIdSelected(data: string) {
    this.rest.getUserIdSelectedFromTable(data);
    sessionStorage.setItem('usId', JSON.stringify(data));
  }

  deleteUserById(userId: string) {
    this.rest.deleteUser(userId);
  }

  ngOnInit() {
    this.rest.getAllAspiranteTutor().subscribe(res => {
      console.log('Aqui tengo el response: ' + JSON.stringify(res));

      this.object = res;
      this.arrSolicitantes = this.object.tutores;
    });

    this.dtOptions = {
      dom: 'Bfrtip',
      buttons: ['pdf', 'print', 'excel']
    };
  }
}
