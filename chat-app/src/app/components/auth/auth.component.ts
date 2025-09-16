import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {MatIconModule} from "@angular/material/icon"
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import { SocketService } from '../../services/socket.service';
import {CookieService} from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  imports: [CommonModule,MatIconModule,ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
  providers:[CookieService]
})
export class AuthComponent {
  cookieService = inject(CookieService);
  isSigninSectionAppear:boolean = true;
  isPasswordLock:boolean = true;
  signupData = new FormGroup({
    username:new FormControl(''),
    password:new FormControl(''),
    usernameError:new FormControl(''),
    passwordError:new FormControl('')
  }); 
  constructor(private socketService:SocketService,private  router:Router){
    if(this.cookieService.get("TOKEN")){
      this.router.navigate(['/']);
    }
  }
  ngOnInit(){
  }
  passwordTypeChange(num:number){
    num == 0?this.isPasswordLock = true:this.isPasswordLock=false;
  }
  passwordChange(){
    this.signupData.get('passwordError')?.setValue('');
  }
  usernameChange(){
    this.signupData.get('usernameError')?.setValue('');
  }
  submitBtn(){
    //can't be empty
    if(this.signupData.get('username')?.value != '' && this.signupData.get('password')?.value != '' ){
      let data = {
        username:this.signupData.get('username')?.value,
        password:this.signupData.get('password')?.value
      }
      //creating account
      this.socketService.createAccount<{status:string}>(data).then((res:any)=>{
        if(res.status == '200'){
          this.cookieService.set('TOKEN',res.token,{expires:2});
          this.socketService.token = res.token;
          this.router.navigate(['/']);

        }else if(res.status == "201"){
          this.signupData.get('usernameError')?.setValue('username exists');
        }
        else{
          console.log('unexpected error occur');
        }
      }).catch((error)=>{console.log('error')})
    }
  }
}
