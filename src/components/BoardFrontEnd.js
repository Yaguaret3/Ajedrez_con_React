import { useEffect, useState } from "react";
import { Bishop } from "../classes/pieces/Bishop";
import { King } from "../classes/pieces/King";
import { Knight } from "../classes/pieces/Knight";
import { Pawn } from "../classes/pieces/Pawn";
import { Queen } from "../classes/pieces/Queen";
import { Rook } from "../classes/pieces/Rook";
import { Tile } from "../classes/board/Tile";
import { TileFrontEnd } from "./TileFrontEnd";
import { movePiece } from "../classes/moves/MovePiece";
import { Player } from "../classes/Player";

export default function BoardFrontEnd() {

    const [tiles, setTiles] = useState([]);
    const [legalMoves, setLegalMoves] = useState([]);
    const [previousTileSelected, setPreviousTileSelected] = useState();
    const [playerToMove, setPlayerToMove] = useState(new Player("white",tiles));
    const [tileWithLegalMoves, setTileWithLegalMoves] = useState(new Tile(null, -1, tiles, playerToMove));

    useEffect(() => {
        showLegalMoves();
    }, [legalMoves]);

    const getTile = (coordinate, board) => {
        for (let tile of board) {
            if (tile.getCoordinate() == coordinate) {
                return tile;
            }
        }
    }

    const setInitialBoard = () => {

        let newArrayTiles = [];

        for (let i = 0; i < 64; i++) {

            let newTile = new Tile(null, i, tiles, playerToMove);
            newArrayTiles.push(newTile);
        }

        for (let tile of newArrayTiles) {

            let tileCoordinate = tile.getCoordinate();

            if (tileCoordinate == 0 || tileCoordinate == 7) {
                tile.setPiece(new Rook("black", tileCoordinate, false));
            }
            if (tile.getCoordinate() == 1 || tileCoordinate == 6) {
                tile.setPiece(new Knight("black", tileCoordinate, false));
            }
            if (tileCoordinate == 2 || tileCoordinate == 5) {
                tile.setPiece(new Bishop("black", tileCoordinate, false));
            }
            if (tileCoordinate == 3) {
                tile.setPiece(new Queen("black", tileCoordinate, false));
            }
            if (tileCoordinate == 4) {
                tile.setPiece(new King("black", tileCoordinate, false));
            }
            if (tileCoordinate > 7 && tileCoordinate < 16) {
                tile.setPiece(new Pawn("black", tileCoordinate, false));
            }
            if (tileCoordinate == 63 || tileCoordinate == 56) {
                tile.setPiece(new Rook("white", tileCoordinate, false));
            }
            if (tileCoordinate == 62 || tileCoordinate == 57) {
                tile.setPiece(new Knight("white", tileCoordinate, false));
            }
            if (tileCoordinate == 61 || tileCoordinate == 58) {
                tile.setPiece(new Bishop("white", tileCoordinate, false));
            }
            if (tileCoordinate == 60) {
                tile.setPiece(new King("white", tileCoordinate, false));
            }
            if (tileCoordinate == 59) {
                tile.setPiece(new Queen("white", tileCoordinate, false));
            }
            if (tileCoordinate < 56 && tileCoordinate > 47) {
                tile.setPiece(new Pawn("white", tileCoordinate, false));
            }
        }

        setTiles(newArrayTiles);

    }

    const selectTile = (tile) => {

        if (legalMoves.length == 0 && tile.getPiece() != null) {
            setTileWithLegalMoves(tile);
            setLegalMoves(tile.getPiece().legalMoves(tiles, playerToMove));
        } else {
            let matches = false;
            for(let legalMove of legalMoves){
                if(legalMove == tile.getCoordinate()){
                    matches = true;
                    break;
                }
            }
            if(matches == true){
                const newBoard = movePiece(previousTileSelected, tile, tiles, playerToMove);
                setTiles(newBoard);
            }
            setTileWithLegalMoves(new Tile(null, -1, tiles, playerToMove));
            setLegalMoves([]);
        }
        setPreviousTileSelected(tile);
    }
    const showLegalMoves = () => {
        
        let newTiles = [];
        if (legalMoves.length != 0) {
            for (let tile of tiles) {
                newTiles.push(tile);
            }
            for (let legalMoveTile of legalMoves) {

                if (getTile(legalMoveTile, newTiles)) {
                    let newTile = new Tile(getTile(legalMoveTile, newTiles).getPiece(), legalMoveTile, tiles, playerToMove)
                    newTile.setLegalMove(true);
                    newTiles[legalMoveTile] = newTile;
                }
            }
            
        } else {
            for (let tile of tiles) {
                let newTile = new Tile(tile.getPiece(), tile.getCoordinate(), tiles, playerToMove)
                    newTiles.push(newTile);
            }

        }
        setTiles(newTiles);
    }

    return (
        <>
            <button onClick={() => setInitialBoard()}>
                Empezar partida
            </button>
            <div className="board">
                {tiles.map(tile => {
                    if (tile.getCoordinate() % 8 == 0) {
                        return <><div></div><TileFrontEnd tile={tile} selectTile={selectTile} tileWithLegalMoves={tileWithLegalMoves}/></>

                    } else {
                        return <TileFrontEnd tile={tile} selectTile={selectTile} tileWithLegalMoves={tileWithLegalMoves}/>
                    }

                })}
            </div>
        </>
    );

}