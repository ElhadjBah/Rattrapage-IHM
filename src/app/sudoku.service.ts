import { Injectable } from "@angular/core";
import { getRandomConfig, CONFIG, COORD } from "./generator";
import { BehaviorSubject, Observable } from "rxjs";

export interface BOARD {
  size: number; // Taille de la grille
  grid: number[][]; // Une matrice size x size. La valeur 0 indique que la case n'a pas encore été remplie
}

@Injectable({
  providedIn: "root"
})
export class SudokuService {
  builtBoard: BOARD; // Etat initial du plateau
  private boardSubj = new BehaviorSubject<BOARD>({
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
  });
  readonly boardObs = this.boardSubj.asObservable();

  constructor() {
    this.generateBoard();
  }

  /* generateBoard génère un nouveau plateau et le publie via bordSubj
   * Le plateau est généré en faisant appel à la fonction getRandomConfig
   * qui est spécifiée dans le fichier generator.ts
   */
  async generateBoard() {
    // a completer
    const PConfig: CONFIG = await getRandomConfig();
    this.builtBoard = {
      size: Number.parseInt(PConfig.size),
      grid: this.buildGrid(PConfig)
    };
    this.boardSubj.next({...this.builtBoard});
  }

  // canPlay renvoie vrai si, dans le plateau B, il est possible d'inscrire la valeur v
  // v n'est pas présent sur la ligne i, ni sur la colonne j, ni dans le bloc contenant la case (i, j)
  // Le plateau courant est accessible via this.boardSubj.value
  canPlay(i: number, j: number, v: number): boolean {
    // on divise la grille en différents blocs
    let result = true;
    let size = this.boardSubj.value.size;
    //on commence par verifier s'il n'est pas présent sur la ligne i
    for (let index_column = 0; index_column < size && result; index_column++) {
      if (this.boardSubj.value.grid[i][index_column] == v) {
        result = false;
      }
    }

    //Si on ne trouve pas v sur la ligne i, on verifie s'il n'est pas présent sur la colonne j
    if (result) {
      for (let index_line = 0; index_line < size && result; index_line++) {
        if (this.boardSubj.value.grid[index_line][j] == v) {
          result = false;
        }
      }
    }

    //Si v n'est ni dans i, ni dans j, on verifie s n'il n'est pas present dans le bloc contenant la case (i,j)
    // pour les grilles de taille 9
    if (result) {
      if (size == 9) {
        if (i >= 0 && i <= 2) {
          for (let index_line = 0; index_line < 3 && result; index_line++) {
            if (j >= 0 && j <= 2) {
              for (
                let index_column = 0;
                index_column < 3 && result;
                index_column++
              ) {
                if (this.boardSubj.value.grid[index_line][index_column] == v) {
                  result = false;
                }
              }
            } else if (j >= 3 && j <= 5) {
              for (
                let index_column = 3;
                index_column < 6 && result;
                index_column++
              ) {
                if (this.boardSubj.value.grid[index_line][index_column] == v) {
                  result = false;
                }
              }
            } else if (j >= 6 && j <= 8) {
              for (
                let index_column = 6;
                index_column < 9 && result;
                index_column++
              ) {
                if (this.boardSubj.value.grid[index_line][index_column] == v) {
                  result = false;
                }
              }
            }
          }
        } else if (i >= 3 && i <= 5) {
          for (let index_line = 3; index_line < 6 && result; index_line++) {
            if (j >= 0 && j <= 2) {
              for (
                let index_column = 0;
                index_column < 3 && result;
                index_column++
              ) {
                if (this.boardSubj.value.grid[index_line][index_column] == v) {
                  result = false;
                }
              }
            } else if (j >= 3 && j <= 5) {
              for (
                let index_column = 3;
                index_column < 6 && result;
                index_column++
              ) {
                if (this.boardSubj.value.grid[index_line][index_column] == v) {
                  result = false;
                }
              }
            } else if (j >= 6 && j <= 8) {
              for (
                let index_column = 6;
                index_column < 9 && result;
                index_column++
              ) {
                if (this.boardSubj.value.grid[index_line][index_column] == v) {
                  result = false;
                }
              }
            }
          }
        } else if (i >= 6 && i <= 8) {
          for (let index_line = 6; index_line < 9 && result; index_line++) {
            if (j >= 0 && j <= 2) {
              for (
                let index_column = 0;
                index_column < 3 && result;
                index_column++
              ) {
                if (this.boardSubj.value.grid[index_line][index_column] == v) {
                  result = false;
                }
              }
            } else if (j >= 3 && j <= 5) {
              for (
                let index_column = 3;
                index_column < 6 && result;
                index_column++
              ) {
                if (this.boardSubj.value.grid[index_line][index_column] == v) {
                  result = false;
                }
              }
            } else if (j >= 6 && j <= 8) {
              for (
                let index_column = 6;
                index_column < 9 && result;
                index_column++
              ) {
                if (this.boardSubj.value.grid[index_line][index_column] == v) {
                  result = false;
                }
              }
            }
          }
        }
      } else if (size == 4) {
        // pour les grilles de taille 4
        if (i >= 0 && i <= 1) {
          for (let index_line = 0; index_line < 2 && result; index_line++) {
            if (j >= 0 && j <= 1) {
              for (
                let index_column = 0;
                index_column < 2 && result;
                index_column++
              ) {
                if (this.boardSubj.value.grid[index_line][index_column] == v) {
                  result = false;
                }
              }
            } else if (j >= 2 && j <= 3) {
              for (
                let index_column = 2;
                index_column < 4 && result;
                index_column++
              ) {
                if (this.boardSubj.value.grid[index_line][index_column] == v) {
                  result = false;
                }
              }
            }
          }
        } else if (i >= 2 && i <= 3) {
          for (let index_line = 2; index_line < 4 && result; index_line++) {
            if (j >= 0 && j <= 1) {
              for (
                let index_column = 0;
                index_column < 2 && result;
                index_column++
              ) {
                if (this.boardSubj.value.grid[index_line][index_column] == v) {
                  result = false;
                }
              }
            } else if (j >= 2 && j <= 3) {
              for (
                let index_column = 2;
                index_column < 4 && result;
                index_column++
              ) {
                if (this.boardSubj.value.grid[index_line][index_column] == v) {
                  result = false;
                }
              }
            }
          }
        }
      }
    }

    return result;
  }

  // play(i, j, v) inscrit la valeur v dans la case (i, j) si canplay(i, j, v)
  // play publie un nouveau plateau dans ce cas via la méthode next de l'attribut boardSubj
  play(i: number, j: number, nv: number) {
    if (this.canPlay(i, j, nv)) {
      this.boardSubj.value.grid[i][j] = nv;
      this.boardSubj.next(this.boardSubj.value);
    }
  }

  // Construction du grid à partir de la config obtenue
  buildGrid(config: CONFIG): number[][] {
    let size = Number.parseInt(config.size);
    let builtGrid: number[][] = this.initVoidGrid([size, size]);
    config.squares.map(element => {
      builtGrid[element.x][element.y] = element.value;
    });
    return builtGrid;
  }

  // Initialisation d'un tableau rempli de 0
  initVoidGrid(dimensions: number[]): number[][] {
    const array = [];
    for (let i = 0; i < dimensions[0]; ++i) {
      array.push(
        dimensions.length == 1 ? 0 : this.initVoidGrid(dimensions.slice(1))
      );
    }
    return array;
  }

  resetBoard(): BOARD{
    return this.builtBoard;
  }
}
