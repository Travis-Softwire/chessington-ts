import Board from "../board";
import Square from "../square";
import Player from "../player";
import GameSettings from "../gameSettings";
import King from "./king";

export default abstract class Piece {
    protected constructor(public readonly player: Player) {
    }

    getAvailableMoves(board: Board) {
        // Create an array of the whole board and then filter based on 'canMoveTo'
        const currentSquare: Square = board.findPiece(this);
        let allSquares: Square[][] = new Array(GameSettings.BOARD_SIZE)
            .fill(undefined)
            .map((row, rowIndex) => {
                return new Array(GameSettings.BOARD_SIZE)
                    .fill(undefined)
                    .map((_, colIndex) => Square.at(rowIndex, colIndex))

            });
        let availableMoves = allSquares.reduce((prevRow, currRow) => prevRow.concat(currRow))
            .filter((square: Square) => this.canMoveFromTo(currentSquare, square, board))
            .filter((square: Square) => {
                const pathToSquare: Square[] = currentSquare.getInclusivePathTo(square);
                const furthestSquare: Square = board.getFurthestValidMoveAlongPath(pathToSquare);
                return furthestSquare.equals(square) || (this.canTakePieceAt(square, board) && furthestSquare.isAdjacentTo(square));
            });
        return availableMoves;

    }

    moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
    }

    abstract canMoveFromTo(fromSquare: Square, toSquare: Square, board: Board): boolean;

    canTakePieceAt(square: Square, board: Board): boolean {
        const otherPiece: Piece | undefined = board.getPiece(square);
        if (otherPiece === undefined) {
            return  false;
        } else {
            return  otherPiece.player !== this.player && !otherPiece.isAKing();
        }
    }

    abstract isAKing(): boolean;
}
