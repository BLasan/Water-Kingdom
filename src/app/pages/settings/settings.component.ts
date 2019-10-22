import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { comparePassword } from 'app/shared/confirm-equal-validator.directive';
import { FishDetailsService } from 'app/services/fish_details.service';
import {visibility} from '../../../scripts/visibility';
declare function  disable_search_bar():any;
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  form: any;
  visibility:any;
  isLoadedVisibility:boolean=false;
  isLoadedChangeVisibility:boolean=false;
  constructor(private fish_details_service:FishDetailsService){}

  ngOnInit() {
    disable_search_bar();
    visibility();
    this.fish_details_service.loadVisibility().subscribe((data)=>{
      this.isLoadedVisibility=true;
      this.visibility=data;
      //console.log(this.visibility[0].name)
    });

    this.form=new FormGroup({
      new_password:new FormControl('',[Validators.required,Validators.minLength(6)]),
      reEnter_password:new FormControl('',[Validators.required,comparePassword('new_password')])
  });

  }

  changeView(field:string){
    this.fish_details_service.changeVisibilityFalse(field).subscribe((data)=>{
      //console.log(data)
      this.isLoadedChangeVisibility=true;
      this.fish_details_service.loadVisibility().subscribe((data)=>{
        this.isLoadedVisibility=true;
        this.visibility=data;
        //console.log(this.visibility[0].name)
      });
    });

  }

  changeViewTrue(field:string){
    this.fish_details_service.changeVisibilityTrue(field).subscribe((data)=>{
      //console.log(data)
      this.fish_details_service.loadVisibility().subscribe((data)=>{
        this.isLoadedVisibility=true;
        this.visibility=data;
        //console.log(this.visibility[0].name)
      });
    });
  }


}
