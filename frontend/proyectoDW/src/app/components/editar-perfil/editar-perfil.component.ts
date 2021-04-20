import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {
  formularioEditarPerfil = new FormGroup({
    nombre: new FormControl('',[Validators.required, Validators.maxLength(20)]),
    apellido: new FormControl('',[Validators.required, Validators.maxLength(20)]),
    correoEditar: new FormControl('',[Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    claveEditar: new FormControl('',[Validators.required, Validators.maxLength(20)]),
    nuevoPlan: new FormControl('',[Validators.required])
  });
  constructor() { }

  ngOnInit(): void { }
  get nombre(){
    return this.formularioEditarPerfil.get('nombre');
  }
  get apellido(){
    return this.formularioEditarPerfil.get('apellido');
  }

  get correoEditar(){
    return this.formularioEditarPerfil.get('correoEditar');
  }

  get  claveEditar(){
    return this.formularioEditarPerfil.get('claveEditar');
  }

  get  nuevoPlan(){
    return this.formularioEditarPerfil.get('nuevoPlan');
  }

}
