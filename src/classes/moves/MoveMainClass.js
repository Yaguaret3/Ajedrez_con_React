export class MoveMainClass{
    constructor(pieceToMove, destinationCoordinate, board, playerToMove){
        this.pieceToMove = pieceToMove;
        this.destinationCoordinate = destinationCoordinate;
        this.board = board;
        this.playerToMove = playerToMove;
    }
}