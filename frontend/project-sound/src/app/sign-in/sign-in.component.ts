import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { credentials } from '../interface/auth.interface';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
    logForm!: FormGroup<{ email: FormControl<string | null>; password: FormControl<string | null>; }>;
    constructor (private authService : AuthService) { }
    ngOnInit(){
      this.logForm = new FormGroup({
        password: new FormControl('' , [Validators.required , Validators.nullValidator]),
        email: new FormControl('' , [Validators.required , Validators.email , Validators.nullValidator])
      })
    }
    submitForm(){
      if(this.logForm.valid ){
        const credentials = this.logForm.value as credentials;
        this.authService.loginUser(credentials).subscribe(x => {console.log(x)});
      }
    }
}
