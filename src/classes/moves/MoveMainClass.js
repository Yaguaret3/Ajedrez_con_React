import { Tile } from "../board/Tile";
import { Bishop } from "../pieces/Bishop";
import { King } from "../pieces/King";
import { Knight } from "../pieces/Knight";
import { Pawn } from "../pieces/Pawn";
import { Queen } from "../pieces/Queen";
import { Rook } from "../pieces/Rook";

export class MoveMainClass{
    constructor(pieceToMove, destinationCoordinate, board, playerToMove){
        this.pieceToMove = pieceToMove;
        this.destinationCoordinate = destinationCoordinate;
        this.board = board;
        this.playerToMove = playerToMove;
    }
}

export class StandardMove extends MoveMainClass{

    execute(){

        const pieceType = this.pieceToMove.getPieceType();
        const pieceAlliance = this.pieceToMove.getAlliance();
        const pieceHasMoved = this.pieceToMove.hasMoved();

        let newTiles = []
        const originCoordinate = this.pieceToMove.getPosition();

        for (let tile of this.board) {
            
            const tileCoordinate = tile.getCoordinate();

            // Vaciamos el escaque de origen
            if(tileCoordinate == originCoordinate){
                let newTile = new Tile(null, tileCoordinate, this.board, this.playerToMove);    
                newTiles.push(newTile);
            // Ponemos la pieza en su nuevo lugar
            } else if(tileCoordinate == this.destinationCoordinate){
                let newPiece = {};
                switch(pieceType){
                    case "R":
                        newPiece = new Rook(pieceAlliance, this.destinationCoordinate, pieceHasMoved);
                        break;
                    case "N":
                        newPiece = new Knight(pieceAlliance, this.destinationCoordinate, pieceHasMoved);
                        break;
                    case "B":
                        newPiece = new Bishop(pieceAlliance, this.destinationCoordinate, pieceHasMoved);
                        break;
                    case "Q":
                        newPiece = new Queen(pieceAlliance, this.destinationCoordinate, pieceHasMoved);
                        break;
                    case "K":
                        newPiece = new King(pieceAlliance, this.destinationCoordinate, pieceHasMoved);
                        break;
                    case "P":
                        newPiece = new Pawn(pieceAlliance, this.destinationCoordinate, pieceHasMoved);
                        break;
                }
                newPiece.alreadyMovedPiece();
                let newTile = new Tile(newPiece, tileCoordinate, this.board, this.playerToMove);
                newTiles.push(newTile);
            } else {
                const tilePiece = tile.getPiece();
                let tilePiecePieceType = "";
                let tilePieceAlliance = "";
                let tilePieceHasMoved = "";
                if(tilePiece != null){
                    tilePiecePieceType = tilePiece.getPieceType();
                    tilePieceAlliance = tilePiece.getAlliance();
                    tilePieceHasMoved = tilePiece.hasMoved();
                }
                let newPiece = {};
                switch(tilePiecePieceType){
                    case "R":
                        newPiece = new Rook(tilePieceAlliance, tileCoordinate, tilePieceHasMoved);
                        break;
                    case "N":
                        newPiece = new Knight(tilePieceAlliance, tileCoordinate, tilePieceHasMoved);
                        break;
                    case "B":
                        newPiece = new Bishop(tilePieceAlliance, tileCoordinate, tilePieceHasMoved);
                        break;
                    case "Q":
                        newPiece = new Queen(tilePieceAlliance, tileCoordinate, tilePieceHasMoved);
                        break;
                    case "K":
                        newPiece = new King(tilePieceAlliance, tileCoordinate, tilePieceHasMoved);
                        break;
                    case "P":
                        newPiece = new Pawn(tilePieceAlliance, tileCoordinate, tilePieceHasMoved);
                        break;
                    case "":
                        newPiece = null;
                        break;
                }
                let newTile = new Tile(newPiece, tileCoordinate, this.board, this.playerToMove);
                newTiles.push(newTile);
            }
        }
        return newTiles;
    }
}

export class PawnJumpMove extends MoveMainClass{

