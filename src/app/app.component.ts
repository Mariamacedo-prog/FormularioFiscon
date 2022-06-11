import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {DataSource} from '@angular/cdk/collections';
import {Observable, ReplaySubject} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  telefone: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen huhuabd n adhuhudhudahu dahuadhuuhuad huadhhuadhuhuhuad hudahuhuadhuhuad',  telefone: 1.0079},
  {position: 2, name: 'Helium',  telefone: 4.0026},
  {position: 3, name: 'Lithium',  telefone: 6.941}
];


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Formulário Fiscon';
  displayedColumns: string[] = ['position', 'name', 'telefone'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  columnsToDisplay: string[] = this.displayedColumns.slice();

  formData = new FormGroup(
    {
      position: new FormControl(1),
      name: new FormControl('', [Validators.required]),
      telefone: new FormControl('', [Validators.required]),
    }
  )


  maskTel(e: any, code: any){
    console.log(code)
    let replacedValue = e.value.replace(/[a-zA-Z]/g,"");
    if(replacedValue.length >= 1){
      if(replacedValue.length === 1){
        if(code !== 8){
          replacedValue = "("+ replacedValue
        }
      }

      if(replacedValue.length === 3){
        if(code !== 8){
          replacedValue =  replacedValue +") ";
        }
      }

      if(replacedValue[5] == 9){
        if(replacedValue.length === 10){
          if(code !== 8){
            replacedValue =  replacedValue +"-";
          }
        }
      }

      if(replacedValue[5] != 9){
        if(replacedValue.length === 9){
          if(code !== 8){
            replacedValue =  replacedValue +"-";
          }
        }
     }
   }
    this.formData.patchValue({
      telefone: replacedValue,
    })
  }
  onSubmitFormData(){
    let newItem = this.formData.getRawValue();

    if(this.dataSource.data.length > 0){
      newItem.position =  this.dataSource.data[this.dataSource.data.length - 1].position + 1    
    }
    if(newItem.name !== '' && newItem.telefone !== ''){
      this.dataSource.data = [...this.dataSource.data, newItem];

      this.formData.patchValue({
        position: this.dataSource.data.length > 0 ?this.dataSource.data.length + 1: 1,
        name: '',
        telefone: '',
      })
    }
  }
  
  removeData() {
   let removedItem = this.dataSource.data.slice(0, -1);
   this.dataSource.data = [ ...removedItem ]
  }

  applyFilter(e: Event ){
    const filterValue = (e.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log()
  }

  shuffle() {
    let currentIndex = this.columnsToDisplay.length;
    while (0 !== currentIndex) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      let temp = this.columnsToDisplay[currentIndex];
      this.columnsToDisplay[currentIndex] = this.columnsToDisplay[randomIndex];
      this.columnsToDisplay[randomIndex] = temp;
    }
  }

  clearFormData(){
    console.log(this.formData.getRawValue())
    this.formData.patchValue({
      position: this.dataSource.data.length > 0 ?this.dataSource.data.length + 1: 1,
      name: '',
      telefone: '',
    })
  }
  value = 'Clear me';
}
