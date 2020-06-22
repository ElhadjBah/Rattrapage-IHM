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
    this.getData();
    
  }

  //Bouton de génération de plateau
  generateBoard() {
    this.sudokuService.generateBoard();
  }

  //Lorsqu'on choisi un chiffre
  onOptionSelected(index: number){
    this.selectedButtonIndex = index+1;
  }

  //Lorsqu'on clique sur "Effacer"
  onDeleteSelected(){
    this.selectedButtonIndex = null;
    const lastBoard = this.sudokuService.getLastBoard();
    this.processData(lastBoard);
  }

  isPlayableCell(i: number, j: number, v: number): boolean{
    return this.sudokuService.canPlay(i,j,v);
  }

  onSelectedCell(i: number, j: number, v: number){
   this.sudokuService.play(i, j, this.selectedButtonIndex);
  }

  getData(){
     this.sudokuService.boardObs.subscribe((result)=> {
      this.processData(result);
    });
  }

  processData(board: BOARD){
    this.grid = board.grid;
      this.size = board.size;
      if (this.size == 9) {
        this.gridClass = 's9';
      } else if (this.size == 4) {
        this.gridClass = 's4'
      }
  }
}
