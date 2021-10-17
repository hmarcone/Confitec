import { UsuarioDetalheComponent } from './components/usuarios/usuario-detalhe/usuario-detalhe.component';
import { UsuarioListaComponent } from './components/usuarios/usuario-lista/usuario-lista.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ContatosComponent } from './components/contatos/contatos.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PerfilComponent } from './components/user/perfil/perfil.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { LoginComponent } from './components/user/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent },
    ]
  },
  { path: 'user/perfil', component: PerfilComponent },
  { path: 'usuarios', redirectTo: 'usuarios/lista' },
  {
    path: 'usuarios', component: UsuariosComponent,
    children: [
      { path: 'detalhe/:id', component: UsuarioDetalheComponent },
      { path: 'detalhe', component: UsuarioDetalheComponent },
      { path: 'lista', component: UsuarioListaComponent },
    ],
  },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'contatos', component: ContatosComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