    execute(){

        const pieceAlliance = this.pieceToMove.getAlliance();
        const pieceHasMoved = this.pieceToMove.hasMoved();
        const originCoordinate = this.pieceToMove.getPosition();

        let newTiles = []

        for (let tile of this.board) {

            const tileCoordinate = tile.getCoordinate();

            if(tileCoordinate == originCoordinate){
                let newTile = new Tile(null, tileCoordinate, this.board, this.playerToMove);    
                newTiles.push(newTile);
            } else if(tileCoordinate == this.destinationCoordinate){
                let newPiece = {};
                newPiece = new Pawn(pieceAlliance, this.destinationCoordinate, pieceHasMoved);
                newPiece.alreadyMovedPiece();

                //Única diferencia con StandardMove es que acá le damos true a PawnJump, para que pueda buscarlo el En Passant.
                newPiece.setPawnJump(true);


                let newTile = new Tile(newPiece, tileCoordinate, this.board, this.playerToMove);
                newTiles.push(newTile);
            } else {
                const tilePiece = tile.getPiece();
                let tilePiecePieceType = "";
                let tilePieceAlliance = "";
                let tilePieceHasMoved = "";
                if(tilePiece != null){
                    tilePiecePieceType = tilePiece.getPieceType();
                    tilePieceAlliance = tilePiece.getAlliance();
                    tilePieceHasMoved = tilePiece.hasMoved();
                }
                let newPiece = {};
                switch(tilePiecePieceType){
                    case "R":
                        newPiece = new Rook(tilePieceAlliance, tileCoordinate, tilePieceHasMoved);
                        break;
                    case "N":
                        newPiece = new Knight(tilePieceAlliance, tileCoordinate, tilePieceHasMoved);
                        break;
                    case "B":
                        newPiece = new Bishop(tilePieceAlliance, tileCoordinate, tilePieceHasMoved);
                        break;
                    case "Q":
                        newPiece = new Queen(tilePieceAlliance, tileCoordinate, tilePieceHasMoved);
                        break;
                    case "K":
                        newPiece = new King(tilePieceAlliance, tileCoordinate, tilePieceHasMoved);
                        break;
                    case "P":
                        newPiece = new Pawn(tilePieceAlliance, tileCoordinate, tilePieceHasMoved);
                        break;
                    case "": newPiece = null;
                        break;
                }
                let newTile = new Tile(newPiece, tileCoordinate, this.board, this.playerToMove);
                newTiles.push(newTile);
            }
        }
        return newTiles;
    }

}

export class CastlingMove extends MoveMainClass{

    execute(){

        const pieceAlliance = this.pieceToMove.getAlliance();
        const pieceHasMoved = this.pieceToMove.hasMoved();
        let rookOrigin = -1;
        let rookDestination = -1;

        switch(this.destinationCoordinate){
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

        for (let tile of this.board) {
            
            const tileCoordinate = tile.getCoordinate();

            // Vaciamos el escaque de origen
            if(tileCoordinate == originCoordinate){
                let newTile = new Tile(null, tileCoordinate, this.board, this.playerToMove);    
                newTiles.push(newTile);
            // Ponemos la pieza en su nuevo lugar
            } else if(tileCoordinate == this.destinationCoordinate){
                let newPiece = {};
                newPiece = new King(pieceAlliance, this.destinationCoordinate, pieceHasMoved);
                newPiece.alreadyMovedPiece();
                let newTile = new Tile(newPiece, tileCoordinate, this.board, this.playerToMove);
                newTiles.push(newTile);


            //Diferencia con StandardMove es que vaciamos el escaque de la torre, y 
            } else if(tileCoordinate == rookOrigin){
                let newTile = new Tile(null, tileCoordinate, this.board, this.playerToMove);  
                newTiles.push(newTile);
            //Ponemos la torre en su nuevo lugar
            } else if(tileCoordinate == rookDestination){
                let newPiece = {};
                newPiece = new Rook(pieceAlliance, rookDestination, true);
                let newTile = new Tile(newPiece, tileCoordinate, this.board, this.playerToMove);
                newTiles.push(newTile);                


            }else {
                const tilePiece = tile.getPiece();
                let tilePiecePieceType = "";
                let tilePieceAlliance = "";
                let tilePieceHasMoved = "";
                if(tilePiece != null){
                    tilePiecePieceType = tilePiece.getPieceType();
                    tilePieceAlliance = tilePiece.getAlliance();
                    tilePieceHasMoved = tilePiece.hasMoved();
                }
                let newPiece = {};
                switch(tilePiecePieceType){
                    case "R":
                        newPiece = new Rook(tilePieceAlliance, tileCoordinate, tilePieceHasMoved);
                        break;
                    case "N":
                        newPiece = new Knight(tilePieceAlliance, tileCoordinate, tilePieceHasMoved);
                        break;
                    case "B":
                        newPiece = new Bishop(tilePieceAlliance, tileCoordinate, tilePieceHasMoved);
                        break;
                    case "Q":
                        newPiece = new Queen(tilePieceAlliance, tileCoordinate, tilePieceHasMoved);
                        break;
                    case "K":
                        newPiece = new King(tilePieceAlliance, tileCoordinate, tilePieceHasMoved);
                        break;
                    case "P":
                        newPiece = new Pawn(tilePieceAlliance, tileCoordinate, tilePieceHasMoved);
                        break;
                    case "":
                        newPiece = null;
                        break;
                }
                let newTile = new Tile(newPiece, tileCoordinate, this.board, this.playerToMove);
                newTiles.push(newTile);
            }
        }
        return newTiles;   
    }
}
export class EnPassantMove extends MoveMainClass{

