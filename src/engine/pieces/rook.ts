import Piece from './piece';
import Board from "../board";
import Player from "../player";
import Square from "../square";
import GameSettings from "../gameSettings";

export default class Rook extends Piece {
    constructor(player: Player) {
        super(player);
    }

    canMoveFromTo(fromSquare: Square, toSquare: Square, board: Board): boolean {
        return fromSquare.isHorizontalTo(toSquare)
                || fromSquare.isVerticalTo(toSquare);
    }
}
