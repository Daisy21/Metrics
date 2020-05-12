import { TichMaterias } from './tichmaterias.model';
import { IUsuario } from './AspitanteTutor';


export interface ITutor {

    _id : Object;
    calificacionPromedio : Number;
    vecesCalificado : Number;
    autorizacion : Boolean;
    gradoEscolar : string;
    disponibilidad : string;
    materiasImparte : TichMaterias [];
    usuarioRef : IUsuario;
    
}

export interface IGeneric {
    ok : string;
    tutores : ITutor[];
}