import Piece from './piece';
import Board from "../board";
import Player from "../player";
import Square from "../square";
import GameSettings from "../gameSettings";

export default class Rook extends Piece {
    constructor(player: Player) {
        super(player);
    }

    getAvailableMoves(board: Board) {
        const currentSquare: Square = board.findPiece(this);
        const availableRowMoves: Square[] = new Array(GameSettings.BOARD_SIZE)
            .fill(undefined)
            .map((_, rowNumber: number) => new Square(rowNumber, currentSquare.col))
            .filter((square: Square) => square.row !== currentSquare.row);
        const availableColMoves = new Array(GameSettings.BOARD_SIZE)
            .fill(undefined)
            .map((_, colNumber: number) => new Square(currentSquare.row, colNumber))
            .filter((square: Square) => square.col !== currentSquare.col);
        return availableRowMoves.concat(availableColMoves);
    }
}
