import { IUsuario } from './../models/AspitanteTutor';
import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../admin-dash/canvasjs-2.3.1/canvasjs.min';
import { TichmetricasService } from '../services/tichmetricas.service';
import { ITutor, IGeneric } from '../models/TutorModel';
import { Iniveles, TichMaterias } from '../models/tichmaterias.model';
import { ITutoria } from '../models/TutoriaModel';

@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.css']
})

export class AdminDashComponent implements OnInit {

  loggeduser = JSON.parse(localStorage.getItem('UserInfo'));
  nombreUsuario = this.loggeduser["nombre"];

  object : IGeneric;
  arrSolicitantes: ITutor[];
  arrTutores: ITutor[];
  arrTutorias: ITutoria[];

  nivel : string[] = ['Universidad', 'Bachillerato general', 'Bachillerato tecnológico', 'Secundaria', 'Primaria' ];

  arrTotalTutores: IUsuario [];
  arrTotalAlumnos: IUsuario [];
  arrTotalPadres: IUsuario [];
  arrMateriasTuto: TichMaterias []=[];

  totalTutores = 0;
  totalAlumnos = 0;
  totalPadres = 0;

  arrTutoresPendientes: ITutor [];
  arrTutoresAceptados: ITutor [];
  arrTutoresRechazados: ITutor [];

  totalTutoresPendientes = 0;
  totalTutoresAceptados = 0;
  totalTutoresRechazados = 0;

  totalTutoriaUni=0;
  totalTutoriaBachGen=0;
  totalTutoriaBachTec=0;
  totalTutoriaSec=0;
  totalTutoriaPri=0;

  totalTutoriaUniTutor=0;
  totalTutoriaBachGenTutor=0;
  totalTutoriaBachTecTutor=0;
  totalTutoriaSecTutor=0;
  totalTutoriaPriTutor=0;




  constructor(private rest: TichmetricasService) { }

  ngOnInit() {

    this.rest.getAllUsers()
    .subscribe(res => {

      this.arrTotalTutores = (res ['usuarios'] as IUsuario[]).filter(x => x.tipop === 'Tutor')
      this.totalTutores = this.arrTotalTutores.length;

      this.arrTotalAlumnos = (res ['usuarios'] as IUsuario[]).filter(x => x.tipop === 'Alumno')
      this.totalAlumnos = this.arrTotalAlumnos.length;

      this.arrTotalPadres = (res ['usuarios'] as IUsuario[]).filter(x => x.tipop === 'Padre')
      this.totalPadres = this.arrTotalPadres.length;

      let chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: ""
        },
        data: [{
          type: "column",
          dataPoints: [
            { y: this.totalTutores, label: "Tutores" },
            { y: this.totalAlumnos, label: "Alumnos" },
            { y: this.totalPadres, label: "Padres de Familia" }
          ]
        }]
      });
      
      chart.render();
      
    })

    this.rest.getAllAspirante()
    .subscribe(res => {
      this.object = res; 
      this.arrSolicitantes = this.object.tutores.filter( x => !x.autorizacion);
      this.totalTutoresPendientes = this.arrSolicitantes.length;

      this.arrTutores = this.object.tutores.filter( x => x.autorizacion);
      this.totalTutoresAceptados = this.arrTutores.length;

      this.arrTutoresRechazados = this.object.tutores.filter(x => !x.autorizacion && x.usuarioRef.estatus === 'Baja')
      this.totalTutoresRechazados = this.arrTutoresRechazados.length;  

      
      let chart2 = new CanvasJS.Chart("chartContainer2", {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: ""
        },
        data: [{
          type: "column",
          dataPoints: [
            { y: this.totalTutoresPendientes, label: "Tutores Pendientes de aprobacion." },
            { y: this.totalTutoresAceptados, label: "Tutores Aceptados" },
            { y: this.totalTutoresRechazados, label: "Tutores Rechazados" }
          ]
        }]
      });

      chart2.render();

    })

    this.rest.getAllTutorias()
    .subscribe(res => {
      this.arrTutorias = (res ['tutorias'] as ITutoria[]).filter(x => x.estado === 'Activa');
      for (let x of this.arrTutorias){
        this.arrMateriasTuto.push(x.materiaRef);
      }

      for (let x of this.nivel){
        let a  = this.arrMateriasTuto;
          let array= this.arrMateriasTuto.filter(y=>y.Nivel===x);

          if(x==='Universidad'){
            this.totalTutoriaUni=array.length;
          }
          else if (x==='Bachillerato general'){
            this.totalTutoriaBachGen=array.length;

          }
          else if (x==='Bachillerato tecnológico'){
            this.totalTutoriaBachTec=array.length;
          }
          else if (x==='Secundaria'){
           this.totalTutoriaSec=array.length; 
          }
          else{
            this.totalTutoriaPri=array.length;
          }
      }
    

    let chart3 = new CanvasJS.Chart("chartContainer3", {
      theme: "light2", // "light1", "light2", "dark1", "dark2"
      exportEnabled: true,
      animationEnabled: true,
      title: {
        text: ""
      },
      data: [{
        type: "pie",
        startAngle: 25,
        toolTipContent: "<b>{label}</b>: {y}",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}",
        dataPoints: [
          { y: this.totalTutoriaPri, label: "Nivel Primaria" },
          { y: this.totalTutoriaSec, label: "Nivel Secundaria" },
          { y: this.totalTutoriaBachGen, label: "Nivel Bachillerato General" },
          { y: this.totalTutoriaBachTec, label: "Nivel Bachillerato Tecnologico" },
          { y: this.totalTutoriaUni, label: "Nivel Universidad" }
        ]
      }]
     
    });

    chart3.render();
  });
  
  this.rest.getAllTutorias()
  .subscribe(res => {
    this.arrTutorias = (res ['tutorias'] as ITutoria[]).filter(x => x.estado === 'Activa');
    for (let x of this.arrTutorias){
      this.arrMateriasTuto=[];
      this.arrMateriasTuto.push(x.materiaRef);
    }

    for (let x of this.nivel){
      let a  = this.arrMateriasTuto;
        let array= this.arrMateriasTuto.filter(y=>y.Nivel===x);

        if(x==='Universidad'){
          this.totalTutoriaUniTutor=array.length;
        }
        else if (x==='Bachillerato general'){
          this.totalTutoriaBachGenTutor=array.length;

        }
        else if (x==='Bachillerato tecnológico'){
          this.totalTutoriaBachTecTutor=array.length;
        }
        else if (x==='Secundaria'){
         this.totalTutoriaSecTutor=array.length; 
        }
        else{
          this.totalTutoriaPriTutor=array.length;
        }
    }
  
    let chart4 = new CanvasJS.Chart("chartContainer4", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: ""
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: this.totalTutoriaPriTutor, label: "Nivel Primaria" },
          { y: this.totalTutoriaSecTutor, label: "Nivel Secundaria" },
          { y: this.totalTutoriaBachGenTutor, label: "Nivel Bachillerato General" },
          { y: this.totalTutoriaBachTecTutor, label: "Nivel Bachillerato Tecnologico" },
          { y: this.totalTutoriaUniTutor, label: "Nivel Universidad" }
        ]
      }]
    });


  chart4.render();
});
    
  }
}
