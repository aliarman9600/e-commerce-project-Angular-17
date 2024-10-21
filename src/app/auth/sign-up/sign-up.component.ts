import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
// import { AuthService } from 'src/app/services/auth.service';
// import { SnackbarService } from 'src/app/services/snackbar.service';
// import * as storage from "src/app/core/utilityFunctions/storage";


@Component({
  selector: 'app-sign-up',
  // standalone: true,
  // imports: [],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {
  hide = true;
  dark = true;
  hide1 = true;
  dark1 = true;
  signupform!: FormGroup
  snackbarService: any;
  authService: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router) {

  }


  ngOnInit(): void {
    this.amaanform();
  }
  amaanform() {
    this.signupform = this.formBuilder.group({
      "FirstName": [null, [Validators.required]],
      "LastName": [null, [Validators.required]],
      "Email": [null, [Validators.required, Validators.email]],
      "Password": [null, [Validators.required]],
      "ConfirmPassword": [null, [Validators.required]],
      "Accept": [null],
    });
  }
  
  signup() {
    // console.log(this.signupform.value)
    this.authService.singup(this.signupform.value).subscribe({
      next: (response: { status: any; data: any; message: any; }) => {
        if(response.status){
          // storage.session.setItem('auth', response.data)
          this.authService.setCurrentUser(response.data);
          this.showSnackbar(response.message);
          this.router.navigate(['/'])
        }
      },
      error: (error: { fields: { message: any; }; }) => {
        if(error){
          this.showSnackbar(error.fields.message);
        }
      },
      complete: () => {
        // console.log('Request complete');
      }
    });
  }
  showSnackbar(message: any) {
    const config = {
      duration: 3000,
      horizontalPosition: 'end' as MatSnackBarHorizontalPosition, // Customize as needed
      verticalPosition: 'bottom' as MatSnackBarVerticalPosition, // Customize as needed
    };

    this.snackbarService.show(message, config);
  }

}
