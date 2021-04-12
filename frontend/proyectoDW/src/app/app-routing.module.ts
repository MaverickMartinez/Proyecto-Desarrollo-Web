import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RegistroUsuariosComponent } from './components/registro-usuarios/registro-usuarios.component';


const routes: Routes = [
  {path: 'registroUsuarios', component:RegistroUsuariosComponent},
  {path: 'iniciarSesion', component: IniciarSesionComponent},
  {path: 'landingPage', component:LandingPageComponent},
  {path: '', redirectTo: '/landingPage', pathMatch:'full'},
  {path: 'home', component:HomeComponent},
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
