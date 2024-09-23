import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
    logForm!: FormGroup<{ userName: FormControl<string | null>; password: FormControl<string | null>; }>;
    ngOnInit(){
      this.logForm = new FormGroup({
        userName: new FormControl('' , Validators.required),
        password: new FormControl('' , [Validators.required , Validators.email])
      })
    }
}
