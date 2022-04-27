import Piece from './piece';
import Board from "../board";
import Player from "../player";
import Square from "../square";

export default class King extends Piece {
    constructor(player: Player) {
        super(player);
    }

    canMoveFromTo(fromSquare: Square, toSquare: Square, board: Board): boolean {
        return fromSquare.isAdjacentTo(toSquare);
    }

    isAKing(): boolean {
        return true;
    }
}
