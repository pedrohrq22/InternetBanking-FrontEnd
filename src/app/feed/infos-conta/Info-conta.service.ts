import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ContaCorrente } from 'src/app/Models/ContaCorrente';
// import { Conta } from 'src/app/Models/Conta';

const api = this.URL + " api/ContaCorrente";

export class InfoContasService {

    constructor(private http: HttpClient, @Inject('URL') private Url: string) { }

    GetInfoCliente(): Observable<ContaCorrente[]> {
        return this.http.get<ContaCorrente[]>(this.Url);
    }
}