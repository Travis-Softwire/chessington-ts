import Piece from './piece';
import Board from "../board";
import Player from "../player";
import Square from "../square";

export default class King extends Piece {
    constructor(player: Player) {
        super(player);
    }

    hasSquareInMoveSet(fromSquare: Square, toSquare: Square, board: Board): boolean {
        return fromSquare.isAdjacentTo(toSquare);
    }

    canBeTakenBy(player: Player): boolean {
        return false;
    }
}
