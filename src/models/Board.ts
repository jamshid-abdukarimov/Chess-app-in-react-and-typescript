import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Bishop } from "./figures/Bishop";
import { Figure } from "./figures/Figure";
import { King } from "./figures/King";
import { Knight } from "./figures/Knight";
import { Pawn } from "./figures/Pawn";
import { Queen } from "./figures/Queen";
import { Rook } from "./figures/Rook";

export class Board {
  cells: Cell[][] = [];

  public initCells() {
    for (let i: number = 0; i < 8; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2) {
          row.push(new Cell(this, j, i, Colors.Black, null));
        } else {
          row.push(new Cell(this, j, i, Colors.White, null));
        }
      }
      this.cells.push(row);
    }
  }

  public getCopyBoard(): Board {
    const newBoard = new Board();
    newBoard.cells = this.cells;
    return newBoard;
  }

  public highlightCells(selectedCell: Cell | null) {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        const target = row[j];
        target.available = !!selectedCell?.figure?.canMove(target);
      }
    }
  }

  public getCell(x: number, y: number) {
    return this.cells[y][x];
  }

  private addPawns() {
    for (let i = 0; i < 8; i++) {
      new Pawn(Colors.Black, this.getCell(i, 1));
      new Pawn(Colors.White, this.getCell(i, 6));
    }
  }

  private addKings() {
    new King(Colors.Black, this.getCell(4, 0));
    new King(Colors.White, this.getCell(4, 7));
  }

  private addQueens() {
    new Queen(Colors.Black, this.getCell(3, 0));
    new Queen(Colors.White, this.getCell(3, 7));
  }

  private addKnights() {
    new Knight(Colors.Black, this.getCell(1, 0));
    new Knight(Colors.White, this.getCell(1, 7));
    new Knight(Colors.Black, this.getCell(6, 0));
    new Knight(Colors.White, this.getCell(6, 7));
  }

  private addBishops() {
    new Bishop(Colors.Black, this.getCell(2, 0));
    new Bishop(Colors.White, this.getCell(2, 7));
    new Bishop(Colors.Black, this.getCell(5, 0));
    new Bishop(Colors.White, this.getCell(5, 7));
  }

  private addRooks() {
    new Rook(Colors.Black, this.getCell(0, 0));
    new Rook(Colors.White, this.getCell(0, 7));
    new Rook(Colors.Black, this.getCell(7, 0));
    new Rook(Colors.White, this.getCell(7, 7));
  }

  public addFigures() {
    this.addPawns();
    this.addKings();
    this.addQueens();
    this.addKnights();
    this.addBishops();
    this.addRooks();
  }
}
