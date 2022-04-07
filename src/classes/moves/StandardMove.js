import { MoveMainClass } from "./MoveMainClass";
import { Tile } from "../board/Tile";
import { Bishop } from "../pieces/Bishop";
import { King } from "../pieces/King";
import { Knight } from "../pieces/Knight";
import { Pawn } from "../pieces/Pawn";
import { Queen } from "../pieces/Queen";
import { Rook } from "../pieces/Rook";
import { EmptyTiles } from "../../utils/EmptyTiles";
import { WhiteBishopTiles, WhiteKingTiles, WhiteKnightTiles, WhitePawnTiles, WhiteQueenTiles, WhiteRooksTiles } from "../../utils/WhitePieceTiles";
import { blackBishopTiles, blackKingTiles, blackKnightTiles, blackPawnTiles, blackQueenTiles, blackRooksTiles } from "../../utils/BlackPieceTiles";

export class StandardMove extends MoveMainClass{

    execute(){

        const pieceType = this.pieceToMove.getPieceType();
        const pieceAlliance = this.pieceToMove.getAlliance();

        let newTiles = []
        const originCoordinate = this.pieceToMove.getPosition();

        for(let i=0;i<64;i++){
            if(i == originCoordinate){
                //Vaciamos el escaque de origen
                newTiles[i] = EmptyTiles.get(i);
                //Ponemos la pieza en su nuevo lugar si es blanca
            } else if(i == this.destinationCoordinate && pieceAlliance == "white"){
                let newTile = {}
                switch(pieceType){
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
                //Ponemos la pieza en su nuevo lugar si es negra
            } else if(i == this.destinationCoordinate && pieceAlliance == "black"){
                let newTile = {}
                switch(pieceType){
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
                //Repetimos el resto de los casilleros.
            } else {
                newTiles[i] = this.board[i];
            }
        }
        return newTiles;
    }
}