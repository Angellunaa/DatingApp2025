import { Component, inject, output, signal } from '@angular/core';
import { RegisterCreds } from '../../../types/user';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../../../core/services/account-service';
import { JsonPipe } from '@angular/common';
import { TextInput } from "../../../shared/text-input/text-input";

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, JsonPipe, TextInput],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  private accountService = inject(AccountService);
  private fb = inject(FormBuilder);
  protected creds = {} as RegisterCreds;
  protected credentialsForm: FormGroup;
  protected profileForm: FormGroup;
  protected currentStep = signal(1);
  cancelRegister = output<boolean>();

  private readonly EMAIL_REGEX = '([\\w-+]+(?:\\.[\\w-+]+)*@(?:[\\w])+(?:\\.[a-zA-Z]{2,5}){1,2})';
  
  constructor() {
    this.credentialsForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.EMAIL_REGEX)]],
      displayName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    });

    this.profileForm = this.fb.group({
      gender: ['', Validators.required],
      birthDay: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
    });

    this.credentialsForm.controls['password'].valueChanges.subscribe(() => {
      this.credentialsForm.controls['confirmPassword'].updateValueAndValidity();
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const parent = control.parent;
      if(!parent) return null;
      const matchValue = parent.get(matchTo)?.value;
      return control.value === matchValue ? null : { passwordMismatch: true };
    }
  }

  nextStep() {
    if (this.credentialsForm.valid) {
      this.currentStep.update(prevStep => prevStep + 1);
    }
  }

  prevStep() {
    this.currentStep.update(prevStep => prevStep - 1);
  }

  getMaxDate() {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 18);
    return today.toISOString().split('T')[0];
  }

  register(): void {
    console.group("REGISTER");
    console.log(this.credentialsForm.value);
    console.log(this.profileForm.value);
    console.log(this.currentStep());
    console.groupEnd();

    if(this.credentialsForm.valid && this.profileForm.valid) {
      const FormData = {...this.credentialsForm.value, ...this.profileForm.value};

      console.log('Form Data:', FormData);
    }

    //this.accountService.register(this.creds).subscribe({
    //  next: response => {
    //    console.log(response);
    //    this.cancel();
    //  },
    //  error: error => console.log(error)
    //});
  }
  
  cancel(): void {
    this.cancelRegister.emit(false);
  }
}
