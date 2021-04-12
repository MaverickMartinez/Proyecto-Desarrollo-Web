import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditarPerfilComponent } from './components/editar-perfil/editar-perfil.component';
import { HomeComponent } from './components/home/home.component';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { PerfilUsuariosComponent } from './components/perfil-usuarios/perfil-usuarios.component';
import { RegistroUsuariosComponent } from './components/registro-usuarios/registro-usuarios.component';


const routes: Routes = [
  {path: 'registroUsuarios', component:RegistroUsuariosComponent},
  {path: 'iniciarSesion', component: IniciarSesionComponent},
  {path: 'landingPage', component:LandingPageComponent},
  {path: '', redirectTo: '/landingPage', pathMatch:'full'},
  {path: 'home', component:HomeComponent},
  {path: 'landingPage', component:LandingPageComponent},
  {path: 'perfilUsuario', component:PerfilUsuariosComponent},
  {path: 'editarUsuario', component:EditarPerfilComponent}

  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
