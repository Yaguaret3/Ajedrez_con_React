export function isFirstColumn(position){

    const firstColumn = [0,8,16,24,32,40,48,56];
    let answer = false;

    for(const firstColumnCoordinate of firstColumn){
        if(position == firstColumnCoordinate){
            answer = true;
        }
    }
    return answer;
}
export function isSecondColumn(position){

    const secondColumn = [1,9,17,25,33,41,49,57];
    let answer = false;

    for(const secondColumnCoordinate of secondColumn){
        if(position == secondColumnCoordinate){
            answer = true;
        }
    }
    return answer;
}
export function isThirdColumn(position){

    const thirdColumn = [2,10,18,26,34,42,50,58];
    let answer = false;

    for(const thirdColumnCoordinate of thirdColumn){
        if(position == thirdColumnCoordinate){
            answer = true;
        }
    }
    return answer;
}
export function isFourthColumn(position){

    const fourthColumn = [3,11,19,27,35,43,51,59];
    let answer = false;

    for(const fourthColumnCoordinate of fourthColumn){
        if(position == fourthColumnCoordinate){
            answer = true;
        }
    }
    return answer;
}
export function isFifthColumn(position){

    const fifthColumn = [4,12,20,28,36,44,52,60];
    let answer = false;

    for(const fifthColumnCoordinate of fifthColumn){
        if(position == fifthColumnCoordinate){
            answer = true;
        }
    }
    return answer;
}
export function isSixthColumn(position){

    const sixthColumn = [5,13,21,29,37,45,53,61];
    let answer = false;

    for(const sixthColumnCoordinate of sixthColumn){
        if(position == sixthColumnCoordinate){
            answer = true;
        }
    }
    return answer;
}
export function isSeventhColumn(position){

    const seventhColumn = [6,14,22,30,38,46,54,62];
    let answer = false;

    for(const seventhColumnCoordinate of seventhColumn){
        if(position == seventhColumnCoordinate){
            answer = true;
        }
    }
    return answer;
}
export function isEighthColumn(position){

    const eighthColumn = [7,15,23,31,39,47,55,63];
    let answer = false;

    for(const eighthColumnCoordinate of eighthColumn){
        if(position == eighthColumnCoordinate){
            answer = true;
        }
    }
    return answer;
}
export function isFifthRow(alliance, position){
    let answer = false;
    let fifthRow = [];
    if(alliance == "white"){
        fifthRow = [24,25,26,27,28,29,30,31] 
    } else if(alliance == "black"){
        fifthRow = [32,33,34,35,36,37,38,39] 
    }
    for(const fifthRowCoordinate of fifthRow){
        if(position == fifthRowCoordinate){
            answer = true;
        }
    }
    return answer;
}
export function isEighthRow(alliance, position){
    let answer = false;
    let eighthRow = [];
    if(alliance == "white"){
        eighthRow = [0,1,2,3,4,5,6,7] 
    } else if(alliance == "black"){
        eighthRow = [56,57,58,59,60,61,62,63] 
    }
    for(const eighthRowCoordinate of eighthRow){
        if(position == eighthRowCoordinate){
            answer = true;
        }
    }
    return answer;
}