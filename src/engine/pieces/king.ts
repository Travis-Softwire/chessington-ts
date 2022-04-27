import Piece from './piece';
import Board from "../board";
import Player from "../player";
import Square from "../square";

export default class King extends Piece {
    constructor(player: Player) {
        super(player);
    }

    canMoveFromTo(fromSquare: Square, toSquare: Square): boolean {
        return (fromSquare.isVerticalTo(toSquare) && Math.abs(fromSquare.verticalDistanceTo(toSquare)) === 1)
            || (fromSquare.isHorizontalTo(toSquare) && Math.abs(fromSquare.horizontalDistanceTo(toSquare)) === 1)
            || (fromSquare.isDiagonalTo(toSquare) && fromSquare.manhattanDistanceTo(toSquare) === 2);
    }
}
