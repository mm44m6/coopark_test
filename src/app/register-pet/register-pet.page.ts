import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { RegisterPetService } from './register-pet.service';
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
  cameraOptions: CameraOptions = {
    destinationType: 0
  };

  constructor(public fb: FormBuilder, public registerPetService: RegisterPetService,
              public camera: Camera, public filePath: FilePath, public webView: WebView, public datePicker: DatePicker) { }

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

  takePhoto() {
    this.camera.getPicture(this.cameraOptions).then(res => {
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
    this.registerPetService.createDocument(pet as Pet);
    console.log(pet);
  }

}
