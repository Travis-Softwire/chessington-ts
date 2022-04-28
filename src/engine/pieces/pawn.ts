import Piece from './piece';
import Board from "../board";
import Player from "../player";
import Square from "../square";
import GameSettings from "../gameSettings";

export default class Pawn extends Piece {
    constructor(player: Player) {
        super(player);
    }

    private firstTurnNumber = 0;

    hasSquareInMoveSet(fromSquare: Square, toSquare: Square, board: Board): boolean {
        const verticalDistance: number = toSquare.verticalDistanceTo(fromSquare) * this.getDirection();
        return (fromSquare.isVerticalTo(toSquare)
                && (verticalDistance === 1
                    || (this.isOnStartingRow(fromSquare) && verticalDistance === 2)))
            || this.canTakePieceAt(toSquare, board)
            || this.canEnPassantFromTo(fromSquare, toSquare, board);
    }

    moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        if (this.canEnPassantFromTo(currentSquare, newSquare, board)) {
            board.capturePieceWithoutMove(Square.at(currentSquare.row, newSquare.col));
        }

        super.moveTo(board, newSquare);

        if (this.firstTurnNumber === 0) {
            this.firstTurnNumber = board.getTurnsPlayed();
        }
        if (this.isOnLastRow(newSquare)) {
            board.queenPieceAt(newSquare, this.player);
        }
    }

    isOnStartingRow(currentSquare: Square): boolean {
        return currentSquare.row === this.getStartingRow();
    }

    getStartingRow(): number {
        return this.player === Player.WHITE ? 1 : GameSettings.BOARD_SIZE - 2;
    }

    isOnLastRow(square: Square): boolean {
        return square.row === this.getLastRow();
    }

    getLastRow(): number {
        return this.player === Player.WHITE ? GameSettings.BOARD_SIZE - 1 : 0;
    }

    getDirection(): number {
        return this.player === Player.WHITE ? 1 : -1;
    }

    canTakePieceAt(square: Square, board: Board): boolean {
        const currentSquare: Square = board.findPiece(this);
        return this.canAttackFromTo(currentSquare, square)
                && super.canTakePieceAt(square, board);
    }

    canEnPassantFromTo(fromSquare: Square, toSquare: Square, board: Board): boolean {
        const captureSquare: Square = Square.at(fromSquare.row, toSquare.col);
        const pieceToCapture: Piece | undefined = board.getPiece(captureSquare);
        if (pieceToCapture === undefined) {
            return false;
        }
        const lastTurn: number = board.getTurnsPlayed();
        return this.canAttackFromTo(fromSquare, toSquare)
            && pieceToCapture instanceof Pawn
            && pieceToCapture.firstTurnNumber === lastTurn;
    }

    canAttackFromTo(fromSquare: Square, toSquare: Square): boolean {
        const verticalDistance: number = toSquare.verticalDistanceTo(fromSquare) * this.getDirection();
        return fromSquare.isDiagonalTo(toSquare)
            && verticalDistance === 1;
    }
}
