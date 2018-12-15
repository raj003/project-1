import { Component, OnInit, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Injectable()

export class HandleUserDataService {
    IncomingUserData: any;
    public userDataHandler = new Subject<any>();
    constructor(private http:Http) {

    }

    getUserData(data){
        this.IncomingUserData = data;
        this.userDataHandler.next(data);
       
    }

}