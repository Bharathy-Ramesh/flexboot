import { Injectable } from '@angular/core';
import{ Observable, BehaviorSubject, of} from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference
} from '@angular/fire/firestore';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database'
import { Users } from './users.model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersLists: AngularFireList<any>;
  userList: AngularFireObject<any>;
  getLists :any;
  constructor(private db : AngularFireDatabase) { 
  }
  AddStudent(user: Users) {
    this.usersLists = this.db.list('/list');
    var userkey = firebase.database().ref().push();
    var key = userkey.ref.key;
    this.usersLists.push({
      name: user.name,
      password: user.password,
      email: user.email
    })
  }

  GetStudentsList():Observable<any>{
    this.getLists = this.db.list('list').snapshotChanges();
    return this.getLists;    
  }

  UpdateStudent(user: Users, id:any) {
    var setval = {
      name: user.name,
      password: user.password,
      email: user.email
    };
    firebase.database().ref().child('/list/'+id).update(setval);
  }

  DeleteUser(id: string){ 
    debugger;
    // this.usersLists = this.db.list('/list/'+id);
    // this.usersLists.remove();
    firebase.database().ref().child('/list/'+id).remove();
  }

  public listdet = [];
  private detlist = new BehaviorSubject(this.listdet);

  currentlist = this.detlist.asObservable();
  changeMessage(details: any) {
    this.detlist.next(details);
    }

}
