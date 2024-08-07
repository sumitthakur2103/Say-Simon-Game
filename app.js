let gameSeq = [];
let userSeq = [];
let highScore = [];

let started = false;
let level = 0;

let btns = ["red", "green", "blue", "yellow"];
let h2 = document.querySelector("h3");

let allBtns = document.querySelectorAll(".btn")

let startBtn = document.querySelector("#start");
let restartBtn = document.querySelector("#restart");
let bigbox = document.querySelector(".bigbox");

let leaderboard = document.querySelector(".leaderboard");
let input = document.querySelector("input");

let inputinfo = document.querySelector(".inputinfo");

let inputbox = document.querySelector("input");
let errorpara = document.querySelector(".error");
let NAME = document.querySelector("#name");
let SCORE = document.querySelector("#score");
let gameovervideo = document.querySelector(".gameovervideo");
gameovervideo.autoplay = "true";
//buttton for storing name in object array
let gamebtn = document.querySelector(".inputinfo button");
gameovervideo.classList.add("nonevideo");
bigbox.style.display = "none";
startBtn.style.display = "none";
restartBtn.style.display = "none";
leaderboard.style.display = "none";
errorpara.style.display = "none";

inputinfo.addEventListener("mouseenter", () => {
    inputbox.style.display = "inline-block";
    gamebtn.style.display = "block";
})


inputinfo.addEventListener("mouseleave", () => {
    inputbox.style.display = "none";
    gamebtn.style.display = "none";
})


//what happend when inputinfo clicked
gamebtn.addEventListener("click", () => {
    if (input.value == "") {
        input.style.border = "solid red 2px";
        errorpara.style.display = "block";
    }
    else {
        input.style.border = "2px solid cadetblue";
        errorpara.style.display = "none";
        inputinfo.style.display = "none";
        bigbox.style.display = "flex";
        startBtn.style.display = "block";
        h2.innerText = `If you are ready then click on Start button and play the game`;

    }
}
)



startBtn.addEventListener("click", () => {
    if (started == false) {
        console.log("Game Started");
        started = true;
        startBtn.style.display = "none";
        levelUp();
    }
})



function gameFlash(btn) {
    btn.classList.add("flash");

    setTimeout(function () {
        btn.classList.remove("flash");
    }, 500)
}



function checkAns(idx) {
    if (gameSeq[idx] === userSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    }
    else {
        highScore.push({
            name: input.value,
            score: level
        });

        h2.innerHTML = `Game Over !! , Your score was <b>${level}</b> <br>Press restart button restart the game`;

        reset();

        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "black";
        }, 150)

        allScore();
        gameovervideo.classList.remove("nonevideo");
        setTimeout(() => {
            displayLeaderboard();
            gameovervideo.classList.add("nonevideo");
            leaderboard.style.display = "flex";
            restartBtn.style.display = "block";
        }, 4000)
        bigbox.style.display = "none";
        startBtn.style.display = "none";
    }
}


restartBtn.addEventListener("click", function () {
    leaderboard.style.display = "none";
    restartBtn.style.display = "none";
    inputinfo.style.display = "flex";
    input.value = "";
    h2.innerHTML = "Hey!! This is my first project , If you like it please give me suggestion and rating after the game";
    clear();
})


function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level} `;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}



function userFlash(btn) {
    btn.classList.add("userflash");

    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 500)
}



function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    startBtn.style.display = "block";
}

function allScore() {
    for (let i = 0; i < highScore.length - 1; i++) {
        for (let j = i + 1; j < highScore.length; j++) {
            if (highScore[i].score < highScore[j].score) {
                let temp = highScore[i];
                highScore[i] = highScore[j];
                highScore[j] = temp;
            }
        }
    }
}

function displayLeaderboard() {
    for (let i = 0; i < highScore.length; i++) {
        if (i < 10) {
            if (highScore[i].name == "") {
                NAME.innerHTML += `${i + 1}. `;
                NAME.innerHTML += "Unknown";
                NAME.innerHTML += `<br>`;
                NAME.innerHTML += `<br>`;


                SCORE.innerHTML += highScore[i].score;
                SCORE.innerHTML += "<br>";
                SCORE.innerHTML += "<br>";
            }
            else {
                NAME.innerHTML += `${i + 1}. `;
                NAME.innerHTML += highScore[i].name;
                NAME.innerHTML += `<br>`;
                NAME.innerHTML += `<br>`;

                SCORE.innerHTML += highScore[i].score;
                SCORE.innerHTML += "<br>";
                SCORE.innerHTML += "<br>";
            }
        }

    }

}

function clear() {
    NAME.innerHTML = "";
    SCORE.innerHTML = "";
}