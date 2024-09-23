import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  isVerified:boolean = false
  signUp!: FormGroup<{ email: FormControl<string | null>; username: FormControl<string | null>; password: FormControl<string | null>; confirmpassword: FormControl<string | null>; otp: FormControl<string | null>; }>;
  ngOnInit(){
    this.signUp = new FormGroup({
      email: new FormControl('' , Validators.required),
      username: new FormControl('' ,Validators.required),
      password: new FormControl('' , Validators.required),
      confirmpassword: new FormControl('' ,Validators.required),
      otp: new FormControl('' ,Validators.required)
    })
  }
  isLoading:boolean = false;

}
