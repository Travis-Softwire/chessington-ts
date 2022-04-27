import Piece from './piece';
import Board from "../board";
import Player from "../player";
import Square from "../square";
import GameSettings from "../gameSettings";

export default class Pawn extends Piece {
    constructor(player: Player) {
        super(player);
    }

    getAvailableMoves(board: Board): Square[] {
        const currentSquare: Square = board.findPiece(this);
        const availableMoves: Square[] = [];
        let startingRow: number = 1;
        let direction: number = 1;
        if (this.player === Player.BLACK) {
            startingRow = GameSettings.BOARD_SIZE - 2;
            direction = -1;
        }
        availableMoves.push(
            Square.at(currentSquare.row + direction, currentSquare.col)
        );
        if (currentSquare.row === startingRow) {
            availableMoves.push(
                Square.at(currentSquare.row + (2 * direction), currentSquare.col)
            );
        }
        return availableMoves;
    }
}
