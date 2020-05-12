import { Component, OnInit } from '@angular/core';
import { TichmetricasService } from '../services/tichmetricas.service';
import { ITutor, IGeneric } from '../models/TutorModel';

@Component({
  selector: 'app-tutores-tabla',
  templateUrl: './tutores-tabla.component.html',
  styleUrls: ['./tutores-tabla.component.css']
})
export class TutoresTablaComponent implements OnInit {
  loggeduser = JSON.parse(localStorage.getItem('UserInfo'));
  nombreUsuario = this.loggeduser['nombre'];

  constructor(private rest: TichmetricasService) {}

  arrTutores: ITutor[];
  object: IGeneric;

  dtOptions: any = {};

  getUserIdSelected(data: string) {
    this.rest.getUserIdSelectedFromTable(data);
    sessionStorage.setItem('usId', JSON.stringify(data));
  }

  ngOnInit() {
    this.rest.getTutoresAceptados().subscribe(res => {
      this.object = res;
      this.arrTutores = this.object.tutores;      
    });

    this.dtOptions = {
      dom: 'Bfrtip',
      buttons: ['pdf', 'print', 'excel']
    };
  }
}
