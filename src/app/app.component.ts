import { Component, VERSION } from '@angular/core';
import {SudokuService, BOARD} from './sudoku.service';
import {getRandomConfig} from './generator';
import {Observable, BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  
  constructor() {
  }

}