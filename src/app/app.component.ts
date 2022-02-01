import { Component } from '@angular/core';
import { FormControl, FormArray, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { UserService } from './user.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'flexboot';
  signform:FormGroup;
  submitted = false;
  userdet:any = [];
  update:any;
  constructor(public form:FormBuilder, public list : UserService){
    this.signform = this.form.group({
      "name":new FormControl('',Validators.required),
      "password":new FormControl('',Validators.required),
      "email":new FormControl('', [Validators.required, Validators.email])
   })
  }
  sigup(){
    console.log(this.signform);
    this.submitted = true;
    if(this.signform.status == "VALID")
    {
    if(!this.update) {
      this.list.AddStudent(this.signform.value);
      this.userdet.push(this.signform.value);
      this.list.changeMessage(this.userdet);
    }else{
      this.list.UpdateStudent(this.signform.value, this.update);
    }
    this.signform.reset();
    this.submitted = false;
   }
 }
   get f() { return this.signform.controls; }
   updateform(data:any){
     debugger;
      this.signform.controls['name'].setValue(data.name);
      this.signform.controls['password'].setValue(data.password);
      this.signform.controls['email'].setValue(data.email);
      this.update = data.$key;

   }
}
