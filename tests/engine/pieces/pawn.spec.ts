import 'chai/register-should';
import Pawn from '../../../src/engine/pieces/pawn';
import Rook from '../../../src/engine/pieces/rook';
import King from '../../../src/engine/pieces/king';
import Board from '../../../src/engine/board';
import Player from '../../../src/engine/player';
import Square from '../../../src/engine/square';
import Knight from "../../../src/engine/pieces/knight";
import GameSettings from "../../../src/engine/gameSettings";
import gameSettings from "../../../src/engine/gameSettings";
import Piece from "../../../src/engine/pieces/piece";
import Queen from "../../../src/engine/pieces/queen";

describe('Pawn', () => {

    let board: Board;
    beforeEach(() => board = new Board());

    describe('white pawns', () => {
        
        it('can only move one square up if they have already moved', () => {
            const pawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(1, 0), pawn);
            pawn.moveTo(board, Square.at(2, 0));

            const moves = pawn.getAvailableMoves(board);
            
            moves.should.have.length(1);
            moves.should.deep.include(Square.at(3, 0));
        });

        it('can move one or two squares up on their first move', () => {
            const pawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(1, 7), pawn);

            const moves = pawn.getAvailableMoves(board);

            moves.should.have.length(2);
            moves.should.deep.include.members([Square.at(2, 7), Square.at(3, 7)]);
        });

        it('cannot move at the top of the board', () => {
            const pawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(7, 3), pawn);

            const moves = pawn.getAvailableMoves(board);

            moves.should.be.empty;
        });

        it('can move diagonally if there is a piece to take', () => {
            const pawn = new Pawn(Player.WHITE);
            const opposingPiece = new Rook(Player.BLACK);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPiece(Square.at(5, 3), opposingPiece);

            const moves = pawn.getAvailableMoves(board);

            moves.should.deep.include(Square.at(5, 3));
        });

        it('cannot move diagonally if there is no piece to take', () => {
            const pawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(4, 4), pawn);

            const moves = pawn.getAvailableMoves(board);

            moves.should.not.deep.include(Square.at(5, 3));
        });

        it('cannot take a friendly piece', () => {
            const pawn = new Pawn(Player.WHITE);
            const friendlyPiece = new Rook(Player.WHITE);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPiece(Square.at(5, 3), friendlyPiece);

            const moves = pawn.getAvailableMoves(board);

            moves.should.not.deep.include(Square.at(5, 3));
        });

        it('cannot take the opposing king', () => {
            const pawn = new Pawn(Player.WHITE);
            const opposingKing = new King(Player.BLACK);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPiece(Square.at(5, 3), opposingKing);

            const moves = pawn.getAvailableMoves(board);

            moves.should.not.deep.include(Square.at(5, 3));
        });

        it('can move diagonally to space behind an opposing pawn which has just moved forward two spaces', () => {
           const pawn = new Pawn(Player.WHITE);
           const rook = new Rook(Player.WHITE);
           const opposingPawn = new Pawn(Player.BLACK);
           board.setPiece(Square.at(4, 4), pawn);
           board.setPiece(Square.at(0, 0), rook); //Because white has to move first
           board.setPiece(Square.at(6, 3), opposingPawn);
           rook.moveTo(board, Square.at(0, 1));
           opposingPawn.moveTo(board, Square.at(4, 3));

           const moves = pawn.getAvailableMoves(board);

           moves.should.deep.include(Square.at(5, 3));
        });

        it('cannot use en passant on a piece other than a pawn', () => {
            const pawn = new Pawn(Player.WHITE);
            const opposingKnight = new Knight(Player.BLACK);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPiece(Square.at(4, 3), opposingKnight);

            const moves = pawn.getAvailableMoves(board);

            moves.should.not.deep.include(Square.at(5, 3));
        });

        it("can only take a piece using en passant immediately after it's first move", () => {
            const pawn = new Pawn(Player.WHITE);
            const rook = new Rook(Player.WHITE); //Because white has to move first
            const opposingPawn = new Pawn(Player.BLACK);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPiece(Square.at(0, 0), rook);
            board.setPiece(Square.at(6, 3), opposingPawn);
            rook.moveTo(board, Square.at(0, 1));
            opposingPawn.moveTo(board, Square.at(5, 3));
            rook.moveTo(board, Square.at(0, 0));
            opposingPawn.moveTo(board, Square.at(4, 3));

            const moves = pawn.getAvailableMoves(board);

            moves.should.not.deep.include(Square.at(5, 3));
        });

        it('should remove opposing piece from the board when using en passant', () => {
            const pawn = new Pawn(Player.WHITE);
            const rook = new Rook(Player.WHITE);
            const opposingPawn = new Pawn(Player.BLACK);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPiece(Square.at(0, 0), rook); //Because white has to move first
            board.setPiece(Square.at(6, 3), opposingPawn);
            rook.moveTo(board, Square.at(0, 1));
            opposingPawn.moveTo(board, Square.at(4, 3));

            pawn.moveTo(board, Square.at(5, 3));

            const opposingPawnHasBeenTaken = !board.isSquareOccupied(Square.at(4, 3));
            opposingPawnHasBeenTaken.should.be.true;
        });

        it('should be promoted to a queen if it gets to the end of the board', () => {
            const pawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(GameSettings.BOARD_SIZE - 2, 0), pawn);

            pawn.moveTo(board, Square.at(GameSettings.BOARD_SIZE - 1, 0));

            const pieceIsAQueen = board.getPiece(Square.at(GameSettings.BOARD_SIZE - 1, 0)) instanceof Queen;
            pieceIsAQueen.should.be.true;
        });

    });

    describe('black pawns', () => {

        let board: Board;
        beforeEach(() => board = new Board(Player.BLACK));    
        
        it('can only move one square down if they have already moved', () => {
            const pawn = new Pawn(Player.BLACK);
            board.setPiece(Square.at(6, 0), pawn);
            pawn.moveTo(board, Square.at(5, 0));

            const moves = pawn.getAvailableMoves(board);
            
            moves.should.have.length(1);
            moves.should.deep.include(Square.at(4, 0));
        });

        it('can move one or two squares down on their first move', () => {
            const pawn = new Pawn(Player.BLACK);
            board.setPiece(Square.at(6, 7), pawn);

            const moves = pawn.getAvailableMoves(board);

            moves.should.have.length(2);
            moves.should.deep.include.members([Square.at(4, 7), Square.at(5, 7)]);
        });

        it('cannot move at the bottom of the board', () => {
            const pawn = new Pawn(Player.BLACK);
            board.setPiece(Square.at(0, 3), pawn);

            const moves = pawn.getAvailableMoves(board);

            moves.should.be.empty;
        });

        it('can move diagonally if there is a piece to take', () => {
            const pawn = new Pawn(Player.BLACK);
            const opposingPiece = new Rook(Player.WHITE);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPiece(Square.at(3, 3), opposingPiece);

            const moves = pawn.getAvailableMoves(board);

            moves.should.deep.include(Square.at(3, 3));
        });

        it('cannot move diagonally if there is no piece to take', () => {
            const pawn = new Pawn(Player.BLACK);
            board.setPiece(Square.at(4, 4), pawn);

            const moves = pawn.getAvailableMoves(board);

            moves.should.not.deep.include(Square.at(3, 3));
        });

        it('cannot take a friendly piece', () => {
            const pawn = new Pawn(Player.BLACK);
            const friendlyPiece = new Rook(Player.BLACK);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPiece(Square.at(3, 3), friendlyPiece);

            const moves = pawn.getAvailableMoves(board);

            moves.should.not.deep.include(Square.at(3, 3));
        });

        it('cannot take the opposing king', () => {
            const pawn = new Pawn(Player.BLACK);
            const opposingKing = new King(Player.WHITE);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPiece(Square.at(3, 3), opposingKing);

            const moves = pawn.getAvailableMoves(board);

            moves.should.not.deep.include(Square.at(3, 3));
        });

        it('can move diagonally to space behind an opposing pawn which has just moved forward two spaces', () => {
            const pawn = new Pawn(Player.BLACK);
            const rook = new Rook(Player.BLACK);
            const opposingPawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(3, 4), pawn);
            board.setPiece(Square.at(0, 0), rook);
            board.setPiece(Square.at(1, 3), opposingPawn);
            rook.moveTo(board, Square.at(0, 1)); //Black must move first for these tests...
            opposingPawn.moveTo(board, Square.at(3, 3));

            const moves = pawn.getAvailableMoves(board);

            moves.should.deep.include(Square.at(2, 3));
        });

        it('cannot use en passant on a piece other than a pawn', () => {
            const pawn = new Pawn(Player.BLACK);
            const opposingKnight = new Knight(Player.WHITE);
            board.setPiece(Square.at(3, 4), pawn);
            board.setPiece(Square.at(3, 3), opposingKnight);

            const moves = pawn.getAvailableMoves(board);

            moves.should.not.deep.include(Square.at(2, 3));
        });

        it("can only take a piece using en passant immediately after it's first move", () => {
            const pawn = new Pawn(Player.BLACK);
            const rook = new Rook(Player.BLACK);
            const opposingPawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPiece(Square.at(0, 0), rook);
            board.setPiece(Square.at(1, 3), opposingPawn);
            rook.moveTo(board, Square.at(0, 1)); // Black must move first in these tests...
            opposingPawn.moveTo(board, Square.at(2, 3));
            pawn.moveTo(board, Square.at(3, 4));
            opposingPawn.moveTo(board, Square.at(3, 3));

            const moves = pawn.getAvailableMoves(board);

            moves.should.not.deep.include(Square.at(2, 3));
        });

        it('should remove opposing piece from the board when using en passant', () => {
            const pawn = new Pawn(Player.BLACK);
            const rook = new Rook(Player.BLACK);
            const opposingPawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(3, 4), pawn);
            board.setPiece(Square.at(0, 0), rook);
            board.setPiece(Square.at(1, 3), opposingPawn);
            rook.moveTo(board, Square.at(0, 1)); //Black must move first for these tests...
            opposingPawn.moveTo(board, Square.at(3, 3));
            pawn.moveTo(board, Square.at(2, 3));

            const opposingPawnHasBeenTaken: boolean = !board.isSquareOccupied(Square.at(3, 3));

            opposingPawnHasBeenTaken.should.be.true;
        });

        it('should be promoted to a queen if it gets to the end of the board', () => {
            const pawn = new Pawn(Player.BLACK);
            board.setPiece(Square.at(1, 0), pawn);

            pawn.moveTo(board, Square.at(0, 0));

            const pieceIsAQueen = board.getPiece(Square.at(0, 0)) instanceof Queen;
            pieceIsAQueen.should.be.true;
        });
    });

    it('cannot move if there is a piece in front', () => {
        const pawn = new Pawn(Player.BLACK);
        const blockingPiece = new Rook(Player.WHITE);
        board.setPiece(Square.at(6, 3), pawn);
        board.setPiece(Square.at(5, 3), blockingPiece);

        const moves = pawn.getAvailableMoves(board);

        moves.should.be.empty;
    });

    it('cannot move two squares if there is a piece two sqaures in front', () => {
        const pawn = new Pawn(Player.BLACK);
        const blockingPiece = new Rook(Player.WHITE);
        board.setPiece(Square.at(6, 3), pawn);
        board.setPiece(Square.at(4, 3), blockingPiece);

        const moves = pawn.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(4, 3));
    });

});
