import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
// import { AuthService } from 'src/app/services/auth.service';
// import { SnackbarService } from 'src/app/services/snackbar.service';
// import * as storage from "src/app/core/utilityFunctions/storage";


@Component({
  selector: 'app-login',
  // standalone: true,
  // imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  [x: string]: any;
  userNotFound!: string;
  constructor(
    private formBuilder: FormBuilder,
    // private authservice: AuthService,
    private router: Router,
    // private snackbarService: SnackbarService
  ) { }

  loginform!: FormGroup;

  ngOnInit(): void {
    this.amaan();
  }
  amaan() {
    this.loginform = this.formBuilder.group({
      'Email': [null, [Validators.required, Validators.email]],
      'Password': [null, [Validators.required]],
      'Accept': [null]
    })
  }

  dark = true
  hide = true

  login() {
    // this.authservice.login(this.loginform.value).subscribe
    ({
      next: (response: any) => {
        // if (response.status) {
        //   storage.session.setItem('auth', response.data)
        //   this.authservice.setCurrentUser(response.data);
        //   this.showSnackbar(response.message);
        //   this.router.navigate(['/'])
        // }
      },
      error: (error: any) => {
        if (error) {
          this.userNotFound = error.message;
          setTimeout(() => {
            this.userNotFound = '';
          }, 3000);
          this.showSnackbar(error.message);
        }
      },
      complete: () => {
        console.log('Request complete');
      }
    });
  }

  showSnackbar(message: string): void {
    const config = {
      duration: 3000,
      horizontalPosition: 'end' as MatSnackBarHorizontalPosition, // Customize as needed
      verticalPosition: 'bottom' as MatSnackBarVerticalPosition, // Customize as needed
    };

    // this.snackbarService.show(message, config);
  }
}
