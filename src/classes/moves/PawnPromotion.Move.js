import { MoveMainClass } from "./MoveMainClass";
import { WhiteBishopTiles, WhiteKnightTiles, WhiteQueenTiles, WhiteRooksTiles } from "../../utils/WhitePieceTiles";
import { blackBishopTiles, blackKnightTiles, blackQueenTiles, blackRooksTiles } from "../../utils/BlackPieceTiles";
import { EmptyTiles } from "../../utils/EmptyTiles";

export class PawnPromotionMove extends MoveMainClass{

    execute(pieceTypeChosen){

        const pieceAlliance = this.pieceToMove.getAlliance();

        let newTiles = []
        const originCoordinate = this.pieceToMove.getPosition();

        for(let i=0;i<64;i++){
            if(i == originCoordinate){
                newTiles[i] = EmptyTiles.get(i);
            } else if(i == this.destinationCoordinate && pieceAlliance == "white"){
                let newTile = {}

                // La diferencia con el StandardMove es que la pieza a ubicarse en el casillero de destino es la elegida, que vino por parámetro.
                switch(pieceTypeChosen){
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
                }
                newTile.getPiece().alreadyMovedPiece();
                newTiles[i] = newTile;
                //Ponemos la pieza en su nuevo lugar si es negra
            } else if(i == this.destinationCoordinate && pieceAlliance == "black"){
                let newTile = {}
                switch(pieceTypeChosen){
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
                }
                newTile.getPiece().alreadyMovedPiece();
                newTiles[i] = newTile;
                //Repetimos el resto de los casilleros.
            } else {
                newTiles[i] = this.board[i];
            }
        }
        return newTiles;
    }
}