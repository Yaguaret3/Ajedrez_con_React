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

    getKing(board){
        for(const tile of board){
            const piece = tile.getPiece();
            if(piece?.getAlliance() == this.alliance && piece?.getPieceType() == "K"){
                return piece;
            }
        }
    }
    getOpponentMoves(board){

        let opponentMoves = []
        let opponentAlliance = "";
        if(this.alliance == "white"){
            opponentAlliance = "black";
        } else if(this.alliance == "black"){
            opponentAlliance = "white";
        }

        const opponent = new Player(opponentAlliance ,board);
        
        for(const tile of board){
            const piece = tile.getPiece();
            const pieceAlliance = piece?.getAlliance();
            if(pieceAlliance != this.alliance){
                opponentMoves.concat(piece?.threats(board, opponent));
            }
        }
        return opponentMoves;
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