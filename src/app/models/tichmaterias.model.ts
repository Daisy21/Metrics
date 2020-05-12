
export interface TichMaterias{
    _id : Object;
    Nivel : string;
    categoria : string;
    Materia : string;
    gradocritico : string;
    tTutoresAceptados  : number;
    tTutoresAspirantes : number;
}

export interface contTutores{
    tTutoresAceptados  : number;
    tTutoresAspirantes : number;
}

export interface Iniveles{
    Nivel :  string;
}