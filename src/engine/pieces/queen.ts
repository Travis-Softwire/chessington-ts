import Piece from './piece';
import Board from "../board";
import Player from "../player";
import Square from "../square";
import GameSettings from "../gameSettings";

export default class Queen extends Piece {
    constructor(player: Player) {
        super(player);
    }

    canMoveFromTo(fromSquare: Square, toSquare: Square, board: Board): boolean {
        return fromSquare.isDiagonalTo(toSquare)
            || fromSquare.isVerticalTo(toSquare)
            || fromSquare.isHorizontalTo(toSquare);
    }

    isAKing(): boolean {
        return false;
    }
}
