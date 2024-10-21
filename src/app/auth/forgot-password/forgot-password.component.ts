import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
// import { AuthService } from 'src/app/services/auth.service';
// import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-forgot-password',
  // standalone: true,
  // imports: [],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit {
  userNotFound!: string;
  authservice: any;
  snackbarService: any;

  constructor(private formBuilder: FormBuilder,
    // private authservice: AuthService,
    // private snackbarService: SnackbarService,
    private router: Router) { }
  forgetform!: FormGroup;

  ngOnInit(): void {
    this.forgotforms();
  }

  forgotforms() {
    this.forgetform = this.formBuilder.group({
      'Email': [null, [Validators.required, Validators.email]],
    })
  }


  forgot() {
    this.authservice.forgotpassword(this.forgetform.value).subscribe({
      next: (response: any) => {
        if (response.status) {
          this.showSnackbar(response.message);
          this.router.navigate(['/'])
        }
        // console.log("resp===>", response)
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
      }
    });
  }

  showSnackbar(message: string): void {
    const config = {
      duration: 5000,
      horizontalPosition: 'end' as MatSnackBarHorizontalPosition, // Customize as needed
      verticalPosition: 'bottom' as MatSnackBarVerticalPosition, // Customize as needed
    };

    this.snackbarService.show(message, config);
  }
}
