import { MoveMainClass } from "./MoveMainClass";
import { EmptyTiles } from "../../utils/EmptyTiles";
import { WhiteKingTiles, WhiteRooksTiles } from "../../utils/WhitePieceTiles";
import { blackKingTiles, blackRooksTiles } from "../../utils/BlackPieceTiles";

export class CastlingMove extends MoveMainClass {

    execute() {

        const pieceAlliance = this.pieceToMove.getAlliance();
        let rookOrigin = -1;
        let rookDestination = -1;

        switch (this.destinationCoordinate) {
            case 2: rookOrigin = 0;
                rookDestination = 3;
                break;
            case 6: rookOrigin = 7;
                rookDestination = 5;
                break;
            case 58: rookOrigin = 56;
                rookDestination = 59;
                break;
            case 62: rookOrigin = 63;
                rookDestination = 61;
                break;
        }

        let newTiles = []
        const originCoordinate = this.pieceToMove.getPosition();

        for (let i = 0; i < 64; i++) {
            if (i === originCoordinate) {
                //Vaciamos el escaque de origen
                newTiles[i] = EmptyTiles.get(i);
                //Ponemos la pieza en su nuevo lugar si es blanca
            } else if (i === this.destinationCoordinate && pieceAlliance === "white") {
                let newTile = WhiteKingTiles.get(i);
                newTile.getPiece().alreadyMovedPiece();
                newTiles[i] = newTile;
                //Ponemos la pieza en su nuevo lugar si es negra
            } else if (i === this.destinationCoordinate && pieceAlliance === "black") {
                let newTile = blackKingTiles.get(i);
                newTile.getPiece().alreadyMovedPiece();
                newTiles[i] = newTile;


                //Diferencia con StandardMove es que vaciamos el escaque de la torre, y 
            } else if (i === rookOrigin) {
                newTiles[i] = EmptyTiles.get(i);
                //Ponemos la torre en su nuevo lugar
            } else if (i === rookDestination && pieceAlliance === "white") {
                newTiles[i] = WhiteRooksTiles.get(i);
            } else if (i === rookDestination && pieceAlliance === "black") {
                newTiles[i] = blackRooksTiles.get(i);



            } else {
                newTiles[i] = this.board[i];
            }
        }
        return newTiles;
    }
}