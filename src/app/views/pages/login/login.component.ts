import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private routingservice:Router,private modalService: NgbModal,private formbulid: FormBuilder,private authService: AuthService, private tokenStorage: TokenStorageService) { }
  loginForm!: FormGroup;
  registerForm!: FormGroup;

  closeResult = '';

  ngOnInit(): void { 
     this.loginForm = this.formbulid.group({
    password: ['', [Validators.required]],

    email: ['mail@example.com', [Validators.required, Validators.email]]
  })
  this.registerForm = this.formbulid.group({
    password: ['', [Validators.required]],

    email: ['mail@example.com', [Validators.required, Validators.email]]
  })
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }
  onSubmitregister(): void {
    let user= this.registerForm.controls["email"].value  
   let pass =this.registerForm.controls["password"].value
     this.authService.register(user ,pass).subscribe(
       data => {
          
         this.reloadPage();
       },
       err => {
         this.errorMessage = err.error.message;
         this.isLoginFailed = true;
       }
     );
   }
  onSubmit(): void {
   let user= this.loginForm.controls["email"].value  
  let pass =this.loginForm.controls["password"].value
    this.authService.login(user ,pass).subscribe(
      data => {
        this.tokenStorage.saveToken(data.access_token);
        this.tokenStorage.saveRefreshToken(data.refresh_token);
        data.user=user
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
      //  this.roles = this.tokenStorage.getUser().roles;
      this.routingservice.navigateByUrl('/dashboard')


      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  reloadPage(): void {
    window.location.reload();
  }
}
