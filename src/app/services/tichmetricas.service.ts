import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, filter, tap } from 'rxjs/operators';
import { Options } from 'selenium-webdriver/edge';
import { Observable } from 'rxjs';
import { ITutor, IGeneric } from '../models/TutorModel';
import { RequestOptions } from '@angular/http';
import { TichMaterias } from '../models/tichmaterias.model';
import { ITutoria } from '../models/TutoriaModel';
import { IUsuario } from '../models/AspitanteTutor';

@Injectable({
  providedIn: 'root'
})
export class TichmetricasService {
  // Url de produccion
  mUrlProd = '68.183.164.56:8000';
    // mUrlProd = 'localhost:8000';

  // lista de metodos
  mListaTutores = '/api/tich/tutores/';
  mListaTutor = '/api/tutor/';
  mCambioEstadoTutor = '/api/cambiodeestado/tutor/';
  mListaAspiranteTutor = '/api/aspirante/tutor/';
  mListaUsuarios = '/api/usuario/';
  mListaAlumnos = '/api/alumno/';
  mListaPadres = '/api/padre/';
  mListaTutoriasActivas = '/api/tutoria/';
  mListaTutorias = '/api/registros/tutoria/'; // Este metodo trae la lista completa, no filtra
  mListaTutoriaXTutor = '/api/tutoria/xtutor/';
  mListaTutoresDeMateria = '/api/imparte/tutor/'; // Recibe como parametro el id materia

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getData(url: string) {
    return this.http.get(url);
  }

  getToken(): string {
    return localStorage.getItem('LoginToken');
  }

  getUserIdSelectedFromTable(userid: string) {
    return userid;
  }

  getAllUsers() {
    return this.http
      .get(`http://${this.mUrlProd}${this.mListaUsuarios}`)
      .pipe(map(result => result));
  }

  getAllAspirantes(): Observable<any> {
    return this.http
      .get<any>(`http://${this.mUrlProd}${this.mListaTutores}`)
      .pipe(map(res => res.tutores));
  }

  getAllAspirante(): Observable<IGeneric> {
    return this.http.get<IGeneric>(
      `http://${this.mUrlProd}${this.mListaTutor}`
    );
  }

  getAllAspiranteTutor(): Observable<IGeneric> {
    return this.http.get<IGeneric>(
      `http://${this.mUrlProd}${this.mListaAspiranteTutor}`
    );
  }

  getAllPadres(): Observable<IGeneric> {
    return this.http.get<IGeneric>(
      `http://${this.mUrlProd}${this.mListaPadres}`
    );
  }

  getTutoresAceptados(): Observable<IGeneric> {
    return this.http.get<IGeneric>(
      `http://${this.mUrlProd}${this.mListaTutor}`
    );
  }

  getAspiranteById(userId: string): Observable<ITutor> {
    return this.getAllAspirante().pipe(
      map(x => x.tutores.find(p => p.usuarioRef.email === userId))
    );
  }

  getAspirante(userId: string): Observable<ITutor> {
    return this.http.get<ITutor>(
      `http://${this.mUrlProd}${this.mListaUsuarios}${userId}`
    );
  }

  getTutoriasDeTutor(userId: string): Observable<IGeneric> {
    return this.http.get<IGeneric>(
      `http://${this.mUrlProd}${this.mListaTutoriaXTutor}${userId}`
    );
  }

  getMaterias(userId: string): Observable<TichMaterias[]> {
    const x = this.getAspiranteById(userId);
    const z = x.pipe(map(x => x.materiasImparte));
    return z;
  }

  getAllAlumnos() {
    return this.http
      .get(`http://${this.mUrlProd}${this.mListaAlumnos}`)
      .pipe(map(result => result));
  }

  getAllTutorias(): Observable<ITutoria> {
    return this.http.get<ITutoria>(
      `http://${this.mUrlProd}${this.mListaTutorias}`
    );
  }

  deleteUser(userId: string) {
    const params = new HttpParams().set('', userId);
    return this.http
      .delete(`http://${this.mUrlProd}${this.mListaUsuarios}`, { params })
      .subscribe(result => console.log(result), err => console.error(err));
  }

  // TODO aqui tengo que meter el proceso de aceptacion para tutores
  updateAutorizacion(userId: String, status: Boolean) {
    return this.http
      .post(`http://${this.mUrlProd}${this.mCambioEstadoTutor}`, {
        status: status,
        id: userId
      })
      .subscribe(result => console.log(result), err => console.error(err));
  }

  getTutoresListFromMateria(materiaId: String): Observable<any> {
    return this.http.post<any>(
      `http://${this.mUrlProd}${this.mListaTutoresDeMateria}`,
      JSON.stringify({ materia: materiaId }),
      this.httpOptions
    );
  }
}
