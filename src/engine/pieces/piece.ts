import Board from "../board";
import Square from "../square";
import Player from "../player";
import GameSettings from "../gameSettings";

export default abstract class Piece {
    protected constructor(public readonly player: Player) {
    }

    getAvailableMoves(board: Board) {
        // Create an array of the whole board and then filter based on 'canMoveTo'
        const currentSquare: Square = board.findPiece(this);
        let allSquares: Square[][] = new Array(GameSettings.BOARD_SIZE)
            .fill(undefined)
            .map((row, rowIndex) => {
                return new Array(GameSettings.BOARD_SIZE)
                    .fill(undefined)
                    .map((_, colIndex) => Square.at(rowIndex, colIndex))

            });
        let availableMoves = allSquares.reduce((prevRow, currRow) => prevRow.concat(currRow))
            .filter((square: Square) => this.canMoveFromTo(currentSquare, square))
            .filter((square: Square) => {
                const pathToSquare = currentSquare.getInclusivePathTo(square);
                return board.tracePathTo(pathToSquare).equals(square);
            });
        return availableMoves;

    }

    moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
    }

    abstract canMoveFromTo(fromSquare: Square, toSquare: Square): boolean;
}
