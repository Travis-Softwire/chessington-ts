import Piece from './piece';
import Board from "../board";
import Player from "../player";
import player from "../player";
import Square from "../square";
import GameSettings from "../gameSettings";

export default class Pawn extends Piece {
    constructor(player: Player) {
        super(player);
    }

    canMoveFromTo(fromSquare: Square, toSquare: Square): boolean {
        const distance: number = toSquare.verticalDistanceTo(fromSquare) * this.getDirection();
        return fromSquare.isVerticalTo(toSquare)
            && (distance === 1
                || (this.isOnStartingRow(fromSquare) && distance === 2));
    }

    isOnStartingRow(currentSquare: Square): boolean {
        return currentSquare.row === this.getStartingRow();
    }

    getStartingRow(): number {
        return this.player === Player.WHITE ? 1 : GameSettings.BOARD_SIZE - 2;
    }

    getDirection(): number {
        return this.player === Player.WHITE ? 1 : -1;
    }
}
