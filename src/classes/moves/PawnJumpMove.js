import { MoveMainClass } from "./MoveMainClass";
import { WhiteBishopTiles, WhiteKingTiles, WhiteKnightTiles, WhitePawnTiles, WhiteQueenTiles, WhiteRooksTiles } from "../../utils/WhitePieceTiles";
import { blackBishopTiles, blackKingTiles, blackKnightTiles, blackPawnTiles, blackQueenTiles, blackRooksTiles } from "../../utils/BlackPieceTiles";
import { EmptyTiles } from "../../utils/EmptyTiles";

export class PawnJumpMove extends MoveMainClass{

    execute(){

        const pieceAlliance = this.pieceToMove.getAlliance();
        const originCoordinate = this.pieceToMove.getPosition();

        let newTiles = []

        for(let i=0;i<64;i++){
            if(i === originCoordinate){
                newTiles[i] = EmptyTiles.get(i);
                //Blanca
            } else if(i === this.destinationCoordinate && pieceAlliance === "white"){
                let newTile = WhitePawnTiles.get(i);
                newTile.getPiece().alreadyMovedPiece();

                //La única diferencia con StandardMove es que le damos al peón la propiedad PawnJump en true, para que EnPassant el adversario la reconozca.
                newTile.getPiece().setPawnJump();

                
                newTiles[i] = newTile;
                //Negra
            } else if(i === this.destinationCoordinate && pieceAlliance === "black"){
                let newTile = blackPawnTiles.get(i);
                newTile.getPiece().alreadyMovedPiece();
                newTile.getPiece().setPawnJump();
                newTiles[i] = newTile;
            } else {
                newTiles[i] = this.board[i];
            }
        }
        return newTiles;
    }
}