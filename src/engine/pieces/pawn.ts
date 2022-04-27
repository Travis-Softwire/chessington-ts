import Piece from './piece';
import Board from "../board";
import Player from "../player";
import Square from "../square";

export default class Pawn extends Piece {
    constructor(player: Player) {
        super(player);
    }

    getAvailableMoves(board: Board): Square[] {
        const currentSquare = board.findPiece(this);
        const newRow = this.player === Player.WHITE
            ? currentSquare.row + 1
            : currentSquare.row - 1;
        return [Square.at(newRow, currentSquare.col)];
    }
}
