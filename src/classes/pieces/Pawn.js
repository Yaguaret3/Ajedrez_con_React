import { isEighthColumn, isFirstColumn, isFifthRow } from '../board/ColumnsAndRows';
import { movePiece } from '../moves/MovePiece';
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

        let legalMoves = [];

        if (playerToMove?.getAlliance() == this.alliance) {
            // Pawn Attack
            for (let attack of this.taking) {
                const candidateAttack = this.position + attack;
                if ((this.firstColumnExclusion(candidateAttack) || this.eighthColumnExclusion(candidateAttack))) {
                    continue;
                }
                if (candidateAttack >= 0 && candidateAttack < 64) {
                    for (let tile of board) {
                        if (candidateAttack == tile.getCoordinate() && tile.isOccupied() && tile.getPiece().getAlliance() != this.alliance) {
                            legalMoves.push(candidateAttack);
                        }
                    }
                }
            }
            // En Passant Pawn Attack
            if (isFifthRow(this.alliance, this.position)) {
                if (!isFirstColumn(this.position) && board[this.position + 1].getPiece()?.hasPawnJump()) {
                    legalMoves.push(this.position + this.taking[1]);
                } else if (!isEighthColumn(this.position) && board[this.position - 1].getPiece()?.hasPawnJump()) {
                    legalMoves.push(this.position + this.taking[0]);
                }
            }
        }
        return legalMoves;
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
        const candidateForward = this.position + this.forward;

        if (candidateForward > 0 && candidateForward < 64) {
            if (boardIsArray) {
                for (let tile of board) {
                    // No avanza si la casilla está ocupada.
                    if (candidateForward == tile.getCoordinate() && !tile.isOccupied()) {

                        legalMoves.push(candidateForward);
                        /*const tempMove = movePiece(board[this.position], board[candidateForward], board, playerToMove);

                        if (!tempMove[kingPosition].isThreatened()) {
                            
                        }*/

                        // Pawn Jump
                        if (this.moved == false && !board[candidateForward + this.forward].isOccupied()) {

                            legalMoves.push(candidateForward + this.forward);
                            /*const tempMove2 = movePiece(board[this.position], board[candidateForward + this.forward], board, playerToMove);
                            if (!tempMove2[kingPosition].isThreatened()) {
                                
                            }*/

                        }
                    }
                }
            }
        }
        // Pawn Attack
        for (let attack of this.taking) {
            const candidateAttack = this.position + attack;
            if ((this.firstColumnExclusion(candidateAttack) || this.eighthColumnExclusion(candidateAttack))) {
                continue;
            }
            if (candidateAttack >= 0 && candidateAttack < 64) {
                if (boardIsArray) {
                    for (let tile of board) {
                        if (candidateAttack == tile.getCoordinate() && tile.isOccupied() && tile.getPiece().getAlliance() != this.alliance) {

                            legalMoves.push(candidateAttack);

                            /*const tempMove = movePiece(this.position, candidateAttack, board, playerToMove);
                            if (!tempMove[kingPosition].isThreatened()) {
                                
                            }*/
                        }
                    }
                }

            }
        }
        // En Passant Pawn Attack
        // Si estoy en la quinta fila, y si tengo al lado un peón que acaba de mover con salto de peón, entonces puedo hacer un ataque.
        
        if (isFifthRow(this.alliance, this.position)) {
            if (!isFirstColumn(this.position) && board[this.position + 1].getPiece()?.hasPawnJump()) {
                

                legalMoves.push(this.position + this.taking[1]);
                /*const tempMove = movePiece(this.position, this.position + this.taking[1], board, playerToMove);
                if (!tempMove[kingPosition].isThreatened()) {
                    
                }*/

            } else if (!isEighthColumn(this.position) && board[this.position - 1].getPiece()?.hasPawnJump()) {

                legalMoves.push(this.position + this.taking[0]);
                /*const tempMove = movePiece(this.position, this.position + this.taking[0], board, playerToMove);
                if (!tempMove[kingPosition].isThreatened()) {
                    
                }*/
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