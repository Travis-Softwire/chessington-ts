import Player from './player';
import GameSettings from './gameSettings';
import Square from './square';
import Piece from "./pieces/piece";
import Queen from "./pieces/queen";

export default class Board {
    private readonly board: (Piece | undefined)[][];
    private currentPlayer: Player;
    private  turnCount: number = 0;

    constructor(currentPlayer?: Player) {
        this.currentPlayer = currentPlayer ? currentPlayer : Player.WHITE;
        this.board = this.createBoard();
    }

    createBoard() {
        const board = new Array(GameSettings.BOARD_SIZE);
        for (let i = 0; i < board.length; i++) {
            board[i] = new Array(GameSettings.BOARD_SIZE);
        }
        return board;
    }

    setPiece(square: Square, piece: Piece | undefined) {
        this.board[square.row][square.col] = piece;
    }

    getPiece(square: Square) {
        return this.board[square.row][square.col];
    }

    findPiece(pieceToFind: Piece) {
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                if (this.board[row][col] === pieceToFind) {
                    return Square.at(row, col);
                }
            }
        }
        throw new Error('The supplied piece is not on the board');
    }

    movePiece(fromSquare: Square, toSquare: Square) {
        const movingPiece = this.getPiece(fromSquare);        
        if (!!movingPiece && movingPiece.player === this.currentPlayer) {
            this.setPiece(toSquare, movingPiece);
            this.setPiece(fromSquare, undefined);
            this.nextTurn();
        }
    }

    capturePieceWithoutMove(captureSquare: Square): void {
        this.setPiece(captureSquare, undefined);
    }

    queenPieceAt(square: Square, player: Player): void {
        this.setPiece(square, new Queen(player));
    }

    nextTurn(): void {
        this.currentPlayer = (this.currentPlayer === Player.WHITE ? Player.BLACK : Player.WHITE);
        this.turnCount++;
    }

    getTurnsPlayed(): number {
        return this.turnCount;
    }

    isSquareOccupied(square: Square): boolean {
        return this.getPiece(square) !== undefined;
    }

    getFurthestEmptySquareAlongPath(path: Square[]): Square {
        let lastValidSquare = path[0];
        for (let i = 1; i < path.length; i++) {
            if (this.isSquareOccupied(path[i])) {
                return lastValidSquare;
            }
            lastValidSquare = path[i];
        }
        return lastValidSquare;
    }
}
