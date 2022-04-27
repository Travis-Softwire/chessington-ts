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

    isAdjacentTo(otherSquare: Square): boolean {
        return (this.isVerticalTo(otherSquare) && Math.abs(this.verticalDistanceTo(otherSquare)) === 1)
            || (this.isHorizontalTo(otherSquare) && Math.abs(this.horizontalDistanceTo(otherSquare)) === 1)
            || (this.isDiagonalTo(otherSquare) && this.manhattanDistanceTo(otherSquare) === 2);
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

    getInclusivePathTo(otherSquare: Square): Square[] {
        let path = [];
        let delta: [number, number] = [0, 0];
        if (!(this.isVerticalTo(otherSquare)
            || this.isHorizontalTo(otherSquare)
            || this.isDiagonalTo(otherSquare))) {

            path.push(otherSquare); // Teleport - i.e. a Knight
            return path;
        }
        path.push(this);
        delta[0] = clamp(this.verticalDistanceTo(otherSquare), -1, 1) * (-1);
        delta[1] = clamp(this.horizontalDistanceTo(otherSquare), -1, 1) * (-1);
        let nextSquare = Square.at(this.row + delta[0], this.col + delta[1]);
        while (!nextSquare.equals(otherSquare)) {
            path.push(nextSquare);
            nextSquare = Square.at(nextSquare.row + delta[0], nextSquare.col + delta[1]);
        }
        path.push(nextSquare);
        return path;
    }


}

function clamp(num: number, min: number, max: number): number {
    return Math.min(Math.max(num, min), max);
}

