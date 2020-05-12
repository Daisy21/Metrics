import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TichmetricasService } from '../services/tichmetricas.service';
import { ITutoria } from '../models/TutoriaModel';
import { ITutor, IGeneric } from '../models/TutorModel';
import { TichMaterias } from '../models/tichmaterias.model';

@Component({
  selector: 'app-view-detail-user',
  templateUrl: './view-detail-user.component.html',
  styleUrls: ['./view-detail-user.component.css']
})
export class ViewDetailUserComponent implements OnInit {
  loggeduser = JSON.parse(localStorage.getItem('UserInfo'));
  nombreUsuario = this.loggeduser['nombre'];

  constructor(private rest: TichmetricasService) {}

  dtOptions: any = {};

  userid: string;
  arrayTutorias: IGeneric;
  arrUsuarioSeleccionado: ITutor[];
  arrMateriasSeleccionadas: TichMaterias[];

  usuarioSeleccionado: ITutor;

  aspiranteTutor: ITutor;

  ngOnInit() {
    this.userid = sessionStorage.getItem('usId');
    const usid = sessionStorage
      .getItem('usId')
      .toString()
      .substring(0, this.userid.length - 1);
    const us = usid.substring(1, usid.length);
    this.userid = us;
    this.rest.getAspirante(this.userid).subscribe(res => {
      this.aspiranteTutor = res['perfil'].usuarioRef;
    });

    this.rest.getTutoriasDeTutor(this.userid).subscribe(res => {
      this.arrayTutorias = res['tutorias'];
    });

    this.dtOptions = {
      dom: 'Bfrtip',
      buttons: ['pdf', 'print', 'excel']
    };
  }

  acceptTutor() {
    this.rest.updateAutorizacion(this.aspiranteTutor._id.toString(), true);
  }

  declineTutor() {
    this.rest.updateAutorizacion(this.aspiranteTutor._id.toString(), false);
  }
}
