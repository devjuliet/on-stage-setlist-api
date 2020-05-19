export class UserClass {
  idUser: number;
  name: string;
  email: string;
  password: string;
  type: number;
  username: string;

  constructor() {}

  init(
    id: number,
    nam: string,
    em: string,
    pass: string,
    ty: number,
    user: string,
  ) {
    this.idUser = id;
    this.name = nam;
    this.email = em;
    this.password = pass;
    this.type = ty;
    this.username = user;
  }
}
