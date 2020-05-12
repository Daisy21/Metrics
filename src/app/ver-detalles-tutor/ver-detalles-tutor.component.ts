import { Component, OnInit } from '@angular/core';
import { ITutor, IGeneric } from '../models/TutorModel';
import { TichmetricasService } from '../services/tichmetricas.service';

@Component({
  selector: 'app-ver-detalles-tutor',
  templateUrl: './ver-detalles-tutor.component.html',
  styleUrls: ['./ver-detalles-tutor.component.css']
})
export class VerDetallesTutorComponent implements OnInit {
  userid: string;
  var: any;
  tutor: ITutor;
  arrayTutorias: IGeneric;

  //userid : string;

  constructor(private rest: TichmetricasService) {}

  ngOnInit() {
    this.userid = sessionStorage.getItem('usId');
    const usid = sessionStorage
      .getItem('usId')
      .toString()
      .substring(0, this.userid.length - 1);
    const us = usid.substring(1, usid.length);
    this.userid = us;
    this.rest.getAspirante(this.userid).subscribe(res => {
      this.tutor = res['perfil'].usuarioRef;
    });

    this.rest.getTutoriasDeTutor(this.userid).subscribe(res => {
      this.arrayTutorias = res['tutorias'];
    });
  }
}
