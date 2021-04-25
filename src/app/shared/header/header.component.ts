import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  /**
   * Instanciamos nuestro modelo para llamar a nuestros atributos
   * en este caso la imagen y el nombre en el html
   */
   public usuario: Usuario;

  // Inyectamos nuestro servicio para llamar al logout
  constructor( private usuarioService: UsuarioService ) {
    this.usuario = usuarioService.usuario;
   }

  logout() {
    this.usuarioService.logout();
  }
}
