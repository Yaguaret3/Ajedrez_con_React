import { MoveMainClass } from "./MoveMainClass";
import { WhiteBishopTiles, WhiteKingTiles, WhiteKnightTiles, WhitePawnTiles, WhiteQueenTiles, WhiteRooksTiles } from "../../utils/WhitePieceTiles";
import { EmptyTiles } from "../../utils/EmptyTiles";
import { blackBishopTiles, blackKingTiles, blackKnightTiles, blackPawnTiles, blackQueenTiles, blackRooksTiles } from "../../utils/BlackPieceTiles";

export class EnPassantMove extends MoveMainClass {

    execute(pieceToTakeEnPassant) {

        const pieceType = this.pieceToMove.getPieceType();
        const pieceAlliance = this.pieceToMove.getAlliance();
        const pieceToTakePosition = pieceToTakeEnPassant.getPosition();

        let newTiles = []
        const originCoordinate = this.pieceToMove.getPosition();

        for (let i = 0; i < 64; i++) {
            if (i == originCoordinate) {
                newTiles[i] = EmptyTiles.get(i);
                //Blanca
            } else if (i == this.destinationCoordinate && pieceAlliance == "white") {
                let newTile = {}
                switch (pieceType) {
                    case "R":
                        newTile = WhiteRooksTiles.get(i);
                        break;
                    case "N":
                        newTile = WhiteKnightTiles.get(i);
                        break;
                    case "B":
                        newTile = WhiteBishopTiles.get(i);
                        break;
                    case "Q":
                        newTile = WhiteQueenTiles.get(i);
                        break;
                    case "K":
                        newTile = WhiteKingTiles.get(i);
                        break;
                    case "P":
                        newTile = WhitePawnTiles.get(i);
                        break;
                }
                newTile.getPiece().alreadyMovedPiece();
                newTiles[i] = newTile;
                //Negra
            } else if (i == this.destinationCoordinate && pieceAlliance == "black") {
                let newTile = {}
                switch (pieceType) {
                    case "R":
                        newTile = blackRooksTiles.get(i);
                        break;
                    case "N":
                        newTile = blackKnightTiles.get(i);
                        break;
                    case "B":
                        newTile = blackBishopTiles.get(i);
                        break;
                    case "Q":
                        newTile = blackQueenTiles.get(i);
                        break;
                    case "K":
                        newTile = blackKingTiles.get(i);
                        break;
                    case "P":
                        newTile = blackPawnTiles.get(i);
                        break;
                }
                newTile.getPiece().alreadyMovedPiece();
                newTiles[i] = newTile;


                //La diferencia con el standardMove es que vaciamos el escaque de la pieza tomada al paso
            } else if (i == pieceToTakePosition) {
                newTiles[i] = EmptyTiles.get(i);


            } else {
                newTiles[i] = this.board[i];
            }
        }
        return newTiles;
    }
}