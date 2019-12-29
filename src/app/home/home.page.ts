import { Component } from '@angular/core';
import { isNumber } from 'util';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
  
export class HomePage {

  value: string;
  oldValue: string;
  lastOperator: string;
  isReadyForNewInput: boolean;
  numberGroups: any[]; //data type is any bcoz this array store both numbers and strings
  
  constructor()
  {
    this.value = '0';
    this.oldValue = '0';
    this.lastOperator = '';
    this.isReadyForNewInput = true;
    this.numberGroups = [
      [7, 8, 9, '/'], [4, 5, 6, 'x'], [1, 2, 3, '-'], ['c', 0, '=', '+']
    ];
  }
  
  onButtonPress(symbol)
  {
    if (isNumber(symbol))
    {
      if (this.isReadyForNewInput) {
        this.value = '' + symbol;
      }

      else {
        this.value = this.value + '' + symbol;
      }
      this.isReadyForNewInput = false;   
    }

    else if (symbol === 'c') {
      
      this.value = '0';
      this.isReadyForNewInput = true;
    }
      
    else if (symbol === '=') {
      
      if (this.lastOperator === 'x'){
        this.value = '' + (parseInt(this.oldValue) * parseInt(this.value));
      }
      else if (this.lastOperator === '-') {
        this.value = '' + (parseInt(this.oldValue) - parseInt(this.value));
      }
      else if (this.lastOperator === '+') {
        this.value = '' + (parseInt(this.oldValue) + parseInt(this.value));
      }
      else if (this.lastOperator === '/') {
        this.value = '' + (parseInt(this.oldValue) / parseInt(this.value));
      }
      this.isReadyForNewInput = true;
    }
    else { //operator

      this.oldValue = this.value;
      this.lastOperator = symbol;
      this.isReadyForNewInput = true;
    }
  }
}
