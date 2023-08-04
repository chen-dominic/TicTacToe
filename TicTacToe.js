function markBox(boxID){

    if(document.getElementById('game-state').className === 'game-state over'){
        console.log('game is over');
        return;
    }

    if(document.getElementById(boxID).classList.contains('unavailable')){
        return;
    }
    let element = document.body;
    element.classList.toggle('blue');
    var innerText = "";
    if(document.body.classList.contains('blue')){
        innerText = 'O';
        document.getElementById(boxID).style.color = '#c48181';
        document.getElementsByClassName('game-state')[0].innerText = "Blue's Turn";
    }
    else{
        innerText = 'X';
        document.getElementById(boxID).style.color = '#6f6ca0';
        document.getElementsByClassName('game-state')[0].innerText = "Red's Turn";
    }
    document.getElementById(boxID).innerText = innerText;
    document.getElementById(boxID).classList.add('unavailable');

    checkWin();
    checkTie();
}

// all combos of winning:
//     0-0 0-1 0-2
//     1-0 1-1 1-2
//     2-0 2-1 2-2

    // 0-0 1-0 2-0
    // 0-1 1-1 2-1
    // 0-2 1-2 2-2

//     0-0 1-1 2-2
//     0-2 1-1 2-0

function checkWin(){
    var redWin = false;
    var blueWin = false;
    var counter = 0;

    // Check rows
    for(let r = 0; r < 3; r++){
        counter = 1;
        var letter = document.getElementById(r +'-0').innerText;
        for (let c = 1; c < 3; c++) {
            var curLetter = document.getElementById(r + '-' + c).innerText;
            if (letter !== curLetter || curLetter.length === 0) {
                break;
            } else {
                counter += 1;
            }
        }
        if (counter === 3) {
            if (letter === 'O') {
                redWin = true;
            } else {
                blueWin = true;
            }
        }
    }

    // Check columns
    for (let c = 0; c < 3; c++) {
        var letter = document.getElementById('0-' + c).innerText;
        var counter = 1;
        for (let r = 1; r < 3; r++) {
            var curLetter = document.getElementById(r + '-' + c).innerText;
            if (letter !== curLetter || curLetter.length === 0) {
                break;
            } else {
                counter += 1;
            }
        }
        if (counter === 3) {
            if (letter === 'O') {
                redWin = true;
            } else {
                blueWin = true;
            }
        }
    }

    // Diagonal 1
    var letter = document.getElementById('0-0').innerText;
    if(document.getElementById('0-0').innerText === document.getElementById('1-1').innerText && document.getElementById('0-0').innerText === document.getElementById('2-2').innerText && letter.length !== 0){
        if(letter === 'O'){
            redWin = true;
        }
        else{
            blueWin = true;
        }
    }

    // Diagonal 2
    var letter = document.getElementById('0-2').innerText;
    if(document.getElementById('0-2').innerText === document.getElementById('1-1').innerText && document.getElementById('0-2').innerText === document.getElementById('2-0').innerText && letter.length !== 0){
        if(letter === 'O'){
            redWin = true;
        }
        else{
            blueWin = true;
        }
    }

    if(redWin || blueWin){
        if(redWin){
            document.getElementsByClassName('game-state')[0].innerText = "Red Wins!";
        }
        else if(blueWin){
            document.getElementsByClassName('game-state')[0].innerText = "Blue Wins!";
        }
        document.getElementById('game-state').style.animation = "flash 0.5s infinite linear";
        document.body.style.animation = "bg-flash 1s infinite linear";
        document.getElementById('game-state').className = "game-state over";
        let element = document.body;
        element.classList.toggle('blue');
        document.getElementsByClassName("reset-btn").style.animation = "breathe 1s infinite linear";
    }


}

function checkTie(){
    for(let r = 0; r < 3; r++){
        for(let c = 0; c < 3; c++){
            if(document.getElementById(r + "-" + c).innerText.length === 0){
                return;
            }
        }
    }

    if(document.getElementById('game-state').className === 'game-state over'){
        return;
    }

    document.getElementsByClassName('game-state')[0].innerText = "It's a draw!";
    document.body.style.backgroundColor = "beige";
    document.getElementsByClassName("reset-btn").style.animation = "breathe 1s infinite linear";
}

function resetGame(){
    document.getElementById('game-state').className = "game-state";
    for(let r = 0; r < 3; r++){
        for(let c = 0; c < 3; c++){
            document.getElementById(r + "-" + c).innerText = "";
            document.getElementById(r + "-" + c).className = "button";
        }
    }
    if(document.body.className.includes('blue')){
        document.body.classList.toggle('blue');
    }
    document.getElementById('game-state').style.animation = "none";
    document.body.style.animation = "none";
    document.getElementById('game-state').innerText = "Red's Turn";
    document.body.classList[2] = "";
    document.getElementsByClassName("reset-btn").style.animation = "none";
    document.body.style.backgroundColor = "var(--bg-color)";
}