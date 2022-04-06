import { isEighthColumn, isFirstColumn } from '../board/ColumnsAndRows';
import { movePiece } from '../moves/MovePiece';
import Piece from './Piece';

export class King extends Piece {

    getPieceType() {
        return "K";
    }

    calculateCandidates = [-9, -8, -7, -1, 1, 7, 8, 9];

    threats(board, playerToMove) {

        let legalMoves = [];
        
        if (playerToMove?.getAlliance() == this.alliance) {
            
            for (let candidate of this.calculateCandidates) {
                let tileCandidate = this.position + candidate;
    
                if (this.firstColumnExclusion(candidate) ||
                    this.eighthColumnExclusion(candidate)) {
                    continue;
                }
    
                if (tileCandidate > 0 && tileCandidate < 64) {
                    for (let tile of board) {
                        if (tileCandidate == tile.getCoordinate()) {
                            if (!tile.isOccupied() || tile.getPiece().getAlliance() != this.alliance) {
                                legalMoves.push(tileCandidate);
                            }
                        }
                    }
                }
            }
        }

        return legalMoves;

    }

    legalMoves(board, playerToMove) {

        let legalMoves = [];
        const boardIsArray = Array.isArray(board);

        for (let candidate of this.calculateCandidates) {
            let tileCandidate = this.position + candidate;

            if (this.firstColumnExclusion(candidate) ||
                this.eighthColumnExclusion(candidate)) {
                continue;
            }

            if (tileCandidate > 0 && tileCandidate < 64 && boardIsArray) {
                for (let tile of board) {
                    if (tileCandidate == tile.getCoordinate()) {

                        if (!tile.isOccupied() || tile.getPiece().getAlliance() != this.alliance) {
                            const tempMove = movePiece(board[this.position], board[tileCandidate], board, playerToMove);
                            console.log(tempMove[tileCandidate]);
                            if (!tempMove[this.position].isThreatened()) {
                                legalMoves.push(tileCandidate);
                            }
                        }
                    }
                }
            }
        }


        // Castle
        legalMoves.push(this.addKingSideCastle(board));
        legalMoves.push(this.addQueenSideCastle(board));


        return legalMoves;
    }

    firstColumnExclusion(candidate) {
        let answer = false;
        if (isFirstColumn(this.position) && (candidate == -9 || candidate == -1 || candidate == 7)) {
            answer = true;
        }
        return answer;
    }

    eighthColumnExclusion(candidate) {
        let answer = false;
        if (isEighthColumn(this.position) && (candidate == -7 || candidate == 1 || candidate == 9)) {
            answer = true;
        }
        return answer;
    }
    addKingSideCastle(board) {
        const boardIsArray = Array.isArray(board);
        if (boardIsArray && this.alliance == "white") {
            const rook = board[63].getPiece();
            if (!this.hasMoved() && (rook.getPieceType() == "R")
                && !rook.hasMoved()
                && !board[62].isOccupied()
                && !board[61].isOccupied()) {
                return 62;
            }
        } else if (boardIsArray && this.alliance == "black") {
            const rook = board[7].getPiece();
            if (!this.hasMoved() && (rook.getPieceType() == "R")
                && !rook.hasMoved()
                && !board[6].isOccupied()
                && !board[5].isOccupied()) {
                return 6;
            }
        }
    }
    addQueenSideCastle(board) {
        const boardIsArray = Array.isArray(board);
        if (boardIsArray && this.alliance == "white") {
            const rook = board[56].getPiece();
            if (!this.moved && (rook.getPieceType() == "R")
                && !rook.hasMoved()
                && !board[57].isOccupied()
                && !board[58].isOccupied()
                && !board[59].isOccupied()) {
                return 58;
            }
        }
        if (boardIsArray && this.alliance == "black") {
            const rook = board[0].getPiece();
            if (!this.moved && (rook.getPieceType() == "R")
                && !rook.hasMoved()
                && !board[1].isOccupied()
                && !board[2].isOccupied()
                && !board[3].isOccupied()) {
                return 2;
            }
        }
    }
}