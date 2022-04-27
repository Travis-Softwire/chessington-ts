import Board from "../board";
import Square from "../square";
import Player from "../player";
import GameSettings from "../gameSettings";

export default class Piece {
    constructor(public readonly player: Player) {
    }

    getAvailableMoves(board: Board) {
        // Create an array of the whole board and then filter based on 'canMoveTo'
        const currentSquare: Square = board.findPiece(this);
        let availableMoves: Square[][] = new Array(GameSettings.BOARD_SIZE)
            .fill(undefined)
            .map((row, rowIndex) => {
                return new Array(GameSettings.BOARD_SIZE)
                    .fill(undefined)
                    .map((_, colIndex) => Square.at(rowIndex, colIndex))
                    .filter((square: Square) => this.canMoveFromTo(currentSquare, square));
            });
        return availableMoves.reduce((prevRow, currRow) => prevRow.concat(currRow));
    }

    moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
    }

    canMoveFromTo(fromSquare: Square, toSquare: Square): boolean {
        throw new Error('This method must be implemented, and return a boolean determining whether the piece can move to that square');
    }
}
