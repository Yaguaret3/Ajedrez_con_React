import { Tile } from "../classes/board/Tile";

function setEmptyTiles() {
    let mapOfTiles = new Map();
    for(let i = 0; i<64; i++){
        mapOfTiles.set(i, new Tile(null, i));
    }
    return mapOfTiles;
}

export const EmptyTiles  = setEmptyTiles();