import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.scss']
})
export class TituloComponent implements OnInit {

  @Input() titulo = '';
  @Input() iconClass = 'fa fa-user';
  @Input() subtitulo = 'Desde 2021';
  @Input() botaoListar = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  listar(): void {
    debugger
    console.log(`/${this.titulo.toLocaleLowerCase().replace("á","a")}/lista`);
    this.router.navigate([`/${this.titulo.toLocaleLowerCase().replace("á","a")}/lista`]);
  }
}
