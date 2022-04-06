import {isFirstColumn, isEighthColumn} from '../board/ColumnsAndRows';
import { movePiece } from '../moves/MovePiece';
import Piece from './Piece';

export class Rook extends Piece {

    getPieceType() {
        return "R";
    }

    calculateCandidatesVector = [-8, -1, 1, 8];

    threats(board, playerToMove){

        let legalMoves = [];

        for (let vector of this.calculateCandidatesVector) {
            if(this.firstColumnExclusion(vector,this.position) || 
                this.eighthColumnExclusion(vector,this.position)){
                continue;
            }
            let tileCandidate = this.position + vector;
            if (tileCandidate >= 0 && tileCandidate < 64) {
                while (tileCandidate >= 0 && tileCandidate < 64 && !board[tileCandidate].isOccupied()) {
                    if(!this.firstColumnExclusion(vector, tileCandidate) && !this.eighthColumnExclusion(vector, tileCandidate)){
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
        return legalMoves;

    }

    legalMoves(board, playerToMove) {

        // Determinar posición del Rey
        let kingPosition = -1;
        const boardIsArray = Array.isArray(board);

        if(boardIsArray){
            for(const tile of board){
                if(tile.getPiece()?.getPieceType() == "K"){
                    kingPosition = tile.getCoordinate();
                }
            }
        }

        // Declaro el arreglo que vamos a devolver
        let legalMoves = [];

        // Hacemos un ciclo para cada vector para ir llenando el arreglo
        for (let vector of this.calculateCandidatesVector) {
            // Comparamos si el vector aplica a la posición de la pieza
            if(this.firstColumnExclusion(vector,this.position) || 
                this.eighthColumnExclusion(vector,this.position)){
                continue;
            }
            // Proponemos un destino posible
            let tileCandidate = this.position + vector;
            // Comparamos si no se sale del tablero, seguimos
            if (tileCandidate >= 0 && tileCandidate < 64 && boardIsArray) {
                // Mientras no se salga del tablero y el destino posible no esté ocupado, hacemos
                while (tileCandidate >= 0 && tileCandidate < 64 && !board[tileCandidate].isOccupied()) {
                    // Mientras el vector siga aplicando a la columna del destino, sumamos el destino al array.
                    if(!this.firstColumnExclusion(vector, tileCandidate) && !this.eighthColumnExclusion(vector, tileCandidate)){
                        
                        
                        
                        // Fijarse que no quede el rey amenazado
                        const tempMove = movePiece(board[this.position], board[tileCandidate], board, playerToMove);
                        if(!tempMove[kingPosition].isThreatened()){
                            legalMoves.push(tileCandidate);
                        }
                        tileCandidate += vector; 

                    } else {
                        break;
                    }
                }
            }
            // Miramos si el destino tiene una pieza. Si es del enemigo, sumamos el destino al array.
            if (tileCandidate >= 0 && tileCandidate < 64 && boardIsArray) {
                if (board[tileCandidate].getPiece()?.getAlliance() != this.alliance) {
                    
                    // Fijarse que no quede el rey amenazado
                    const tempMove = movePiece(board[this.position], board[tileCandidate], board, playerToMove);
                    if(!tempMove[kingPosition].isThreatened()){
                        legalMoves.push(tileCandidate);
                    }
                }
            }
        }
        return legalMoves;
    }

    firstColumnExclusion(vector, lastTilePosition){
        let answer = false;
        if(isFirstColumn(lastTilePosition) && vector == -1){
            answer = true;
        }
        return answer;
    }
    eighthColumnExclusion(vector, lastTilePosition){
        let answer = false;
        if(isEighthColumn(lastTilePosition) && vector == 1){
            answer = true;
        }
        return answer;
    }

}