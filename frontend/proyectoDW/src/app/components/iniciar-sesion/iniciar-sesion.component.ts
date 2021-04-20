import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {
formularioIniciarSesion = new FormGroup({
  correoInicio: new FormControl('',[Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
  claveInicio: new FormControl('',[Validators.required, Validators.maxLength(20)]),

});
  constructor() { }

  ngOnInit(): void { }

  get correoInicio(){
    return this.formularioIniciarSesion.get('correoInicio');
  }

  get claveInicio(){
    return this.formularioIniciarSesion.get('claveInicio');
  }
}
