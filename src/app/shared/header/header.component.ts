import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  // Inyectamos nuestro servicio para llamar al logout
  constructor( private usuarioService: UsuarioService ) { }

  logout() {
    this.usuarioService.logout();
  }
}
