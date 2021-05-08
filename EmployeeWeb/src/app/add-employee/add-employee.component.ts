import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  @Output() employeeCreated = new EventEmitter<any>();
  @Input() employeeInfo: any;

  public buttonText = 'Save';

  constructor() {
    this.clearemployeeInfo();
    console.log(this.employeeInfo.date);
  }

  ngOnInit() {

  }

  private clearemployeeInfo = function() {
    this.employeeInfo = {
      id: undefined,
      name: '',
      address: '',
      phoneNumber: '',
      position:''
    };
  };

  public addOrUpdateemployeeRecord = function(event) {
    this.employeeCreated.emit(this.employeeInfo);
    this.clearemployeeInfo();
  };

}
