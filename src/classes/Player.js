export class Player {

    constructor(alliance) {
        this.alliance = alliance;
    }

    getAlliance() {
        return this.alliance;
    }

    getTotalLegalMoves(board) {
        let legalMoves = []
        for (const tile of board) {
            const piece = tile.getPiece();
            if (piece?.getAlliance() == this.alliance) {
                const moves = piece.legalMoves(board, this);
                if (moves.length > 0) {
                    for (const move of moves) {
                        legalMoves.push(move);
                    }
                }
            }
        }
        
        return legalMoves;
    }
    // En los arrays se REPITEN! Quizás hacer un Set.
    getTilesThatThreatens(board) {
        let tilesAttacked = []
        for (const tile of board) {
            const piece = tile.getPiece();
            if (piece?.getAlliance() == this.alliance) {
                const threats = piece.threats(board, this);
                if (threats.length > 0) {
                    for (const threat of threats) {
                        tilesAttacked.push(threat);
                    }
                }
            }
        }
        return tilesAttacked;
    }

    getKing(board) {
        for (const tile of board) {
            const piece = tile.getPiece();
            if (piece?.getAlliance() == this.alliance && piece?.getPieceType() == "K") {
                return piece;
            }
        }
    }

    endOfGame(board) {

        let kingPosition = -1;
        const legalMoves = this.getTotalLegalMoves(board);
        for (const tile of board) {
            const piece = tile.getPiece();
            if (piece?.getPieceType() == "K" && piece?.getAlliance() == this.alliance) {
                kingPosition = tile.getCoordinate();
            }
        }
        if(board.length == 0){
            return;
        } else if (board[kingPosition].isThreatened(board, this)) {

            // AQUÍ DEBERÍA SER "legalMoves.lenght == 0", PERO COMO PUSHEAMOS LOS ENROQUES EN LEGALMOVES, CUANDO SON IMPOSIBLES QUEDAN UNDEFINED, PERO EXISTENTES
            if (legalMoves.length < 3) {
                alert("Checkmate on " + this.alliance + "!");
                return;
            }

            alert("Check on " + this.alliance)
        } else if (legalMoves.length < 3) {
            alert("Stalemate! Both players draw");
        }
    }

}