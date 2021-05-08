import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service'
import * as _ from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public employeeData: Array<any>;
  public currentEmployee: any;

  constructor(private employeeService: EmployeeService) {
    employeeService.get().subscribe((data: any) => this.employeeData = data);
    this.currentEmployee = this.setInitialValuesForEmployeeData();
  }

  private setInitialValuesForEmployeeData () {
    return {
      id: undefined,
      name: '',
      address: '',
      phoneNumber: '',
      position:''
    }
  }

public createOrUpdateEmployee = function(employee: any) {

    let employeeWithId;
    employeeWithId = _.find(this.employeeData, (el => el.id === employee.id));

    if (employeeWithId) {
      const updateIndex = _.findIndex(this.employeeData, {id: employeeWithId.id});
      this.employeeService.update(employee).subscribe(
        employeeRecord =>  this.employeeData.splice(updateIndex, 1, employee)
      );
    } else {
      this.employeeService.add(employee).subscribe(
        employeeRecord => this.employeeData.push(employee)
      );
    }

    this.currentEmployee = this.setInitialValuesForEmployeeData();
  };

  public editClicked = function(record) {
    console.log(record);
    this.currentEmployee = record;
  };

  public newClicked = function() {
    this.currentEmployee = this.setInitialValuesForEmployeeData(); 
  };

  public deleteClicked(record) {
    const deleteIndex = _.findIndex(this.employeeData, {id: record.id});
    this.employeeService.remove(record).subscribe(
      result => this.employeeData.splice(deleteIndex, 1)
    );
  }

  ngOnInit() {
  }

}
