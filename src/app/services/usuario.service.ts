import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators'; // Operador que nos permite disparar un efecto secundario
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';

import { Usuario } from '../models/usuario.model';

// Aqui llamamos al url que creamos en el envairoment
const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;

  // Creamos una propiedad para almacenar la informacion del usuario
  public usuario: Usuario;

  constructor( private http: HttpClient,
               private router: Router,
               private ngZone: NgZone ) {

    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  //Creamos un get para el uid del usuario
  get uid(): string {
    return this.usuario.uid || '';
  }

  googleInit() {

    return new Promise( resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '170424484649-8jo680p9d6ptticv8a5tkd9ef9o6jfpi.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });

    })

  }

  logout() {
    // Primero vamos a borrar el token
    localStorage.removeItem('token');

    this.auth2.signOut().then(() => {

      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
        //console.log('User signed out.');

      })
    });

  }

  /**Para proteger las rutas */
  validarToken(): Observable<boolean> {

    /**Ahora hacemos la petincion a nuestro backend */
    return this.http.get(`${ base_url }/login/renew`, {
      // Ahora necesito los headers
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( ( resp: any) => {
        //console.log(resp);

        // Destructuramos o extraemos las propiedades del objeto usuario
        const { email, google, nombre, role, img = '', uid } = resp.usuario;

        // Creamos neustra intancia del usuario e inicializamos
        this.usuario = new Usuario( nombre, email, '', img, google, role, uid);
        localStorage.setItem('token', resp.token );
        return true;
      }),

      /**El catchError atrapa el error que sucede en todo el flujo
       * del return this.http.get(`${ base_url }/login/renew`
       */
      catchError( error => of( false ))
    );
  }

  crearUsuario( formData: RegisterForm) {

    return this.http.post(`${ base_url }/usuarios`, formData)
                //todo esto nos va a devolver un observable
                .pipe(
                  /**El tap va a recibir lo que responda la funcion
                   * this.http.post(`${ base_url }/login`, formData) */
                  tap( ( resp: any ) => {
                    // Guardar en el localstorage
                    localStorage.setItem('token', resp.token )
                  })
                );

  }

  /**Aqui vamos a actualizar el perfil del usuario.
   * Se puede hacer de esta manera o tambien creando
   * una interfaz
  */
  actulizarPerfil( data: { email: string, nombre: string, role: string }) {

    data = {
      ...data,
      role: this.usuario.role
    };

    return this.http.put(`${ base_url }/usuarios/${ this.uid }`, data, {
      // Ahora necesito los headers
      headers: {
        'x-token': this.token
      }
    });

  }

  login( formData: LoginForm) {

    return this.http.post(`${ base_url }/login`, formData)
                //todo esto nos va a devolver un observable
                .pipe(
                  /**El tap va a recibir lo que responda la funcion
                   * this.http.post(`${ base_url }/login`, formData) */
                  tap( ( resp: any ) => {
                    // Guardar en el localstorage
                    localStorage.setItem('token', resp.token )
                  })
                );

  }

  loginGoogle( token ) {

    return this.http.post(`${ base_url }/login/google`, { token })
                //todo esto nos va a devolver un observable
                .pipe(
                  /**El tap va a recibir lo que responda la funcion
                   * this.http.post(`${ base_url }/login`, formData) */
                  tap( ( resp: any ) => {
                    // Guardar en el localstorage
                    localStorage.setItem('token', resp.token )
                  })
                );

  }
}
