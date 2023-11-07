import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { LoginModel } from '../models/login.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage{
  formData : {username:string, password:string} = {
    username: '',
    password: ''
  };

  usuarios: LoginModel[] = [];


  constructor(private router : Router, private toastController: ToastController) { 

    this.usuarios.push(new LoginModel('fernando', '12345'));
    this.usuarios.push(new LoginModel('admin', 'pass'));
    this.usuarios.push(new LoginModel('amonosriki', 'contra'));

  }

  login(){
    const username = this.formData.username;
    const password = this.formData.password;
    let c : boolean = false;

    for(let i = 0; i<this.usuarios.length; i++){
      if(this.usuarios[i].username === username && this.usuarios[i].password === password)
       {
        this.goToTab1();
        c = true;
        return
       } else {
        c = false;
       }
    }

    if(this.formData.username.trim() === '' || this.formData.password.trim() === ''){
      this.presentToast('Los campos usuario y contraseña NO pueden estar vacíos.');
    }
    if(!c) {
      this.presentToast('Tu usuario o contraseña son incorrectos. Inserta credenciales correctas');
    }
  }

  async presentToast(texto:string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }
  goToTab1() {
    this.router.navigateByUrl('/tabs/tab1');
  }

}
