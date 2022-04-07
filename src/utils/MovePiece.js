import { isEighthRow } from "./ColumnsAndRows";
import { CastlingMove } from "../classes/moves/CastlingMove";
import { EnPassantMove } from "../classes/moves/EnPassantMove";
import { PawnJumpMove } from "../classes/moves/PawnJumpMove";
import { PawnPromotionMove } from "../classes/moves/PawnPromotion.Move";
import { StandardMove } from "../classes/moves/StandardMove";


export function movePiece(origin, destination, board, playerToMove) {

    const pieceToMove = origin.getPiece();
    const pieceType = pieceToMove.getPieceType();
    const piecePosition = pieceToMove.getPosition();
    const allianceToMove = pieceToMove.getAlliance();
    const destinationCoordinate = destination.getCoordinate();


    // Castling. Si el rey no se movió, y tiene como coordenada posible las de enroque, es porque la torre tampoco se movió!
    if (pieceType == "K" && !pieceToMove.hasMoved() &&
        ((allianceToMove == "white" && (destinationCoordinate == 62 || destinationCoordinate == 58)) ||
        (allianceToMove == "black" && (destinationCoordinate == 2 || destinationCoordinate == 6)))) {
            
        return new CastlingMove(pieceToMove, destinationCoordinate, board, playerToMove).execute();
    }

    if (pieceType == "P") {

        // Pawn Jump
        if ((destinationCoordinate == piecePosition + 16 || destinationCoordinate == piecePosition - 16)) {
            return new PawnJumpMove(pieceToMove, destinationCoordinate, board, playerToMove).execute();
        }
        // En Passant
        if (!board[destinationCoordinate].isOccupied()) {
            //Le paso por parámetro al "execute()", la pieza a ser tomada, según color.
            let pieceToTakeEnPassant={};
            if (allianceToMove == "white"){
                pieceToTakeEnPassant = board[destinationCoordinate + 8].getPiece();
            } else if(allianceToMove == "black"){
                pieceToTakeEnPassant = board[destinationCoordinate - 8].getPiece();
            }
            if(pieceToTakeEnPassant?.hasPawnJump()){
                return new EnPassantMove(pieceToMove, destinationCoordinate, board, playerToMove).execute(pieceToTakeEnPassant);
            }
        }
        // Pawn Promotion
        if(isEighthRow(allianceToMove, destinationCoordinate)){

            let pieceTypeChosen = "";
            pieceTypeChosen = prompt("Please, choose your promotion PieceType:\nQ for Queen\nN for Knight\nB for Bishop\nR for Rook", "Do not cancel!");
            /*do{
                
            }while(pieceTypeChosen != "Q" || pieceTypeChosen != "N" || pieceTypeChosen != "B" || pieceTypeChosen != "R");*/

            return new PawnPromotionMove(pieceToMove,destinationCoordinate, board, playerToMove).execute(pieceTypeChosen); 
        }
    }

    //StandarMove
    return new StandardMove(pieceToMove, destinationCoordinate, board, playerToMove).execute();
}