import Piece from './piece';
import Board from "../board";
import Player from "../player";
import Square from "../square";
import GameSettings from "../gameSettings";

export default class Queen extends Piece {
    constructor(player: Player) {
        super(player);
    }

    getAvailableMoves(board: Board) {
        const currentSquare: Square = board.findPiece(this);
        let availableMoves: Square[][] = new Array(GameSettings.BOARD_SIZE)
            .fill(undefined)
            .map((row, rowIndex) => {
                return new Array(GameSettings.BOARD_SIZE)
                    .fill(undefined)
                    .map((_, colIndex) => new Square(rowIndex, colIndex))
                    .filter((square: Square) => (Math.abs(square.row - currentSquare.row) === Math.abs(square.col - currentSquare.col))
                                || square.row === currentSquare.row
                                || square.col === currentSquare.col)
                    .filter((square: Square) => !(square.row === currentSquare.row && square.col === currentSquare.col));
            });
        return availableMoves.reduce((prevRow, currRow) => prevRow.concat(currRow));
    }
}
