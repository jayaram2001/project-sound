import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpRoutingService } from './http-routing.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

<<<<<<< Updated upstream
  constructor(private http: HttpClient) { }
  EditData(a: any, b: any) {
    return this.http.post('http://localhost:3000/verify', {});
  }
=======
  constructor(
    private httpService: HttpRoutingService,
    private httpClient: HttpClient,
    private httpRouting: HttpRoutingService
  ) {}

>>>>>>> Stashed changes
}
