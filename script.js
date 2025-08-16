let worldyAttachment = 0;

let beginGame = false; 
let startTime = null;
//test comment
const clock = document.getElementById("clockText");
const attachmentTracker = document.getElementById("attachmentTracker");
let lastDay = null;

const doNothing = document.getElementById("doNothing");

const clickBuildCount = document.getElementById("clickOwned");
const baseClickPrice = document.getElementById("clickPrice");
const baseClickUp = document.getElementById("baseClickUp");
const clickTip = document.getElementById("baseClickTip");
const clickToolTip = document.getElementById("baseToolTip");

const lessBuildCount = document.getElementById("lessOwned");
const lessPrice = document.getElementById("lessPrice");
const lessIsMore = document.getElementById("lessIs");
const lessTip = document.getElementById("lessTip");
const lessToolTip = document.getElementById("lessToolTip");

const sIncPrice = document.getElementById("sIncPrice");
const sIncOwned = document.getElementById("sIncOwned");
const smallInc = document.getElementById("smallInc");
const smallTip = document.getElementById("smallTip");
const smallToolTip = document.getElementById("smallToolTip");

let base_per_click = -1;
const baseClick = document.getElementById("baseClick");
baseClick.innerText = base_per_click;

let click_mult = 0;
clickMult = document.getElementById("clickMult");
clickMult.innerText = click_mult + " percent";

let gainPer = base_per_click + (base_per_click * click_mult);
gainPerClick = document.getElementById("gainPer");
gainPerClick.innerText = gainPer;

let sIncCount = 0;
let lIncCount = 0;
let sIncCurrPrice = Math.ceil(50 * Math.pow(1.11, sIncCount));
sIncPrice.innerText = sIncCurrPrice;
sIncOwned.innerText = "Owned = 0";
let burnPer = sIncCount + lIncCount;
burnPerDay = document.getElementById("burnPer");
burnPerDay.innerText = burnPer;

lessOwned = 0;
lessBuildCount.innerText = "Times Performed = " + lessOwned;
let lessCurrPrice = Math.ceil(10 * Math.pow(1.09, lessOwned));
lessPrice.innerText = lessCurrPrice;

let clickUpOwned = 0;
let clickUpPrice = Math.ceil(250 * Math.pow(1.15, clickUpOwned));
baseClickPrice.innerText = clickUpPrice;
clickBuildCount.innerText = "Times Performed = " + clickUpOwned;

let musicStarted = false;

doNothing.addEventListener("click", () => {
    worldyAttachment += base_per_click + (base_per_click * click_mult);
    updateVariables();
    if (beginGame == false) {
        beginGame = true;
        startTime = Date.now();
        setInterval(updateClock, 1000);
        updateClock();
    }

    //start the music
    if (!musicStarted) {
        const bgm = document.getElementById("bgm");
        bgm.play();
        musicStarted = true;
    }



});

lessIsMore.addEventListener("click", () => {
    if (Math.abs(worldyAttachment) >= lessCurrPrice) {
        worldyAttachment += lessCurrPrice;
        click_mult += 0.05;
        lessOwned += 1;
        lessCurrPrice = Math.ceil(10 * Math.pow(1.09, lessOwned));
        updateVariables()
    } 
});

lessTip.addEventListener("click", () => {
    if (lessToolTip.style.display == "none") {
        lessToolTip.style.display = "block";
    }
    else {
        lessToolTip.style.display = "none";
    }
});

smallInc.addEventListener("click", () => {
    if (Math.abs(worldyAttachment) >= sIncCurrPrice) {
        worldyAttachment += sIncCurrPrice;
        sIncCount += 1;
        sIncCurrPrice = Math.ceil(50 * Math.pow(1.11, sIncCount));
        updateVariables();
    }
});

smallTip.addEventListener("click", () => {
    if (smallToolTip.style.display == "none") {
        smallToolTip.style.display = "block";
    }
    else {
        smallToolTip.style.display = "none";
    }
});

baseClickUp.addEventListener("click", () => {
    if (Math.abs(worldyAttachment) >= clickUpPrice) {
        worldyAttachment += clickUpPrice;
        clickUpOwned += 1;
        clickUpPrice = Math.ceil(250 * Math.pow(1.15, clickUpOwned));
        updateVariables();
    }
});

clickTip.addEventListener("click", () => {
     if (clickToolTip.style.display == "none") {
        clickToolTip.style.display = "block";
    }
    else {
        clickToolTip.style.display = "none";
    }
});

function updateClock() {
    const secondsElapsed = Math.floor((Date.now() - startTime) / 1000);
    const days = Math.floor(secondsElapsed / 2);
    clock.innerText =
        `Days since: ${days}`;

    if (days != lastDay) {
        lastDay = days;
        newDay();
    }
}

function updateVariables() {
    clickMult.innerText = (click_mult * 100).toFixed(0) + " percent";
    base_per_click = -1 * (1 + clickUpOwned);
    baseClick.innerText = base_per_click;
    attachmentTracker.innerText = worldyAttachment.toFixed(2);
    gainPer = base_per_click + (base_per_click * click_mult);
    gainPerClick.innerText = gainPer.toFixed(2);
    burnPer = sIncCount + lIncCount;
    burnPerDay.innerText = burnPer;
    lessPrice.innerText = lessCurrPrice;
    lessBuildCount.innerText = "Times Performed = " + lessOwned;
    sIncPrice.innerText = sIncCurrPrice;
    sIncOwned.innerText = "Owned = " + sIncCount;
    baseClickPrice.innerText = clickUpPrice;
    clickBuildCount.innerText = "Times Performed = " + clickUpOwned;


    //Reveal new mechanics once a certain threshold has been met.
    if (worldyAttachment <= -10) {
        lessPrice.style.display = "inline-block";
        lessIsMore.style.display = "inline-block";
        lessTip.style.display = "inline-block";
    }

    if (worldyAttachment <= -50) {
        sIncPrice.style.display = "inline-block";
        smallInc.style.display = "inline-block";
        smallTip.style.display = "inline-block";
    }

    if (worldyAttachment <= -250) {
        baseClickPrice.style.display = "inline-block";
        baseClickUp.style.display = "inline-block";
        clickTip.style.display = "inline-block";
    }

    
    // Change the color of associated price buttons to indicate purchase availabilty.
    if (Math.abs(worldyAttachment) >= lessCurrPrice) {
        lessPrice.style.backgroundColor = "green";
    }
    else {
        lessPrice.style.backgroundColor = "red";
    }

    if (Math.abs(worldyAttachment) >= sIncCurrPrice) {
        sIncPrice.style.backgroundColor = "green";
    }
    else {
        sIncPrice.style.backgroundColor = "red";
    }

    if (Math.abs(worldyAttachment) >= clickUpPrice) {
        baseClickPrice.style.backgroundColor = "green";
    }
    else {
        baseClickPrice.style.backgroundColor = "red";
    }





}

//Function is called on every new day. A new day is called every 10 seconds.
function newDay () {
    worldyAttachment += -(burnPer);
    updateVariables();
}








