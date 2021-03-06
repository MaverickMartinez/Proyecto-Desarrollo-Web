import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private modalService:NgbModal) { }

  ngOnInit(): void { }

  //Funciones del componente home

  modalOpcionesUsuario(modal){
    this.modalService.open(modal,
      {
        size:'xs',
        centered:false
      }
      );
  }
}
