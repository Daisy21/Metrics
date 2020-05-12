import { Component, OnInit } from '@angular/core';
import { TichmetricasService } from '../services/tichmetricas.service';
import { IUsuario } from '../models/AspitanteTutor';

@Component({
  selector: 'app-padres-tabla',
  templateUrl: './padres-tabla.component.html',
  styleUrls: ['./padres-tabla.component.css']
})
export class PadresTablaComponent implements OnInit {

  loggeduser = JSON.parse(localStorage.getItem('UserInfo'));
  nombreUsuario = this.loggeduser["nombre"];

  constructor(private rest: TichmetricasService) { }

  arrPadres: IUsuario[];

  dtOptions: any = {};

  ngOnInit() {
    this.rest.getAllPadres().subscribe(
      res => {
        this.arrPadres = res['padres'];
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
