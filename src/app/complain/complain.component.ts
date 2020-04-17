import { Component, OnInit } from '@angular/core';
import {IComplain} from '../entities/icomplain';
import {IUser_moderator} from '../entities/iuser_moderator'
import {IUser} from '../entities/iuser'
import { UserService } from '../services/user.service';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import { ComplainService } from '../services/complain.service';

@Component({
  selector: 'app-complain',
  templateUrl: './complain.component.html',
  styleUrls: ['./complain.component.css']
})
export class ComplainComponent implements OnInit {
  complain: IComplain = {
    complainId : null,
    user :  {
      userId : null,
      fio : '',
      email : '',
      phoneNumber : '',
      numberOfComplaints: null,
      isBan : null
    },
    adresat: {

      userId : null,
      fio : '',
      email : '',
      phoneNumber : '',
      numberOfComplaints: null,
      isBan : null

    },
    text: ''
  }

  private subscription: Subscription;
  
  constructor(private userService: UserService,private route: ActivatedRoute, private complainService: ComplainService, private router: Router) {
    userService.getUserForPro().subscribe(
      res => {
        this.complain.user.fio = res["fio"];
        this.complain.user.phoneNumber = res["phoneNumber"];
      },
      err=>{
        alert("Пользоваель не найден!");
      }
      );
    this.subscription = route.params.subscribe(params=>
    {
      this.complain.adresat.userId=params['adresatId'];
      userService.getUserById(params['adresatId']).subscribe(
        res=>{
          this.complain.adresat.fio = res['fio'];
          this.complain.adresat.email = res['email'];
          this.complain.adresat.phoneNumber = res['phoneNumber'];
          
        },
        err=>{
          alert("Адресат не найден")
          
        }
      )
    });
    
    
  }

  ngOnInit(): void {
  }
  
  sendComplain(){
    this.complainService.postComplain(this.complain.adresat.userId,this.complain).subscribe(
      res=> {
        console.log(res['complainId']);
        this.complain.text = '';
        
      },
        err=>{
          alert("Жалоба не отправлена")
        
        });
   
      console.log( this.route.parent);
      this.router.navigate(['']);


    
  }
  

}
