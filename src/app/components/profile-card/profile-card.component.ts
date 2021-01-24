import {Component, Input, OnInit} from '@angular/core';
import {ProfileCardInput} from '../../model/ProfileCardInput';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {

  @Input()
  inputObj: ProfileCardInput;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.inputObj);
  }

}

