export class Player{

    constructor(alliance){
        this.alliance = alliance;
    }

    getAlliance(){
        return this.alliance;
    }

    getTotalLegalMoves(board){
        let legalMoves = []
        if(Array.isArray(board)){
            for(const tile of board){
                const piece = tile.getPiece();
                if(piece?.getAlliance() == this.alliance){
                    legalMoves.concat(piece.legalMoves(board, this));
                }
            }
        }
        return legalMoves;
    }
    // En los arrays se REPITEN! Quizás hacer un Set.
    getTilesThatThreatens(board){
        let tilesAttacked = []
        if(Array.isArray(board)){
            for(const tile of board){
                const piece = tile.getPiece();
                if(piece?.getAlliance() == this.alliance){
                    const threats = piece.threats(board, this);
                    if(threats.length >0){
                        for(const threat of threats){
                            tilesAttacked.push(threat);
                        }
                    }
                }
            }
        }
        return tilesAttacked;
    }

    getKing(board){
        for(const tile of board){
            const piece = tile.getPiece();
            if(piece?.getAlliance() == this.alliance && piece?.getPieceType() == "K"){
                return piece;
            }
        }
    }
    
    isInCheck(){
        for(let opponentMove of this.opponentMoves){
            if(opponentMove == this.king.getPosition()){
                return true;
            }
        }
        return false;
    }
    isInCheckMate(){
        if(this.inCheck && this.totalLegalMoves.length == 0){
            alert(this.alliance +" is in CheckMate!")
            return true;
        }
        return false;
    }
    isInStaleMate(){
        if(!this.inCheck && this.totalLegalMoves.length == 0){
            //alert("Stalemate! End of the game.");
            return true;
        }
        return false;
    }

}