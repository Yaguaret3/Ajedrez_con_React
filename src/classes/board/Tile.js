import { Player } from "../Player";

export class Tile {
    constructor(piece, coordinate) {
        this.piece = piece;
        this.coordinate = coordinate;
        this.isLegalMove = false;
    }

    setLegalMove(toggle) {
        this.isLegalMove = toggle;
    }

    getCoordinate() {
        return this.coordinate;
    }

    setPiece(piece) {
        this.piece = piece;
    }

    isOccupied() {
        if (this.piece === null) {
            return false;
        }
        return true;
    }

    getPiece() {
        return this.piece;
    }
    getLegalMove() {
        return this.isLegalMove;
    }
    isThreatened(board, playerToMove) {

        let opponent = null;
        if (playerToMove.getAlliance() === "white") {
            opponent = new Player("black");
        } else if (playerToMove.getAlliance() === "black") {
            opponent = new Player("white");
        }
        const opponentThreats = opponent.getTilesThatThreatens(board);
        for (const threat of opponentThreats) {
            if (threat === this.coordinate) {
                return true;
            }
        }

        return false;
    }

}