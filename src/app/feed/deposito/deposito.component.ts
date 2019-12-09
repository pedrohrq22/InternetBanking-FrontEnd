import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { DepositoService } from './deposito.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Transacao } from 'src/app/Models/Transacao';
import { InfoContaService } from '../infos-conta/Infos-conta.service';

@Component({
  selector: 'app-deposito',
  templateUrl: './deposito.component.html',
  styleUrls: ['./deposito.component.css']
})
export class DepositoComponent {

  saldoAtual: number;
  
  form: FormGroup = new FormGroup({
    valor: new FormControl('')
  });

  indexCPF : number;
  numeroConta: number;
  senha: string;

  constructor(private _formBuilder: FormBuilder,
    private servico: DepositoService,
    private infoContaService: InfoContaService,
     private router: Router,
     private http: HttpClient,
     private activatedRoute: ActivatedRoute){}
    getIndexCPF() {
  
      const getCpf = this.activatedRoute.snapshot.paramMap.get('cpf');
  
      return this.infoContaService.getInfoCliente()
        .subscribe(clientex =>
          console.log(getCpf,
            this.indexCPF = clientex.findIndex(obj =>
              obj.cpf == getCpf))
        );
    }
  
    onInfoConta() {
      return this.infoContaService.getInfoConta()
        .subscribe(clientex =>
          this.numeroConta = clientex[this.indexCPF].numeroConta,
        );
    }
  
    onSenhaConta() {
      return this.infoContaService.getInfoConta()
        .subscribe(clientex =>
          this.senha = clientex[this.indexCPF].senhaTransacoes,
        );
    }

  onDeposito(){
    this.getIndexCPF();
    this.onInfoConta();

    const cpf = this.activatedRoute.snapshot.paramMap.get("cpf");
    const transacao1 = this.form.getRawValue() as Transacao;
    transacao1.numeroConta = this.numeroConta;
    transacao1.idTipoTransacao = 1;
    transacao1.numeroContaDestino = this.numeroConta;

    this.servico.Deposito(transacao1).subscribe(() => this.router.navigate(['feed/' + cpf]), err => console.log(err));
  }

  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();

}