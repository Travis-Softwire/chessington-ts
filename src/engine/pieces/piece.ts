import Board from "../board";
import Square from "../square";
import Player from "../player";
import GameSettings from "../gameSettings";
import King from "./king";

export default abstract class Piece {
    protected constructor(public readonly player: Player) {
    }

    abstract hasSquareInMoveSet(fromSquare: Square, toSquare: Square, board: Board): boolean;

    getAvailableMoves(board: Board) {
        // Create an array of the whole board and then filter based on 'canMoveTo'
        const currentSquare: Square = board.findPiece(this);
        let allSquares: Square[][] = Square.createGridOfSquares(GameSettings.BOARD_SIZE, GameSettings.BOARD_SIZE);

        let availableMoves: Square[] = allSquares.reduce((prevRow, currRow) => prevRow.concat(currRow))
            .filter((square: Square) => this.hasSquareInMoveSet(currentSquare, square, board))
            .filter((square: Square) => !board.isSquareOccupied(square) || this.canTakePieceAt(square, board))
            .filter((square: Square) => this.isPathClear(currentSquare, square, board));
        return availableMoves;

    }

    canTakePieceAt(square: Square, board: Board): boolean {
        const otherPiece: Piece | undefined = board.getPiece(square);
        if (otherPiece === undefined) {
            return  false;
        } else {
            return  otherPiece.canBeTakenBy(this.player);
        }
    }

    canBeTakenBy(player: Player): boolean {
        return this.player !== player;
    }

    isPathClear(currentSquare: Square, targetSquare: Square, board: Board): boolean {
        const pathToSquare: Square[] = currentSquare.getInclusivePathTo(targetSquare);
        const furthestEmptySquareOnPath: Square = board.getFurthestValidMoveAlongPath(pathToSquare);
        return furthestEmptySquareOnPath.equals(targetSquare)
            || (this.canTakePieceAt(targetSquare, board) && furthestEmptySquareOnPath.isAdjacentTo(targetSquare));
    }

    moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
    }
}
