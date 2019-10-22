import { Component, OnInit } from '@angular/core';
import { LoginValidationsService } from 'app/services/login-validations.service';
import { error } from '@angular/compiler/src/util';
import { Router } from '@angular/router';
import { RemembermeService } from 'app/services/remember_me.service';
declare function redirect_to_dashboard():any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  success:any;
  error_login:boolean=false;
  session_timeout:boolean=false;
  constructor(private login_validations:LoginValidationsService,private _router:Router,private remember_me_serivice:RemembermeService) { }

  ngOnInit() {

    try{
      if(localStorage.getItem('remember_me')){
        (<HTMLInputElement>document.getElementById('email')).value=localStorage.getItem('remember_me');
        (<HTMLInputElement>document.getElementById('remember_user')).checked=true;
      }
  
      if(localStorage.getItem('session')=='timeout'){
        this.session_timeout=true;
      }
    }catch(e){

    }
    
  }

  isAdmin(){
    let email,password,remember_token;
    try{
      email=(<HTMLInputElement>document.getElementById('email')).value;
      password=(<HTMLInputElement>document.getElementById('password')).value;
      remember_token=(<HTMLInputElement>document.getElementById('remember_user')).checked;
  
      if(remember_token){
        this.remember_me_serivice.setRememberToken(email)
      }
  
      else{
        this.remember_me_serivice.removeRememberToken();
      }
  
    }catch(e){

    }finally{
      this.login_validations.checkCredentials(email,password).subscribe((response)=>{
        this.success=response;
  
        if(this.success.success){
          this.login_validations.logIn();
          redirect_to_dashboard();
        }
        else{
          this.error_login=true;
          (<HTMLInputElement>document.getElementById('password')).value=null;
        }
  
      },(err)=>{
        console.log(err);
      });
    }

  }



}
