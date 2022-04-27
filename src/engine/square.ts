export default class Square {
    constructor(public row: number, public col: number) {
    }

    static at(row: number, col:number): Square {
        return new Square(row, col);
    }

    equals(otherSquare: Square): boolean {
        return !!otherSquare && this.row === otherSquare.row && this.col === otherSquare.col;
    }

    toString(): string {
        return `Row ${this.row}, Col ${this.col}`;
    }

    isVerticalTo(otherSquare: Square): boolean {
        return !!otherSquare && this.col === otherSquare.col && !this.equals(otherSquare);
    }

    isHorizontalTo(otherSquare: Square): boolean {
        return !!otherSquare && this.row === otherSquare.row && !this.equals(otherSquare);
    }

    isDiagonalTo(otherSquare: Square): boolean {
        return !!otherSquare
            && Math.abs(this.row - otherSquare.row) === Math.abs(this.col - otherSquare.col)
            && !this.equals(otherSquare);
    }

    verticalDistanceTo(otherSquare: Square): number {
        return this.row - otherSquare.row;
    }

    horizontalDistanceTo(otherSquare: Square): number {
        return this.col - otherSquare.col;
    }

    manhattanDistanceTo(otherSquare: Square): number {
        return Math.abs(this.verticalDistanceTo(otherSquare))
            + Math.abs(this.horizontalDistanceTo(otherSquare));
    }






}
