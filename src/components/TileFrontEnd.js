export function TileFrontEnd(props){

    let finalClass = "";
    if(props.tile.getLegalMove() == false){
        finalClass = finalClass+"tile";
    } else {
        finalClass = finalClass+"tile-optional-move";
    }

    if(props.tileWithLegalMoves?.getCoordinate() == props.tile.getCoordinate()){
        finalClass = finalClass + " tile-to-move";
    }

    if(props.tile.getPiece()?.getAlliance() == "white"){
        finalClass = finalClass + " white-piece";
    } else if(props.tile.getPiece()?.getAlliance() == "black"){
        finalClass = finalClass + " black-piece";
    }



    return (
        <span className={finalClass} onClick= {() => props.selectTile(props.tile)}>
            {props.tile.piece == null ? "-" : props.tile.piece.getPieceType()}
        </span>
    );


}