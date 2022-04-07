import { Tile } from "../classes/board/Tile";
import { Bishop } from "../classes/pieces/Bishop";
import { King } from "../classes/pieces/King";
import { Knight } from "../classes/pieces/Knight";
import { Pawn } from "../classes/pieces/Pawn";
import { Queen } from "../classes/pieces/Queen";
import { Rook } from "../classes/pieces/Rook";

const setRook = () => {
    let mapOfTiles = new Map();
    for(let i = 0; i<64; i++){
        mapOfTiles.set(i, new Tile(new Rook("black", i, false), i));
    }
    return mapOfTiles;
}
const setKnight = () => {
    let mapOfTiles = new Map();
    for(let i = 0; i<64; i++){
        mapOfTiles.set(i, new Tile(new Knight("black", i, false), i));
    }
    return mapOfTiles;
}
const setKing = () => {
    let mapOfTiles = new Map();
    for(let i = 0; i<64; i++){
        mapOfTiles.set(i, new Tile(new King("black", i, false), i));
    }
    return mapOfTiles;
}
const setQueen = () => {
    let mapOfTiles = new Map();
    for(let i = 0; i<64; i++){
        mapOfTiles.set(i, new Tile(new Queen("black", i, false), i));
    }
    return mapOfTiles;
}
const setBishop = () => {
    let mapOfTiles = new Map();
    for(let i = 0; i<64; i++){
        mapOfTiles.set(i, new Tile(new Bishop("black", i, false), i));
    }
    return mapOfTiles;
}
const setPawn = () => {
    let mapOfTiles = new Map();
    for(let i = 0; i<64; i++){
        mapOfTiles.set(i, new Tile(new Pawn("black", i, false), i));
    }
    return mapOfTiles;
}

export const blackRooksTiles = setRook();
export const blackKnightTiles = setKnight();
export const blackKingTiles = setKing();
export const blackQueenTiles = setQueen();
export const blackBishopTiles = setBishop();
export const blackPawnTiles= setPawn();