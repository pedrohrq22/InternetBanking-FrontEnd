import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})

export class LoginComponent implements OnInit {

  // @Input() cpf;
  @Output() cpf = new EventEmitter();

  loginForm: FormGroup;

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  constructor(
    private formBuilder: FormBuilder,
    private autorizacao: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      cpf: ['', [Validators.required, Validators.maxLength(11)]],
      senha: ['', [Validators.required]]
    })
  }

  login() {
    const cpfDigitado = this.loginForm.get('cpf').value;
    const senha = this.loginForm.get('senha').value;
    
    var cpfEmiter = {
      cpf:cpfDigitado
    }
    this.cpf.emit(cpfEmiter);

    this.autorizacao.autenticar(cpfDigitado, senha)
      .subscribe(() => this.router.navigate(['feed']),
        err => { alert("CPF ou Senha inválidos."); this.loginForm.reset() });
  }
}
