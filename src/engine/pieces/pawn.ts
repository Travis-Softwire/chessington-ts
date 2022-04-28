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

    hasSquareInMoveSet(fromSquare: Square, toSquare: Square, board: Board): boolean {
        const verticalDistance: number = toSquare.verticalDistanceTo(fromSquare) * this.getDirection();
        return (fromSquare.isVerticalTo(toSquare)
                && (verticalDistance === 1
                    || (this.isOnStartingRow(fromSquare) && verticalDistance === 2)))
            || this.canTakePieceAt(toSquare, board)
            || this.canEnPassantFromTo(fromSquare, toSquare, board);
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

    canTakePieceAt(square: Square, board: Board): boolean {
        const currentSquare: Square = board.findPiece(this);
        const verticalDistance: number = square.verticalDistanceTo(currentSquare) * this.getDirection();
        return currentSquare.isDiagonalTo(square)
            && verticalDistance === 1
            && super.canTakePieceAt(square, board);
    }

    canEnPassantFromTo(fromSquare: Square, toSquare: Square, board: Board): boolean {
        const verticalDistance: number = toSquare.verticalDistanceTo(fromSquare) * this.getDirection();
        const captureSquare: Square = Square.at(fromSquare.row, toSquare.col);
        const pieceToCapture: Piece | undefined = board.getPiece(captureSquare);
        if (pieceToCapture === undefined) {
            return false;
        }
        return fromSquare.isDiagonalTo(toSquare)
            && verticalDistance === 1
            && pieceToCapture instanceof Pawn;
    }


}