    execute(pieceToTakeEnPassant){

        const pieceType = this.pieceToMove.getPieceType();
        const pieceAlliance = this.pieceToMove.getAlliance();
        const pieceHasMoved = this.pieceToMove.hasMoved();
        const pieceToTakePosition = pieceToTakeEnPassant.getPosition();

        let newTiles = []
        const originCoordinate = this.pieceToMove.getPosition();

        for (let tile of this.board) {
            
            const tileCoordinate = tile.getCoordinate();

            if(tileCoordinate == originCoordinate){
                let newTile = new Tile(null, tileCoordinate, this.board, this.playerToMove);    
                newTiles.push(newTile);
            } else if(tileCoordinate == this.destinationCoordinate){
                let newPiece = {};
                switch(pieceType){
                    case "R":
                        newPiece = new Rook(pieceAlliance, this.destinationCoordinate, pieceHasMoved);
                        break;
                    case "N":
                        newPiece = new Knight(pieceAlliance, this.destinationCoordinate, pieceHasMoved);
                        break;
                    case "B":
                        newPiece = new Bishop(pieceAlliance, this.destinationCoordinate, pieceHasMoved);
                        break;
                    case "Q":
                        newPiece = new Queen(pieceAlliance, this.destinationCoordinate, pieceHasMoved);
                        break;
                    case "K":
                        newPiece = new King(pieceAlliance, this.destinationCoordinate, pieceHasMoved);
                        break;
                    case "P":
                        newPiece = new Pawn(pieceAlliance, this.destinationCoordinate, pieceHasMoved);
                        break;
                }
                newPiece.alreadyMovedPiece();
                let newTile = new Tile(newPiece, tileCoordinate, this.board, this.playerToMove);
                newTiles.push(newTile);


            //La diferencia con el standardMove es que vaciamos el escaque de la pieza tomada al paso
            } else if(tileCoordinate == pieceToTakePosition){
                let newTile = new Tile(null, tileCoordinate, this.board, this.playerToMove);    
                newTiles.push(newTile);


            } else {
                const tilePiece = tile.getPiece();
                let tilePiecePieceType = "";
                let tilePieceAlliance = "";
                let tilePieceHasMoved = "";
                if(tilePiece != null){
                    tilePiecePieceType = tilePiece.getPieceType();
                    tilePieceAlliance = tilePiece.getAlliance();
                    tilePieceHasMoved = tilePiece.hasMoved();
                }
                let newPiece = {};
                switch(tilePiecePieceType){
                    case "R":
                        newPiece = new Rook(tilePieceAlliance, tileCoordinate, tilePieceHasMoved);
                        break;
                    case "N":
                        newPiece = new Knight(tilePieceAlliance, tileCoordinate, tilePieceHasMoved);
                        break;
                    case "B":
                        newPiece = new Bishop(tilePieceAlliance, tileCoordinate, tilePieceHasMoved);
                        break;
                    case "Q":
                        newPiece = new Queen(tilePieceAlliance, tileCoordinate, tilePieceHasMoved);
                        break;
                    case "K":
                        newPiece = new King(tilePieceAlliance, tileCoordinate, tilePieceHasMoved);
                        break;
                    case "P":
                        newPiece = new Pawn(tilePieceAlliance, tileCoordinate, tilePieceHasMoved);
                        break;
                    case "":
                        newPiece = null;
                        break;
                }
                let newTile = new Tile(newPiece, tileCoordinate, this.board, this.playerToMove);
                newTiles.push(newTile);
            }
        }
        return newTiles;
    }
}
export class PawnPromotionMove extends MoveMainClass{

