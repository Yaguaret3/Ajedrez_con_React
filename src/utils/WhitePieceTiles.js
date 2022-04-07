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
        mapOfTiles.set(i, new Tile(new Rook("white", i, false), i));
    }
    return mapOfTiles;
}
const setKnight = () => {
    let mapOfTiles = new Map();
    for(let i = 0; i<64; i++){
        mapOfTiles.set(i, new Tile(new Knight("white", i, false), i));
    }
    return mapOfTiles;
}
const setKing = () => {
    let mapOfTiles = new Map();
    for(let i = 0; i<64; i++){
        mapOfTiles.set(i, new Tile(new King("white", i, false), i));
    }
    return mapOfTiles;
}
const setQueen = () => {
    let mapOfTiles = new Map();
    for(let i = 0; i<64; i++){
        mapOfTiles.set(i, new Tile(new Queen("white", i, false), i));
    }
    return mapOfTiles;
}
const setBishop = () => {
    let mapOfTiles = new Map();
    for(let i = 0; i<64; i++){
        mapOfTiles.set(i, new Tile(new Bishop("white", i, false), i));
    }
    return mapOfTiles;
}
const setPawn = () => {
    let mapOfTiles = new Map();
    for(let i = 0; i<64; i++){
        mapOfTiles.set(i, new Tile(new Pawn("white", i, false), i));
    }
    return mapOfTiles;
}
export const WhiteRooksTiles = setRook();
export const WhiteKnightTiles = setKnight();
export const WhiteKingTiles = setKing();
export const WhiteQueenTiles = setQueen();
export const WhiteBishopTiles = setBishop();
export const WhitePawnTiles= setPawn();