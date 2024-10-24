import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpRoutingService } from './http-routing.service';
import { credentials } from '../interface/auth.interface';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private HttpRoutingService: HttpRoutingService,
  ) { }

  loginUser(credentials : credentials) {
    return this.HttpRoutingService.postRequest('validate' , credentials)
  }

}
