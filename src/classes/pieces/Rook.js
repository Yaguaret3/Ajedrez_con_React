import { movePiece } from '../../utils/MovePiece';
import { isFirstColumn, isEighthColumn } from '../../utils/ColumnsAndRows';
import Piece from './Piece';

export class Rook extends Piece {

    getPieceType() {
        return "R";
    }

    calculateCandidatesVector = [-8, -1, 1, 8];

    threats(board, playerToMove) {

        let threats = [];

        if (playerToMove.getAlliance() == this.alliance) {
            for (let vector of this.calculateCandidatesVector) {
                if (this.firstColumnExclusion(vector, this.position) ||
                    this.eighthColumnExclusion(vector, this.position)) {
                    continue;
                }
                let tileCandidate = this.position + vector;
                if (tileCandidate >= 0 && tileCandidate < 64) {
                    while (tileCandidate >= 0 && tileCandidate < 64 && !board[tileCandidate].isOccupied()) {
                        if (!this.firstColumnExclusion(vector, tileCandidate) && !this.eighthColumnExclusion(vector, tileCandidate)) {
                            threats.push(tileCandidate);
                            tileCandidate += vector;
                        } else {
                            break;
                        }
                    }
                }
                if (tileCandidate >= 0 && tileCandidate < 64) {
                    threats.push(tileCandidate);
                }
            }
        }
        return threats;

    }

    legalMoves(board, playerToMove) {

        // Determinar posición del Rey PROPIO! CSM
        let kingPosition = -1;

        for (const tile of board) {
            if (tile.getPiece()?.getPieceType() == "K" && tile.getPiece().getAlliance() == this.alliance) {
                kingPosition = tile.getCoordinate();
            }
        }
        // Declaro el arreglo que vamos a devolver
        let legalMoves = [];

        // El movimiento es legal si coincide con el color del jugador.
        if (playerToMove?.getAlliance() == this.alliance) {

            // Hacemos un ciclo para cada vector para ir llenando el arreglo
            for (let vector of this.calculateCandidatesVector) {
                // Comparamos si el vector aplica a la posición de la pieza
                if (this.firstColumnExclusion(vector, this.position) ||
                    this.eighthColumnExclusion(vector, this.position)) {
                    continue;
                }
                // Proponemos un destino posible
                let tileCandidate = this.position + vector;
                // Comparamos si no se sale del tablero, seguimos
                if (tileCandidate >= 0 && tileCandidate < 64) {
                    // Mientras no se salga del tablero y el destino posible no esté ocupado, hacemos
                    while (tileCandidate >= 0 && tileCandidate < 64 && !board[tileCandidate].isOccupied()) {
                        // Mientras el vector siga aplicando a la columna del destino, sumamos el destino al array.
                        if (!this.firstColumnExclusion(vector, tileCandidate) && !this.eighthColumnExclusion(vector, tileCandidate)) {



                            // Fijarse que no quede el rey amenazado
                            const tempMove = movePiece(board[this.position], board[tileCandidate], board, playerToMove);
                            if (!tempMove[kingPosition].isThreatened(tempMove, playerToMove)) {
                                legalMoves.push(tileCandidate);
                            }
                            tileCandidate += vector;

                        } else {
                            break;
                        }
                    }
                }
                // Miramos si el destino tiene una pieza. Si es del enemigo, sumamos el destino al array.
                if (tileCandidate >= 0 && tileCandidate < 64) {
                    if (board[tileCandidate].getPiece()?.getAlliance() != this.alliance) {

                        // Fijarse que no quede el rey amenazado
                        const tempMove = movePiece(board[this.position], board[tileCandidate], board, playerToMove);
                        if (!tempMove[kingPosition].isThreatened(tempMove, playerToMove)) {
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
        if (isFirstColumn(lastTilePosition) && vector == -1) {
            answer = true;
        }
        return answer;
    }
    eighthColumnExclusion(vector, lastTilePosition) {
        let answer = false;
        if (isEighthColumn(lastTilePosition) && vector == 1) {
            answer = true;
        }
        return answer;
    }

}