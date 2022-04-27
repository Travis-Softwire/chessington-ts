import Piece from './piece';
import Board from "../board";
import Player from "../player";
import GameSettings from "../gameSettings";
import Square from "../square";

export default class Bishop extends Piece {
    constructor(player: Player) {
        super(player);
    }

  canMoveFromTo(fromSquare: Square, toSquare: Square): boolean {
        return fromSquare.isDiagonalTo(toSquare);
    }
}
