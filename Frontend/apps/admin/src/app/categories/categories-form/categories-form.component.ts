import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [
  ]
})

export class CategoriesFormComponent implements OnInit {
  
  form: FormGroup;
  isSubmitted = false;
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      icon: ['',Validators.required],
      name: ['',Validators.required],
    })

   }

  ngOnInit(): void {
  }
  onSubmit(){
    this.isSubmitted=true;
    if(this.form.invalid){
      return;
    }
    console.log(this.categoryForm.name.value);
    console.log(this.categoryForm.icon.value);
  }

  get categoryForm() {
    return this.form.controls;
  }

}
