export class RegisterForm {
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public confirmPassword: string;

  constructor(registerForm: any) {
    this.firstName = registerForm.email || '';
    this.lastName = registerForm.email || '';
    this.email = registerForm.email || '';
    this.password = registerForm.password || '';
    this.confirmPassword = registerForm.confirmPassword || '';
  }
}
