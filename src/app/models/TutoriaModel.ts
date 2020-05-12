import { ITutor } from './TutorModel';
import { TichMaterias } from './tichmaterias.model';

export interface ITutoria{

    _id : Object;
    estado : string;
    materiaRef : TichMaterias;
    duracion : Number;
    preciohora : Number;
    titulo : string;
    tutorRef : ITutor;
    creado : Date; 
}

