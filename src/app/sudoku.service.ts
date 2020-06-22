import {Injectable} from '@angular/core';
import {getRandomConfig, CONFIG, COORD} from './generator';
import {BehaviorSubject, Observable} from 'rxjs';

export interface BOARD {
  size: number;     // Taille de la grille
  grid: number[][]; // Une matrice size x size. La valeur 0 indique que la case n'a pas encore été remplie
}

@Injectable({
  providedIn: 'root',
})
export class SudokuService {
  private boardSubj = new BehaviorSubject<BOARD>( {
    size: 9,
    grid: [
      [3, 0, 6, 5, 0, 8, 4, 0, 0],
      [5, 2, 0, 0, 0, 0, 0, 0, 0],
      [0, 8, 7, 0, 0, 0, 0, 3, 1],
      [0, 0, 3, 0, 1, 0, 0, 8, 0],
      [9, 0, 0, 8, 6, 3, 0, 0, 5],
      [0, 5, 0, 0, 9, 0, 6, 0, 0],
      [1, 3, 0, 0, 0, 0, 2, 5, 0],
      [0, 0, 0, 0, 0, 0, 0, 7, 4],
      [0, 0, 5, 2, 0, 6, 3, 0, 0]
      ]
  } );
  readonly boardObs = this.boardSubj.asObservable();

  constructor() {
  }

  /* generateBoard génère un nouveau plateau et le publie via bordSubj
   * Le plateau est généré en faisant appel à la fonction getRandomConfig
   * qui est spécifiée dans le fichier generator.ts
   */
  async generateBoard() {
    // à compléter
  }

  // canPlay renvoie vrai si, dans le plateau B, il est possible d'inscrire la valeur v
  // v n'est pas présent sur la ligne i, ni sur la colonne j, ni dans le bloc contenant la case (i, j)
  // Le plateau courant est accessible via this.boardSubj.value
  canPlay(i: number, j: number, v: number): boolean {
    // à compléter
    console.log('hello');
    // on divise la grille en différents blocs
    for(let i = 0; i < this.boardSubj.value.size; i++) {
      
    }
    
    if (this.boardSubj.value[i])
    return false;
  }

  // play(i, j, v) inscrit la valeur v dans la case (i, j) si canplay(i, j, v)
  // play publie un nouveau plateau dans ce cas via la méthode next de l'attribut boardSubj
  play(i: number, j: number, nv: number) {
    // à compléter
  }

}
