import { TichMaterias } from './tichmaterias.model';
import { IUsuario } from './AspitanteTutor';


export interface IAlumno {

    _id : Object;
    gradoEscolar : Number;
    materiasInteres : TichMaterias [];
    calificacionPromedio : Number;
    vecesCalificado : Number;
    usuarioRef : IUsuario;
    
}