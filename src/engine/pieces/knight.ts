import Piece from './piece';
import Board from "../board";
import Player from "../player";
import Square from "../square";

export default class Knight extends Piece {
    constructor(player: Player) {
        super(player);
    }

    getAvailableMoves(board: Board): Square[] {
        return super.getAvailableMoves(board);
    }

    canMoveFromTo(fromSquare: Square, toSquare: Square, board: Board): boolean {
        return fromSquare.manhattanDistanceTo(toSquare) === 3
            && Math.abs(fromSquare.verticalDistanceTo(toSquare)) < 3
            && Math.abs(fromSquare.horizontalDistanceTo(toSquare)) < 3;
    }

    isAKing(): boolean {
        return false;
    }
}
