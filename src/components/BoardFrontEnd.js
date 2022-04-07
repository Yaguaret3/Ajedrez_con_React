import { useEffect, useState } from "react";
import { Tile } from "../classes/board/Tile";
import { TileFrontEnd } from "./TileFrontEnd";
import { Player } from "../classes/Player";
import { movePiece } from "../utils/MovePiece";
import { EmptyTiles } from "../utils/EmptyTiles";
import { blackBishopTiles, blackKingTiles, blackKnightTiles, blackPawnTiles, blackQueenTiles, blackRooksTiles } from "../utils/BlackPieceTiles";
import { WhiteBishopTiles, WhiteKingTiles, WhiteKnightTiles, WhitePawnTiles, WhiteQueenTiles, WhiteRooksTiles } from "../utils/WhitePieceTiles";

export default function BoardFrontEnd() {

    const whitePlayer = new Player("white");
    const blackPlayer = new Player("black");

    const [tiles, setTiles] = useState([]);
    const [legalMoves, setLegalMoves] = useState([]);
    const [previousTileSelected, setPreviousTileSelected] = useState();
    const [playerToMove, setPlayerToMove] = useState(whitePlayer);
    const [playerToWait, setPlayerToWait] = useState(blackPlayer);
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

        setPlayerToMove(whitePlayer);
        setPlayerToWait(blackPlayer);

        let newBoard = [];
        for(let i = 0; i<64; i++){
            
            if (i == 0 || i == 7) {
                newBoard.push(blackRooksTiles.get(i));
            } else if (i == 1 || i == 6) {
                newBoard.push(blackKnightTiles.get(i));
            } else if (i == 2 || i == 5) {
                newBoard.push(blackBishopTiles.get(i));
            } else if (i == 3) {
                newBoard.push(blackQueenTiles.get(i));
            } else if (i == 4) {
                newBoard.push(blackKingTiles.get(i));
            } else if (i > 7 && i < 16) {
                newBoard.push(blackPawnTiles.get(i));
            } else if (i == 63 || i == 56) {
                newBoard.push(WhiteRooksTiles.get(i));
            } else if (i == 62 || i == 57) {
                newBoard.push(WhiteKnightTiles.get(i));
            } else if (i == 61 || i == 58) {
                newBoard.push(WhiteBishopTiles.get(i));
            } else if (i == 60) {
                newBoard.push(WhiteKingTiles.get(i));
            } else if (i == 59) {
                newBoard.push(WhiteQueenTiles.get(i));
            } else if (i < 56 && i > 47) {
                newBoard.push(WhitePawnTiles.get(i));
            } else {
                newBoard.push(EmptyTiles.get(i));
            }
        }

        setTiles(newBoard);
    }

    const selectTile = (tile) => {

        if (legalMoves.length == 0 && tile.getPiece() != null) {
            setTileWithLegalMoves(tile);
            setLegalMoves(tile.getPiece().legalMoves(tiles, playerToMove));
        } else {
            let matches = false;
            for (let legalMove of legalMoves) {
                if (legalMove == tile.getCoordinate()) {
                    matches = true;
                    break;
                }
            }
            if (matches == true) {
                const newBoard = movePiece(previousTileSelected, tile, tiles, playerToMove);
                setTiles(newBoard);
                const temp = playerToMove;
                setPlayerToMove(playerToWait);
                setPlayerToWait(temp);
            }
            setTileWithLegalMoves(new Tile(null, -1, playerToMove));
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
                    let newTile = new Tile(getTile(legalMoveTile, newTiles).getPiece(), legalMoveTile, playerToMove)
                    newTile.setLegalMove(true);
                    newTiles[legalMoveTile] = newTile;
                }
            }

        } else {
            for (let tile of tiles) {
                let newTile = new Tile(tile.getPiece(), tile.getCoordinate(), playerToMove)
                newTiles.push(newTile);
            }

        }
        setTiles(newTiles);
    }

    return (
        <div className="wrapper">
            <button onClick={() => setInitialBoard()}>
                Empezar partida
            </button>
            <div className="board">
                {tiles.map(tile => {
                    if (tile.getCoordinate() % 8 == 0) {
                        return <><br /><TileFrontEnd tile={tile} selectTile={selectTile} tileWithLegalMoves={tileWithLegalMoves} /></>

                    } else {
                        return <TileFrontEnd tile={tile} selectTile={selectTile} tileWithLegalMoves={tileWithLegalMoves} />
                    }

                })}
            </div>
        </div>
    );

}