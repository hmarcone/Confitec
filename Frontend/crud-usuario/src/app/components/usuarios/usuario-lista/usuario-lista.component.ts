import { Router } from '@angular/router';
import { Usuario } from './../../../models/Usuario';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { UsuarioService } from './../../../services/usuario.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-usuario-lista',
  templateUrl: './usuario-lista.component.html',
  styleUrls: ['./usuario-lista.component.css']
})
export class UsuarioListaComponent implements OnInit {

  modalRef!: BsModalRef;
  public usuarios: Usuario[] = [];
  public usuariosFiltrados: Usuario[] = [];
  public usuarioId = 0;

  private filtroListado = '';

  public get filtroLista(): string {
    return this.filtroListado;
  }

  public set filtroLista(value: string) {
    console.log(value);
    this.filtroListado  = value;
    this.usuariosFiltrados = this.filtroLista ? this.filtrarUsuarios(this.filtroLista) : this.usuarios;
  }

  public filtrarUsuarios(filtrarPor: string): Usuario[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.usuarios.filter((usuario: { nome: string; sobreNome: string; }) => usuario.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
    usuario.sobreNome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  constructor(
    private usuarioService: UsuarioService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.carregarUsuarios();
  }

  public carregarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
        this.usuariosFiltrados = this.usuarios;
      },
      error: (error: any) =>
      {
        this.spinner.hide();
        this.toastr.error('Erro ao Carregar os Usuários', 'Erro!');
      },
      complete: () => this.spinner.hide()
    });
  }

  openModal(event: any, template: TemplateRef<any>, usuarioId: number): void {
    event.stopPropagation();
    this.usuarioId = usuarioId;

    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef.hide();
    this.spinner.show();

    this.usuarioService.deleteUsuario(this.usuarioId).subscribe(
      (result: any) => {
        if (result.message === 'Deletado') {
          this.toastr.success('O Usuário foi deletado com Sucesso.', 'Deletado!');
          this.carregarUsuarios();
        }
      },
      (error: any) => {
        console.error(error);
        this.toastr.error(`Erro ao tentar deletar o usuário ${this.usuarioId}`, 'Erro');
      }
    ).add(() => this.spinner.hide());
  }

  decline(): void {
    this.modalRef.hide();
  }

  detalheUsuario(id: number): void{
    this.router.navigate([`usuarios/detalhe/${id}`]);
  }

}
