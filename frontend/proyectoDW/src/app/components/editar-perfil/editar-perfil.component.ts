import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {
  formularioEditarPerfil = new FormGroup({
    nombre: new FormControl('',[Validators.required, Validators.maxLength(30)]),
    correoEditar: new FormControl('',[Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    claveEditar1: new FormControl('',[Validators.required, Validators.maxLength(30)]),
    claveEditar2: new FormControl('',[Validators.required, Validators.maxLength(30)]),
    nuevoPlan: new FormControl('',[Validators.required])
  
  });
  constructor() { }

  ngOnInit(): void { }

}
