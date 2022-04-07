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

    let imgUrl = "";
    if(props.tile.getPiece() != null){
        imgUrl = props.tile.getPiece().getAlliance()+"Pieces/"+props.tile.getPiece().getPieceType()+".png";
    }

    return (
        <div className={finalClass} onClick= {() => props.selectTile(props.tile)}>

            <img src={imgUrl}/>

        </div>
    );


}