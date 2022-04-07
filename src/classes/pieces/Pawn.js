import { movePiece } from '../../utils/MovePiece';
import { isEighthColumn, isFirstColumn, isFifthRow } from '../../utils/ColumnsAndRows';
import Piece from './Piece';

export class Pawn extends Piece {
    constructor(alliance, position, moved) {
        super(alliance, position, moved);
        this.forward = this.alliance == "white" ? -8 : 8;
        this.taking = this.alliance == "white" ? [-9, -7] : [7, 9];
    }

    getPieceType() {
        return "P";
    }
    setPawnJump(param) {
        this.pawnJump = param;
    }

    threats(board, playerToMove) {

        let threats = [];

        if (playerToMove?.getAlliance() == this.alliance) {
            // Pawn Attack
            for (let attack of this.taking) {
                const candidateAttack = this.position + attack;
                if ((this.firstColumnExclusion(attack) || this.eighthColumnExclusion(attack))) {
                    continue;
                } else if (candidateAttack >= 0 && candidateAttack < 64) {
                    for (let tile of board) {
                        if (candidateAttack == tile.getCoordinate()) {
                            threats.push(candidateAttack);
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
            const candidateForward = this.position + this.forward;

            if (candidateForward > 0 && candidateForward < 64) {

                for (let tile of board) {
                    // No avanza si la casilla está ocupada.
                    if (candidateForward == tile.getCoordinate() && !tile.isOccupied()) {

                        const tempMove = movePiece(board[this.position], board[candidateForward], board, playerToMove);
                        if (!tempMove[kingPosition].isThreatened(tempMove, playerToMove)) {
                            legalMoves.push(candidateForward);
                        }

                        // Pawn Jump
                        if (this.moved == false && !board[candidateForward + this.forward].isOccupied()) {

                            const tempMove2 = movePiece(board[this.position], board[candidateForward + this.forward], board, playerToMove);
                            if (!tempMove2[kingPosition].isThreatened(tempMove2, playerToMove)) {
                                legalMoves.push(candidateForward + this.forward);    
                            }
                        }
                    }
                }
            }
            // Pawn Attack
            for (let attack of this.taking) {
                const candidateAttack = this.position + attack;
                if ((this.firstColumnExclusion(attack) || this.eighthColumnExclusion(attack))) {
                    continue;
                }
                if (candidateAttack >= 0 && candidateAttack < 64) {
                    for (let tile of board) {
                        if (candidateAttack == tile.getCoordinate() && tile.isOccupied() && tile.getPiece().getAlliance() != this.alliance) {

                            const tempMove = movePiece(board[this.position], board[candidateAttack], board, playerToMove);
                            if (!tempMove[kingPosition].isThreatened(tempMove, playerToMove)) {
                                legalMoves.push(candidateAttack);
                            }
                        }
                    }

                }
            }
            // En Passant Pawn Attack
            // Si estoy en la quinta fila, y si tengo al lado un peón que acaba de mover con salto de peón, entonces puedo hacer un ataque.

            if (isFifthRow(this.alliance, this.position)) {
                if (!isFirstColumn(this.position) && board[this.position + 1].getPiece()?.hasPawnJump()) {

                    const tempMove = movePiece(this.position, this.position + this.taking[1], board, playerToMove);
                    if (!tempMove[kingPosition].isThreatened(tempMove, playerToMove)) {
                        legalMoves.push(this.position + this.taking[1]);
                    }
               } else if (!isEighthColumn(this.position) && board[this.position - 1].getPiece()?.hasPawnJump()) {

                    const tempMove = movePiece(this.position, this.position + this.taking[0], board, playerToMove);
                    if (!tempMove[kingPosition].isThreatened(tempMove, playerToMove)) {
                        legalMoves.push(this.position + this.taking[0]);    
                    }
                }
            }
        }
        return legalMoves;
    }

    firstColumnExclusion(candidate) {
        let answer = false;
        if (isFirstColumn(this.position) && (candidate == 7 || candidate == -9)) {
            answer = true;
        }
        return answer;
    }
    eighthColumnExclusion(candidate) {
        let answer = false;
        if (isEighthColumn(this.position) && (candidate == -7 || candidate == 9)) {
            answer = true;
        }
        return answer;
    }
}