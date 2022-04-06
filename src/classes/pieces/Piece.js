export default class Piece {
    constructor(alliance, position, moved) {
        this.alliance = alliance;
        this.position = position;
        this.moved = moved;
        this.pawnJump = false;
    }

    getAlliance() {
        return this.alliance;
    }

    getPosition() {
        return this.position;
    }

    setPosition(position){
        this.position = position;
    }
    hasMoved(){
        return this.moved;
    }
    alreadyMovedPiece(){
        this.moved = true;
    }
    hasPawnJump(){
        return this.pawnJump;
    }
}