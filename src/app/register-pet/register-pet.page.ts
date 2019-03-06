import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ActionSheetController } from '@ionic/angular';

import { PetsService } from '../common/pets.service';
import { Pet } from '../common/pet';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { DatePicker } from '@ionic-native/date-picker/ngx';

@Component({
  selector: 'app-register-pet',
  templateUrl: './register-pet.page.html',
  styleUrls: ['./register-pet.page.scss'],
})
export class RegisterPetPage implements OnInit {

  registerPetForm: FormGroup;
  petImage: string;

  constructor(private fb: FormBuilder, private petsService: PetsService, private router: Router,
              private camera: Camera, private filePath: FilePath, private webView: WebView, private datePicker: DatePicker,
              private actionSheetController: ActionSheetController) { }

  ngOnInit() {
    this.createRegisterPetForm();
  }

  async createRegisterPetForm() {
    const date = await this.formatDate(new Date());
    this.registerPetForm = this.fb.group({
      occurrence: ['', Validators.required],
      species: ['', Validators.required],
      petName: [''],
      reporterName: ['', Validators.required],
      occurrenceDate: [date, Validators.required],
      breed: [''],
      gender: [''],
      temper: [''],
      occurrenceLocation: ['', Validators.required]
    });
  }

  formatDate(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    const year = date.getFullYear();

    if (day < 10) {
      day = `0${day}`;
    }

    if (month < 10) {
      month = `0${month}`;
    }

    if (month === 13) {
      month = '01';
    }

    return `${day}/${month}/${year}`;
  }

  async showPhotoActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Faça upload de uma imagem',
      buttons: [{
        text: 'Fototeca',
        icon: 'image',
        handler: () => {
          this.savePhoto(2);
        }
      }, {
        text: 'Camera',
        icon: 'camera',
        handler: () => {
          this.savePhoto(1);
        }
      }, {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {}
      }]
    });
    await actionSheet.present();
  }

  savePhoto(sourceType) {
    const cameraOptions: CameraOptions = {
      destinationType: 0,
      sourceType: sourceType
    };

    this.camera.getPicture(cameraOptions).then(res => {
      this.petImage = `data:image/jpeg;base64,${res}`;
    }).catch(err => console.log(err));
  }

  showDatePicker() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(res => {
      this.registerPetForm.controls['occurrenceDate'].setValue(this.formatDate(res));
    });
  }

  onSubmit() {
    const pet = this.registerPetForm.value;
    pet.petPhoto = this.petImage;
    this.petsService.registerPet(pet as Pet);
    this.resetRegisterPetForm();
  }

  resetRegisterPetForm() {
    this.registerPetForm.reset();
    this.registerPetForm.controls['occurrenceDate'].setValue(this.formatDate(new Date()));
    this.petImage = '';

    this.router.navigate(['/home']);
  }

}
