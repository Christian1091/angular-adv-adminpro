import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css'  ]
})

export class RegisterComponent {

  public formSubmitted = false;

  // Definimos el formulario
  public registerForm = this.fb.group({

    /**Si es que queremos una sola validacion podemos quitar los corchetes, si son mas van dentro de ellos */
    nombre:['Christian', [ Validators.required, Validators.minLength(3) ]],
    email: ['test100@gmail.com', [ Validators.required, Validators.email ] ],
    password: ['1234', Validators.required ],
    password2: ['1234', Validators.required ],
    terminos: [ true, Validators.required ],
  }, {
    validators: this.passwordsIguales('password', 'password2')
  });


  constructor( private fb: FormBuilder,
               private UsuarioService: UsuarioService,
               private router: Router ) { }

  crearUsuario(){
    this.formSubmitted = true;
    console.log( this.registerForm.value );

    if( this.registerForm.invalid ){
      return;
    }

    // Si el formulario es valido, realizar el posteo
    this.UsuarioService.crearUsuario( this.registerForm.value )
        .subscribe( resp =>  {
          // console.log('usuario creado')
          // console.log(resp);
          // Navegar al dashboard
          this.router.navigateByUrl('/');

    }, (err) => {
      // Si sucede un error
      Swal.fire('Error', err.error.msg, 'error');
    });
  }

  campoNoValido( campo: string ): boolean {

    if( this.registerForm.get(campo).invalid && this.formSubmitted ){
      return true;
    }else{
      return false;
    }
  }

  contrasenasNoValidas(){
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    /**Ponemos this.formSubmitted para que nos aparezca la alerta cuando demos click en el boton*/
    if( (pass1 !== pass2) && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }
  }

  aceptaTerminos(){
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }

  /**Aqui creamos una funcion para que nos regrese un objeto si nos da un error
   * y nos regrese null si no nos da errores
  */
  passwordsIguales(pass1Name: string, pass2Name: string){

    return ( formGroup: FormGroup ) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if( pass1Control.value === pass2Control.value ) {
        pass2Control.setErrors(null)
      } else {
        pass2Control.setErrors({ noEsIgual: true })
      }
    }

  }

}