    execute(pieceTypeChosen){

        const pieceType = this.pieceToMove.getPieceType();
        const pieceAlliance = this.pieceToMove.getAlliance();
        const pieceHasMoved = this.pieceToMove.hasMoved();

        let newTiles = []
        const originCoordinate = this.pieceToMove.getPosition();

        for (let tile of this.board) {
            
            const tileCoordinate = tile.getCoordinate();

            if(tileCoordinate == originCoordinate){
                let newTile = new Tile(null, tileCoordinate, this.board, this.playerToMove);    
                newTiles.push(newTile);
            // La diferencia con el StandardMove es que la pieza a ubicarse en el casillero de destino es la elegida, que vino por parámetro.
            } else if(tileCoordinate == this.destinationCoordinate){
                let newPiece = {};
                switch(pieceTypeChosen){
                    case "R":
                        newPiece = new Rook(pieceAlliance, this.destinationCoordinate, pieceHasMoved);
                        break;
                    case "N":
                        newPiece = new Knight(pieceAlliance, this.destinationCoordinate, pieceHasMoved);
                        break;
                    case "B":
                        newPiece = new Bishop(pieceAlliance, this.destinationCoordinate, pieceHasMoved);
                        break;
                    case "Q":
                        newPiece = new Queen(pieceAlliance, this.destinationCoordinate, pieceHasMoved);
                        break;
                    case "K":
                        newPiece = new King(pieceAlliance, this.destinationCoordinate, pieceHasMoved);
                        break;
                }
                newPiece.alreadyMovedPiece();
                let newTile = new Tile(newPiece, tileCoordinate, this.board, this.playerToMove);
                newTiles.push(newTile);
            } else {
                const tilePiece = tile.getPiece();
                let tilePiecePieceType = "";
                let tilePieceAlliance = "";
                let tilePieceHasMoved = "";
                if(tilePiece != null){
                    tilePiecePieceType = tilePiece.getPieceType();
                    tilePieceAlliance = tilePiece.getAlliance();
                    tilePieceHasMoved = tilePiece.hasMoved();
                }
                let newPiece = {};
                switch(tilePiecePieceType){
                    case "R":
                        newPiece = new Rook(tilePieceAlliance, tileCoordinate, tilePieceHasMoved);
                        break;
                    case "N":
                        newPiece = new Knight(tilePieceAlliance, tileCoordinate, tilePieceHasMoved);
                        break;
                    case "B":
                        newPiece = new Bishop(tilePieceAlliance, tileCoordinate, tilePieceHasMoved);
                        break;
                    case "Q":
                        newPiece = new Queen(tilePieceAlliance, tileCoordinate, tilePieceHasMoved);
                        break;
                    case "K":
                        newPiece = new King(tilePieceAlliance, tileCoordinate, tilePieceHasMoved);
                        break;
                    case "P":
                        newPiece = new Pawn(tilePieceAlliance, tileCoordinate, tilePieceHasMoved);
                        break;
                    case "":
                        newPiece = null;
                        break;
                }
                let newTile = new Tile(newPiece, tileCoordinate, this.board, this.playerToMove);
                newTiles.push(newTile);
            }
        }
        return newTiles;
    }
}