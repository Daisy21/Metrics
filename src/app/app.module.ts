import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminTablesComponent } from './AspiranteTabla/aspirante-tabla.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { LogInComponent } from './log-in/log-in.component';
import { ViewDetailUserComponent } from './view-detail-user/view-detail-user.component';
import { TutoresTablaComponent } from './tutores-tabla/tutores-tabla.component';
import { AlumnosTablaComponent } from './alumnos-tabla/alumnos-tabla.component';
import { PadresTablaComponent } from './padres-tabla/padres-tabla.component';
import { MateriasTablaComponent } from './materias-tabla/materias-tabla.component';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';
import { VerDetallesTutorComponent } from './ver-detalles-tutor/ver-detalles-tutor.component';
import { TutoriasComponent } from './tutorias/tutorias.component';
import { TichmetricasService } from './services/tichmetricas.service';
import { ViewDetailMateriaComponent } from './view-detail-materia/view-materia-detail.component';

const appRoutes: Routes = [
  { path: '', component: LogInComponent },
  { path: 'inicio', component: LogInComponent },
  { path: 'inicioDashAdmin', component: AdminDashComponent },
  { path: 'aspirantesTabla', component: AdminTablesComponent },
  { path: 'VerDetallesAspirantes', component: ViewDetailUserComponent },
  { path: 'tutoresTabla', component: TutoresTablaComponent },
  { path: 'alumnosTabla', component: AlumnosTablaComponent },
  { path: 'padreTabla', component: PadresTablaComponent },
  { path: 'materiasTabla', component: MateriasTablaComponent },
  { path: 'VerDetallesTutor', component: VerDetallesTutorComponent },
  { path: 'tutoriasTabla', component: TutoriasComponent },
  { path: 'detalleMateria', component: ViewDetailMateriaComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AdminTablesComponent,
    AdminDashComponent,
    LogInComponent,
    ViewDetailUserComponent,
    TutoresTablaComponent,
    AlumnosTablaComponent,
    PadresTablaComponent,
    MateriasTablaComponent,
    VerDetallesTutorComponent,
    TutoriasComponent,
    ViewDetailMateriaComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true, onSameUrlNavigation: 'reload' } // <-- debugging purposes only
    ),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DataTablesModule,
    ReactiveFormsModule
  ],
  providers: [TichmetricasService],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule {}
