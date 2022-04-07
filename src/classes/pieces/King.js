import { movePiece } from '../../utils/MovePiece';
import { isEighthColumn, isFirstColumn } from '../../utils/ColumnsAndRows';
import Piece from './Piece';

export class King extends Piece {

    getPieceType() {
        return "K";
    }

    calculateCandidates = [-9, -8, -7, -1, 1, 7, 8, 9];

    threats(board, playerToMove) {

        let threats = [];

        if (playerToMove?.getAlliance() == this.alliance) {

            for (const candidate of this.calculateCandidates) {
                const tileCandidate = this.position + candidate;

                if (this.firstColumnExclusion(candidate) ||
                    this.eighthColumnExclusion(candidate)) {
                    continue;
                }

                if (tileCandidate > 0 && tileCandidate < 64) {
                    for (let tile of board) {
                        if (tileCandidate == tile.getCoordinate()) {
                            threats.push(tileCandidate);
                        }
                    }
                }
            }
        }
        return threats;
    }

    legalMoves(board, playerToMove) {

        let legalMoves = [];

        if (playerToMove?.getAlliance() == this.alliance) {
            for (let candidate of this.calculateCandidates) {
                const tileCandidate = this.position + candidate;

                if (this.firstColumnExclusion(candidate) ||
                    this.eighthColumnExclusion(candidate)) {
                    continue;
                }

                if (tileCandidate >= 0 && tileCandidate < 64) {
                    for (let tile of board) {
                        if (tileCandidate == tile.getCoordinate()) {

                            if (!tile.isOccupied() || tile.getPiece().getAlliance() != this.alliance) {
                                const tempMove = movePiece(board[this.position], board[tileCandidate], board, playerToMove);
                                let kingPosition = -1;
                                for(const tile2 of tempMove){
                                    if(tile2.getPiece()?.getPieceType() == "K" && tile2.getPiece().getAlliance() == this.alliance){
                                        kingPosition = tile2.getCoordinate();
                                    }
                                }
                                if (!tempMove[kingPosition].isThreatened(tempMove, playerToMove)) {
                                    legalMoves.push(tileCandidate);
                                }
                            }
                        }
                    }
                }
            }
            // Castle - FIJARSE EN ENROQUES: TENGO QUE DESHABILITAR EL ENROQUE SI JAQUEADO
            legalMoves.push(this.addKingSideCastle(board, playerToMove));
            legalMoves.push(this.addQueenSideCastle(board, playerToMove));

        }
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
    addKingSideCastle(board, playerToMove) {
        if (this.alliance == "white") {
            const rook = board[63].getPiece();
            if (!this.hasMoved() && (rook.getPieceType() == "R")
                && !rook.hasMoved()
                && !board[62].isOccupied()
                && !board[61].isOccupied()
                && !board[this.position].isThreatened(board, playerToMove)
                && !board[62].isThreatened(board, playerToMove)
                && !board[61].isThreatened(board, playerToMove)) {
                return 62;
            }
        } else if (this.alliance == "black") {
            const rook = board[7].getPiece();
            if (!this.hasMoved() && (rook.getPieceType() == "R")
                && !rook.hasMoved()
                && !board[6].isOccupied()
                && !board[5].isOccupied()
                && !board[this.position].isThreatened(board, playerToMove)
                && !board[6].isThreatened(board, playerToMove)
                && !board[5].isThreatened(board, playerToMove)) {
                return 6;
            }
        }
    }
    addQueenSideCastle(board, playerToMove) {
        if (this.alliance == "white") {
            const rook = board[56].getPiece();
            if (!this.moved && (rook.getPieceType() == "R")
                && !rook.hasMoved()
                && !board[57].isOccupied()
                && !board[58].isOccupied()
                && !board[59].isOccupied()
                && !board[this.position].isThreatened(board, playerToMove)
                && !board[58].isThreatened(board, playerToMove)
                && !board[59].isThreatened(board, playerToMove)) {
                return 58;
            }
        }
        if (this.alliance == "black") {
            const rook = board[0].getPiece();
            if (!this.moved && (rook.getPieceType() == "R")
                && !rook.hasMoved()
                && !board[1].isOccupied()
                && !board[2].isOccupied()
                && !board[3].isOccupied()
                && !board[this.position].isThreatened(board, playerToMove)
                && !board[2].isThreatened(board, playerToMove)
                && !board[3].isThreatened(board, playerToMove)) {
                return 2;
            }
        }
    }
}