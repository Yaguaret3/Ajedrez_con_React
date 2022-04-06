import { isEighthColumn, isFirstColumn } from '../board/ColumnsAndRows';
import { movePiece } from '../moves/MovePiece';
import Piece from './Piece';

export class Bishop extends Piece {

    getPieceType() {
        return "B";
    }

    calculateCandidatesVector = [-9, -7, 7, 9];

    threats(board, playerToMove) {

        let legalMoves = [];

        if (playerToMove?.getAlliance() == this.alliance) {
            for (let vector of this.calculateCandidatesVector) {
                if (this.firstColumnExclusion(vector, this.position) || this.eighthColumnExclusion(vector, this.position)) {
                    continue;
                }
                let tileCandidate = this.position + vector;
                if (tileCandidate >= 0 && tileCandidate < 64) {
                    while (tileCandidate >= 0 && tileCandidate < 64 && !board[tileCandidate].isOccupied()) {
                        if (!this.firstColumnExclusion(vector, tileCandidate) && !this.eighthColumnExclusion(vector, tileCandidate)) {

                            legalMoves.push(tileCandidate);
                            tileCandidate += vector;
                        } else {
                            break;
                        }
                    }
                }
                if (tileCandidate >= 0 && tileCandidate < 64) {
                    if (board[tileCandidate].getPiece()?.getAlliance() != this.alliance) {
                        legalMoves.push(tileCandidate);
                    }
                }
            }
        }

        return legalMoves;
    }

    firstColumnExclusion(vector, lastTilePosition) {
        let answer = false;
        if (isFirstColumn(lastTilePosition) && (vector == -9 || vector == 7)) {
            answer = true;
        }
        return answer;
    }
    eighthColumnExclusion(vector, lastTilePosition) {
        let answer = false;
        if (isEighthColumn(lastTilePosition) && (vector == -7 || vector == 9)) {
            answer = true;
        }
        return answer;
    }

    legalMoves(board, playerToMove) {

        let kingPosition = -1;
        const boardIsArray = Array.isArray(board);

        if (boardIsArray) {
            for (const tile of board) {
                if (tile.getPiece()?.getPieceType() == "K") {
                    kingPosition = tile.getCoordinate();
                }
            }
        }

        let legalMoves = [];

        if (playerToMove?.getAlliance() == this.alliance) {
            for (let vector of this.calculateCandidatesVector) {
                if (this.firstColumnExclusion(vector, this.position) || this.eighthColumnExclusion(vector, this.position)) {
                    continue;
                }
                let tileCandidate = this.position + vector;
                if (tileCandidate >= 0 && tileCandidate < 64) {
                    while (tileCandidate >= 0 && tileCandidate < 64 && !board[tileCandidate].isOccupied()) {
                        if (!this.firstColumnExclusion(vector, tileCandidate) && !this.eighthColumnExclusion(vector, tileCandidate)) {

                            const tempMove = movePiece(board[this.position], board[tileCandidate], board, playerToMove);
                            if (!tempMove[kingPosition].isThreatened()) {
                                legalMoves.push(tileCandidate);
                            }
                            tileCandidate += vector;
                        } else {
                            break;
                        }
                    }
                }
                if (tileCandidate >= 0 && tileCandidate < 64) {
                    if (board[tileCandidate].getPiece()?.getAlliance() != this.alliance) {
                        // Fijarse que no quede el rey amenazado
                        const tempMove = movePiece(board[this.position], board[tileCandidate], board, playerToMove);
                        if (!tempMove[kingPosition].isThreatened()) {
                            legalMoves.push(tileCandidate);
                        }
                    }
                }
            }
        }

        return legalMoves;
    }

    firstColumnExclusion(vector, lastTilePosition) {
        let answer = false;
        if (isFirstColumn(lastTilePosition) && (vector == -9 || vector == 7)) {
            answer = true;
        }
        return answer;
    }
    eighthColumnExclusion(vector, lastTilePosition) {
        let answer = false;
        if (isEighthColumn(lastTilePosition) && (vector == -7 || vector == 9)) {
            answer = true;
        }
        return answer;
    }
}