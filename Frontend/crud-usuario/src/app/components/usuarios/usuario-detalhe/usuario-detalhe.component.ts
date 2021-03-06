import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DateValidator } from 'src/app/helpers/ValidatorDate';

import { Usuario } from './../../../models/Usuario';
import { UsuarioService } from './../../../services/usuario.service';

@Component({
  selector: 'app-usuario-detalhe',
  templateUrl: './usuario-detalhe.component.html',
  styleUrls: ['./usuario-detalhe.component.css'],
})
export class UsuarioDetalheComponent implements OnInit {
  usuario = {} as Usuario;
  form!: FormGroup;
  estadoSalvar = 'post';

  escolaridades: any[] = [
    { id: '1', name: 'Infantil' },
    { id: '2', name: 'Fundamental' },
    { id: '3', name: 'Ensino Médio' },
    { id: '4', name: 'Ensino Superior' },
  ];

  get f(): any {
    return this.form.controls;
  }

  get bsConfig(): any {
    return {
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY hh:mm a',
      containerClass: 'theme-default',
      showWeekNumbers: false,
    };
  }

  constructor(
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private routerActivate: ActivatedRoute,
    private usuarioService: UsuarioService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private changeDetector: ChangeDetectorRef,
    private router: Router
  ) {
    this.localeService.use('pt-br');
  }

  public carregarUsuario(): void {
    const usuarioIdParam = this.routerActivate.snapshot.paramMap.get('id');

    if (usuarioIdParam !== null) {
      this.spinner.show();

      this.estadoSalvar = 'put';

      this.usuarioService.getUsuarioById(+usuarioIdParam).subscribe(
        (usuario: Usuario) => {
          this.usuario = { ...usuario };
          this.form.patchValue(this.usuario);
        },
        (error: any) => {
          this.spinner.hide();
          this.toastr.error('Erro ao tentar carregar usuário.', 'Erro!');
          console.error(error);
        },
        () => this.spinner.hide()
      );
    }
  }

  ngOnInit() {
    this.carregarUsuario();
    this.validation();
  }

  public validation(): void {
    this.form = this.fb.group({
      nome: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(256),
        ],
      ],
      sobreNome: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(256),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      dataNascimento: ['', [Validators.required, DateValidator()]],
      escolaridade: [null, [Validators.required]],
    });
  }

  public resetForm(): void {
    this.form.reset();
  }

  public cssValidator(campoForm: FormControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  public salvarAlteracao(): void {
    this.spinner.show();
    if (this.form.valid) {
      this.usuario =
        this.estadoSalvar === 'post'
          ? { ...this.form.value }
          : { id: this.usuario.id, ...this.form.value };

      this.usuarioService[this.estadoSalvar](this.usuario).subscribe(
        () => {
          this.toastr.success('Usuário salvo com Sucesso!', 'Sucesso');
          this.router.navigate([`usuarios/lista`]);
        },
        (error: any) => {
          console.error(error);
          this.spinner.hide();
          this.toastr.error('Error ao salvar usuário', 'Erro');
        },
        () => this.spinner.hide()
      );
    }
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }
}
