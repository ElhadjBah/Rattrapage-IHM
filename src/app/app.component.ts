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
  
  constructor(public sudokuService: SudokuService) {
  }
  grid: number [][];
  size: number;
  gridClass: string;
  selectedButtonIndex: number;

  ngOnInit(){
    /* this.sudokuService.generateBoard(); */
    this.sudokuService.boardObs.subscribe((result)=> {
      this.grid = result.grid;
      this.size = result.size;
      if (this.size == 9) {
        this.gridClass = 's9';
      } else if (this.size == 4) {
        this.gridClass = 's4'
      }
    });
    this.sudokuService.play(0, 1, 7);
  }

  //Bouton de génération de plateau
  generateBoard() {
    this.sudokuService.generateBoard();
  }

  //Lorsqu'on choisi un chiffre
  onOptionSelected(index: number){
    this.selectedButtonIndex = index;
  }

  //Lorsqu'on clique sur "Effacer"
  onDeleteSelected(){
    this.selectedButtonIndex = null;
  }

  isPlayableCell(i: number, j: number, v: number): boolean{
    console.log(this.sudokuService.canPlay(i,j,v),v);
    return this.sudokuService.canPlay(i,j,v);
  }
}
