let gameseq = [];
let userseq = [];
let btns =["pink","skyblue","orange","green"];

let started = false;
let canClick = false;
let level = 0;
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (!started) {
        started = true;
        levelup();
    }
});

function flashButton(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function animatePress(btn) {
    btn.classList.add("pressed");
    setTimeout(function () {
        btn.classList.remove("pressed");
    }, 120);
}

function playSequence() {
    canClick = false;
    h2.innerText = `Level ${level} — Watch the sequence`;

    gameseq.forEach((color, index) => {
        setTimeout(() => {
            const btn = document.querySelector(`.${color}`);
            flashButton(btn);
        }, index * 600);
    });

    setTimeout(() => {
        canClick = true;
        h2.innerText = `Level ${level}`;
    }, gameseq.length * 600);
}

function levelup() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randomidx = Math.floor(Math.random() * 4);
    let randomcolor = btns[randomidx];
    gameseq.push(randomcolor);
    playSequence();
}


//check function

function checkans (idx){
    console.log("current level : ", level);
    let idx = level-1;
    if(userseq.length == gameseq.length){
        setTimeout(levelup, 1000);
    }
    if(userseq[idx] !== gameseq[idx]){
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 1000);
        reset();
        return;
    }

}



function btnpress() {
    if (!canClick) {
        return;
    }

    let btn = this;
    animatePress(btn);

    let usercolor = btn.getAttribute("id");
    userseq.push(usercolor);
    checkans();
}
let allbtns = document.querySelectorAll(".btn");
for(let btn of allbtns) {
    btn.addEventListener("click", btnpress);
}

function reset(){
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}