import { Player } from "../Player";

export class Tile{
    constructor(piece, coordinate, board, playerToMove){
        this.piece = piece;
        this.coordinate = coordinate;
        this.isLegalMove = false;
        this.playerToMove = playerToMove;
        this.threated = this.isThreatened(board);
    }

    setLegalMove(toggle){
        this.isLegalMove = toggle;
    }

    getCoordinate(){
        return this.coordinate;
    }

    setPiece(piece){
        this.piece = piece;
    }

    isOccupied(){
        if(this.piece == null){
            return false;
        }
        return true;
    }

    getPiece(){
        return this.piece;
    }
    getLegalMove(){
        return this.isLegalMove;
    }
    isThreatened(board){
        /*if(Array.isArray(board)){
            const opponentMoves = new Player(this.playerToMove.getAlliance(), board).getOpponentMoves(board);
            for(const move of opponentMoves){
                if(move == this.coordinate){
                    return true;
                }
            }
        }*/
        
        return false;
    }

}