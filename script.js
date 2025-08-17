let worldyAttachment = 0;

let beginGame = false; 
let startTime = null;

const clock = document.getElementById("clockText");
const attachmentTracker = document.getElementById("attachmentTracker");
attachmentTracker.innerText = "Just Fine";
let lastDay = null;

const doNothing = document.getElementById("doNothing");
const doNotCount = document.getElementById("doNotCount");
let do_Not_Count = 0;

/*      Upgrade Initializations     */
const clickReveal = document.querySelectorAll(".clickReveal");
const clickPrice = document.getElementById("clickPrice");
const clickBuy = document.getElementById("clickBuy");
const clickOwned = document.getElementById("clickOwned");
const clickTip = document.getElementById("clickTip");
const clickToolTip = document.getElementById("clickToolTip");

let clickUpOwned = 0;
let clickUpPrice = Math.ceil(250 * Math.pow(1.15, clickUpOwned));
clickOwned.innerText = "Times Performed = " + clickUpOwned;
clickPrice.innerText = clickUpPrice;


const lessReveal = document.querySelectorAll(".lessReveal");
const lessPrice = document.getElementById("lessPrice");
const lessBuy = document.getElementById("lessBuy");
const lessOwned = document.getElementById("lessOwned");
const lessTip = document.getElementById("lessTip");
const lessToolTip = document.getElementById("lessToolTip");

let less_Owned = 0;
let lessCurrPrice = Math.ceil(10 * Math.pow(1.09, less_Owned));
lessOwned.innerText = "Times Performed = " + less_Owned;
lessPrice.innerText = lessCurrPrice;

const sIncReveal = document.querySelectorAll(".sIncReveal");
const sIncPrice = document.getElementById("sIncPrice");
const sIncBuy = document.getElementById("sIncBuy");
const sIncOwned = document.getElementById("sIncOwned");
const sIncTip = document.getElementById("sIncTip");
const sIncToolTip = document.getElementById("sIncToolTip");

let sIncCount = 0;
let lIncCount = 0;
let sIncCurrPrice = Math.ceil(50 * Math.pow(1.35, sIncCount));
sIncPrice.innerText = sIncCurrPrice;
sIncOwned.innerText = "Owned = 0";


const cigReveal = document.querySelectorAll(".cigReveal");
const cigPrice = document.getElementById("cigPrice");
const cigBuy = document.getElementById("cigBuy");
const cigOwned = document.getElementById("cigOwned");
const cigTip = document.getElementById("cigTip");
const cigToolTip = document.getElementById("cigToolTip");

let cig_Smoked = 0;
let cig_Price = Math.ceil(1000 * Math.pow(1.17, cig_Smoked));
cigOwned.innerText = "Cigs Smoked = " + cig_Smoked;
cigPrice.innerText = cig_Price;


const bingeReveal = document.querySelectorAll(".bingeReveal");
const bingeTip = document.getElementById("bingeTip");
const bingeToolTip = document.getElementById("bingeToolTip");


/*      Stat Initializations        */
let base_per_click = -1;
const baseClick = document.getElementById("baseClick");
baseClick.innerText = base_per_click;

let click_mult = 0;
clickMult = document.getElementById("clickMult");
clickMult.innerText = click_mult + " percent";

let gainPer = base_per_click + (base_per_click * click_mult);
gainPerClick = document.getElementById("gainPer");
gainPerClick.innerText = gainPer;

let burnPer = (sIncCount * 10) + (lIncCount * 50);
burnPerDay = document.getElementById("burnPer");
burnPerDay.innerText = burnPer;

let total_Burned = 0;
const totalBurned = document.getElementById("totalBurned");
totalBurned.innerText = total_Burned;
    

/*      Music Handling Set-Up          */         
const playlist = [
    "audio/ambient1.mp3",
    "audio/ambient2.mp3",
    "audio/shattered-glass.mp3",
    "audio/through-the-fog.mp3",
    "audio/shadows-in-the-static.mp3",
    "audio/dark-jazz.mp3",
    "audio/robot-funeral.mp3",
    "audio/paper-heart.mp3",
    "audio/neon-echoes.mp3",
    "audio/starless-skies.mp3",
    "audio/cosmic-joker.mp3"
];

let currentTrack = 0;

