import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { UsuarioService } from './../../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { Usuario } from './../../../models/Usuario';

@Component({
  selector: 'app-usuario-detalhe',
  templateUrl: './usuario-detalhe.component.html',
  styleUrls: ['./usuario-detalhe.component.css']
})
export class UsuarioDetalheComponent implements OnInit {

  usuario = {} as Usuario;
  form!: FormGroup;
  estadoSalvar = 'post';

  get f(): any {
    return this.form.controls;
  }

  get bsConfig(): any {
    return {
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY hh:mm a',
      containerClass: 'theme-default',
      showWeekNumbers: false
    };
  }


  constructor(
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private router: ActivatedRoute,
    private usuarioService: UsuarioService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  )
  {
    this.localeService.use('pt-br');
  }

  public carregarUsuario(): void {
    const usuarioIdParam = this.router.snapshot.paramMap.get('id');

    if (usuarioIdParam !== null) {
      this.spinner.show();

      this.estadoSalvar = 'put';

      this.usuarioService.getUsuarioById(+usuarioIdParam).subscribe(
        (usuario: Usuario) => {
          this.usuario = {...usuario};
          this.form.patchValue(this.usuario);
        },
        (error: any) => {
          this.spinner.hide();
          this.toastr.error('Erro ao tentar carregar usuário.', 'Erro!');
          console.error(error);
        },
        () => this.spinner.hide(),
      );
    }
  }

  ngOnInit() {
    this.carregarUsuario();
    this.validation();
  }

  public validation(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(256)]],
      sobreNome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(256)]],
      email: ['', [Validators.required, Validators.email]],
      dataNascimento: ['', Validators.required],
      // escolaridade: ['', [Validators.required, Validators.max(120000)]]
      escolaridade: ['', [Validators.required]]
    });
  }

  public resetForm(): void {
    this.form.reset();
  }

  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }

  public salvarAlteracao(): void {
    this.spinner.show();
    if (this.form.valid) {

      this.usuario = (this.estadoSalvar === 'post')
                ? {...this.form.value}
                : {id: this.usuario.id, ...this.form.value};

      if (this.estadoSalvar === 'post'){
        this.usuarioService[this.estadoSalvar](this.usuario).subscribe(
          () => this.toastr.success('Usuário salvo com Sucesso!', 'Sucesso'),
          (error: any) => {
            console.error(error);
            this.spinner.hide();
            this.toastr.error('Error ao salvar usuário', 'Erro');
          },
          () => this.spinner.hide()
        );
      }else{
        this.usuarioService['put'](this.usuario).subscribe(
          () => this.toastr.success('Usuário salvo com Sucesso!', 'Sucesso'),
          (error: any) => {
            console.error(error);
            this.spinner.hide();
            this.toastr.error('Error ao salvar usuário', 'Erro');
          },
          () => this.spinner.hide()
        );

      }
    }
  }

}
