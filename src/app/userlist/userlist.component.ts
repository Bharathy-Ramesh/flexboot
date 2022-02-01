import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../user.service';
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  @Input() details:any;
  @Output() updatedetail = new EventEmitter<any>();
  det:any; 
  constructor(public list : UserService) { }

  ngOnInit(): void {
    var a = this.list.GetStudentsList().subscribe((res : any)=>{
      this.det = [];
      console.log('come',res);
      res.forEach((element:any, index:any) => {
        var data = element.payload.val()
        data["$key"] = element.key;
        this.det.push(data);
        
      });
    });
    this.list.currentlist.subscribe( (x) => {
      this.det.push(x);
      console.log(this.det);
    })
  }
  deleteuser(userdet:any){
    debugger;
    this.list.DeleteUser(userdet.$key);
  }
  updateuser(userdata:any){
    this.updatedetail.emit(userdata);
  }

}