const bgm = document.getElementById("bgm");
const bgmsource = document.getElementById("bgm-source");
const volumeSlider = document.getElementById("volumeSlider");
bgm.volume = volumeSlider.value;

/*      Flavor Text Set-Up       */
const flavorTextList = [
    "It's over...",
    "Just ... stop",
    "Could you ever?",
    "Test",
    "sample",
    "another sample"
]
const tickerTrack = document.getElementById("tickerTrack");
let currentTick = -1;

/*      Pre-Game Music Stinger    */
const introStinger = document.getElementById("introStinger");


/*      Game Loop About to Start        */
doNothing.addEventListener("click", (e) => {
    if (beginGame == true) {
        const soulLost = base_per_click + (base_per_click * click_mult);
        worldyAttachment += soulLost;
        do_Not_Count++;
        updateVariables();
        show_Soul_Lost(e, soulLost);
    }
    else {
        worldyAttachment = 0;
        attachmentTracker.innerText = worldyAttachment.toFixed(2);
        introStinger.currentTime = 0;
        introStinger.play();
        setTimeout(() => {
            alert("**POOF**");
        }, 100);
        beginGame = true;
        startTime = Date.now();
        setInterval(updateClock, 1000);
        updateClock();
        playTrack(1);
    }
});

lessBuy.addEventListener("click", () => {
    if (Math.abs(worldyAttachment) >= lessCurrPrice) {
        worldyAttachment += lessCurrPrice;
        click_mult += 0.05;
        less_Owned += 1;
        lessCurrPrice = Math.ceil(10 * Math.pow(1.09, less_Owned));
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

sIncBuy.addEventListener("click", () => {
    if (Math.abs(worldyAttachment) >= sIncCurrPrice) {
        worldyAttachment += sIncCurrPrice;
        sIncCount += 1;
        sIncCurrPrice = Math.ceil(50 * Math.pow(1.35, sIncCount));
        updateVariables();
    }
});

sIncTip.addEventListener("click", () => {
    if (sIncToolTip.style.display == "none") {
        sIncToolTip.style.display = "block";
    }
    else {
        sIncToolTip.style.display = "none";
    }
});

clickBuy.addEventListener("click", () => {
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

cigBuy.addEventListener("click", () => {
    if (Math.abs(worldyAttachment) >= cig_Price) {
        worldyAttachment += cig_Price;
        cig_Smoked += 1;
        cig_Price = Math.ceil(1000 * Math.pow(1.17, cig_Smoked));
        updateVariables();
    }
});

bingeTip.addEventListener("click", () => {
    if (bingeToolTip.style.display == "none") {
        bingeToolTip.style.display = "block";
    }
    else {
        bingeToolTip.style.display = "none";
    }
});



function updateClock() {
    const secondsElapsed = Math.floor((Date.now() - startTime) / 1000);
    const days = Math.floor(secondsElapsed / 10);
    clock.innerText =
        `Days since: ${days}`;

    if (days != lastDay) {
        lastDay = days;
        if (days % 5 === 0) {
            updateFlavorText();
        }
        newDay();
    }
    smoke();
}

function smoke() {
    worldyAttachment += gainPer * cig_Smoked;
    updateVariables();
}


let lessUnlocked = false;
let sIncUnlocked = false;
let clickUnlocked = false;

let cigUnlocked = false;
let bingeUnlocked = false;

function updateVariables() {
    clickMult.innerText = (click_mult * 100).toFixed(0) + " percent";
    base_per_click = -1 * (1 + clickUpOwned);
    baseClick.innerText = base_per_click;
    attachmentTracker.innerText = worldyAttachment.toFixed(2);
    gainPer = base_per_click + (base_per_click * click_mult);
    gainPerClick.innerText = gainPer.toFixed(2);
    burnPer = (sIncCount * 10) + (lIncCount * 50);
    burnPerDay.innerText = burnPer;
    doNotCount.innerText = do_Not_Count;
    lessPrice.innerText = lessCurrPrice;
    lessOwned.innerText = "Times Performed = " + less_Owned;
    sIncPrice.innerText = sIncCurrPrice;
    sIncOwned.innerText = "Owned = " + sIncCount;
    clickPrice.innerText = clickUpPrice;
    clickOwned.innerText = "Times Performed = " + clickUpOwned;
    cigPrice.innerText = cig_Price;
    cigOwned.innerText = "Cigs Smoked = " + cig_Smoked;
    


    //Reveal new mechanics once a certain threshold has been met.
    if (!lessUnlocked && worldyAttachment <= -5) {
        lessReveal.forEach(ele => {
            ele.style.display = "inline-block";
        });
        lessToolTip.style.display = "block";
        lessUnlocked = true;
    }

    if (!sIncUnlocked && worldyAttachment <= -25) {
        sIncReveal.forEach(ele => {
            ele.style.display = "inline-block";
        });
        sIncToolTip.style.display = "block";
        sIncUnlocked = true;
    }

    if (!clickUnlocked && worldyAttachment <= -125) {
        clickReveal.forEach(ele => {
            ele.style.display = "inline-block";
        });
        clickToolTip.style.display = "block";
        clickUnlocked = true;
    }

    if (!cigUnlocked && worldyAttachment <= -500) {
        cigReveal.forEach(ele => {
            ele.style.display = "inline-block";
        });
        cigToolTip.style.display = "block";
        cigUnlocked = true;
    }

    if (!bingeUnlocked && worldyAttachment <= -1500) {
        bingeReveal.forEach(ele => {
            ele.style.display = "inline-block";
        });
        bingeToolTip.style.display = "block";
        bingeUnlocked = true;
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
        clickPrice.style.backgroundColor = "green";
    }
    else {
        clickPrice.style.backgroundColor = "red";
    }

    if (Math.abs(worldyAttachment) >= cig_Price) {
        cigPrice.style.backgroundColor = "green";
    }
    else {
        cigPrice.style.backgroundColor = "red";
    }




}

//Function is called on every new day. A new day is called every 10 seconds.
function newDay() {
    worldyAttachment += -(burnPer);
    total_Burned += burnPer;
    totalBurned.innerText = total_Burned;
    updateVariables();
}

function updateFlavorText() {
    tickerTrack.style.opacity = 0;
    
    setTimeout(() => {
        currentTick++;
        if (currentTick >= flavorTextList.length) {
            currentTick = 0;
        }
        tickerTrack.innerText = flavorTextList[currentTick];
        tickerTrack.style.opacity = 1;
    }, 1000);
}

const songName = document.getElementById("currentTrack");
const prefix = document.getElementById("prefix");
const lastSong = document.getElementById("music1");
const nextSong = document.getElementById("music2");

let song = null;

function playTrack(index) {
    currentTrack = index;
    song = playlist[index];
    songName.innerText = song;
    prefix.style.display = "block";
    songName.style.display = "block";
    lastSong.style.display = "inline-block";
    nextSong.style.display = "inline-block";
    volumeSlider.style.display = "inline-block"
    bgmsource.src = playlist[currentTrack];
    bgm.load();
    bgm.play();
}

bgm.addEventListener("ended", () => {
    let nextTrack;
    
    do {
        nextTrack = Math.floor(Math.random() * playlist.length);
    } 
    while (nextTrack === currentTrack && playlist.length > 1); 
    
    playTrack(nextTrack);
});

lastSong.addEventListener("click" , () => {
    currentTrack -= 1;
    if (currentTrack < 0) {
        currentTrack = playlist.length - 1;
    }
    playTrack(currentTrack);
});

nextSong.addEventListener("click", () => {
    currentTrack += 1;
    if (currentTrack >= playlist.length){
        currentTrack = 0
    }
    playTrack(currentTrack);
});

volumeSlider.addEventListener("input" , () => {
    bgm.volume = volumeSlider.value;
});

function show_Soul_Lost(e, amount) {
    const ele = document.createElement('span');
    ele.textContent = `-${Math.abs(amount).toFixed(2)}`;
    ele.className = "driftUp";

    Object.assign(ele.style, {
    position: 'fixed',
    left: e.clientX + 'px',
    top:  e.clientY + 'px',
    pointerEvents: 'none',
    zIndex: '9500',
    fontWeight: '700',
    color: '#eaeaea',
    background: 'rgba(0,0,0,0.45)',
    padding: '2px 6px',
    borderRadius: '6px',
    fontSize: '16px',
  });

    document.body.appendChild(ele);
    setTimeout(() => ele.remove(), 1000);
}