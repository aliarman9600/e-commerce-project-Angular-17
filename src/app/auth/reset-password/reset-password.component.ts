import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
// import { AuthService } from 'src/app/services/auth.service';
// import { SnackbarService } from 'src/app/services/snackbar.service';
// import { UserProfileService } from 'src/app/services/user-profile.service';


@Component({
  selector: 'app-reset-password',
  // standalone: true,
  // imports: [],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {
  userNotFound!: string;
  authservice: any;
  snackbarService: any;
  constructor(private formBuilder: FormBuilder,
    // private authservice: AuthService,
    // private snackbarService: SnackbarService,
    // private userservice: UserProfileService,
    private router: Router) { }
  resetform!: FormGroup;

  ngOnInit(): void {
    this.forgotforms();
  }

  forgotforms() {
    this.resetform = this.formBuilder.group({
      'Password': [null, Validators.required],
      'newPassword': [null, Validators.required],
    })
  }

  dark = true
  hide = true


  submitresetpassword() {
    const dynamicId = '66b20bade5f1ecac2f0fe2e8';
    this.authservice.resetpassword(dynamicId, this.resetform.value).subscribe({
      next: (response: any) => {
        if (response.status) {
          this.showSnackbar(response.message);
          this.router.navigate(['/']);
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
      complete: () => { }
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
