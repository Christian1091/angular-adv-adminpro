export class Usuario {

  /** El ?: significa que va hacer opcional */

  constructor(
    public nombre: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role?: string,
    public uid?: string,
  ) {

  }
}
