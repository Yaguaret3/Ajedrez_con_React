import { movePiece } from '../../utils/MovePiece';
import { isEighthColumn, isFirstColumn, isSecondColumn, isSeventhColumn } from '../../utils/ColumnsAndRows';
import Piece from './Piece';

export class Knight extends Piece {

    getPieceType() {
        return "N";
    }

    calculateCandidates = [-6, -10, -15, -17, 6, 10, 15, 17];

    threats(board, playerToMove) {

        let threats = [];

        if (playerToMove?.getAlliance() == this.alliance) {

            for (let candidate of this.calculateCandidates) {
                let tileCandidate = this.position + candidate;
                if (this.firstColumnExclusion(candidate) ||
                    this.eighthColumnExclusion(candidate) ||
                    this.secondColumnExclusion(candidate) ||
                    this.seventhColumnExclusion(candidate)) {
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

        let kingPosition = -1;
        for (const tile of board) {
            if (tile.getPiece()?.getPieceType() == "K" && tile.getPiece().getAlliance() == this.alliance) {
                kingPosition = tile.getCoordinate();
            }
        }

        let legalMoves = [];

        if (playerToMove?.getAlliance() == this.alliance) {
        
            for (let candidate of this.calculateCandidates) {
                if (this.firstColumnExclusion(candidate) ||
                    this.eighthColumnExclusion(candidate) ||
                    this.secondColumnExclusion(candidate) ||
                    this.seventhColumnExclusion(candidate)) {
                    continue;
                }
                const tileCandidate = this.position + candidate;
    
                if (tileCandidate >= 0 && tileCandidate < 64) {
                    for (const tile of board) {
                        if (tileCandidate == tile.getCoordinate()) {
    
                            if (!tile.isOccupied() || tile.getPiece().getAlliance() != this.alliance) {
                                const tempMove = movePiece(board[this.position], board[tileCandidate], board, playerToMove);
                                if (!tempMove[kingPosition].isThreatened(tempMove, playerToMove)) {
                                    legalMoves.push(tileCandidate);
                                }
                            }
                        }
                    }
                }
            }
        }
        return legalMoves;
    }

    firstColumnExclusion(candidate) {
        let answer = false;
        if (isFirstColumn(this.position) && (candidate == -17 || candidate == -10 || candidate == 6 || candidate == 15)) {
            answer = true;
        }
        return answer;
    }
    eighthColumnExclusion(candidate) {
        let answer = false;
        if (isEighthColumn(this.position) && (candidate == -15 || candidate == -6 || candidate == 10 || candidate == 17)) {
            answer = true;
        }
        return answer;
    }
    secondColumnExclusion(candidate) {
        let answer = false;
        if (isSecondColumn(this.position) && (candidate == -10 || candidate == 6)) {
            answer = true;
        }
        return answer;
    }
    seventhColumnExclusion(candidate) {
        let answer = false;
        if (isSeventhColumn(this.position) && (candidate == -6 || candidate == 10)) {
            answer = true;
        }
        return answer;
    }
}