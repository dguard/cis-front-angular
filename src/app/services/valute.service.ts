import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class ValuteService {
  loading = true;

  constructor(
    private http: HttpClient,
  ) { }


  getValutes(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    return this.http.get<any>(
      'http://127.0.0.1:8000/api/v1/valutes/?page_size=50',
      { headers: headers }
    );
  }

}
