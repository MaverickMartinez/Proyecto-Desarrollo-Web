import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-registro-usuarios',
  templateUrl: './registro-usuarios.component.html',
  styleUrls: ['./registro-usuarios.component.css']
})
export class RegistroUsuariosComponent implements OnInit {
  formularioRegistro = new FormGroup({

    nombreRegistro: new FormControl('',[Validators.required, Validators.maxLength(20)]),
    apellidoRegistro: new FormControl('',[Validators.required, Validators.maxLength(20)]),
    correoRegistro: new FormControl('',[Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    claveRegistro1: new FormControl('',[Validators.required, Validators.maxLength(20)])
  
  });
  constructor() { }

  ngOnInit(): void { }

  get nombreRegistro(){
    return this.formularioRegistro.get('nombreRegistro');
  }
  get apellidoRegistro(){
    return this.formularioRegistro.get('apellidoRegistro');
  }
  get correoRegistro(){
    return this.formularioRegistro.get('correoRegistro');
  }
  get claveRegistro1(){
    return this.formularioRegistro.get('claveRegistro1');
  }
  

}
