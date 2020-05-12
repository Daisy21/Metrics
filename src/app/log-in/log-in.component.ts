import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TichmetricasService } from '../services/tichmetricas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
  providers: [TichmetricasService]
})
export class LogInComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(private formBuilder: FormBuilder) {}

  inicioSesion(correo: string, pass: string): void {
    event.preventDefault();

    var data = {};
    data['email'] = correo;
    data['pass'] = pass;

    // fetch('http://localhost:8000/api/login/', {
    fetch('http://68.183.164.56:8000/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        if (data['login']) {
          localStorage.setItem('LoginToken', data['token']);
          localStorage.setItem('UserInfo', JSON.stringify(data['usuario']));
          var user = JSON.parse(localStorage.getItem('UserInfo'));
          window.location.replace('/inicioDashAdmin');
        } else {
          document.getElementById('login_Message').innerHTML =
            'Usuario o contraseña incorrectos';
          document.getElementById('login_Message').style.visibility = 'visible';
        }
      })
      .catch(err => {
        // document.getElementById('login_Message').innerHTML = 'Usuario o contraseña incorrectos';
        // document.getElementById('btnFireModalMessage').click();
      });
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    alert('SUCCESS!! :-)');
  }
}
