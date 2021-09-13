var text = ["", "", ""];
var cursor = "<span id=\"cursor\">|</span>";
var charlimit = (.4 * visualViewport.width / 10);
var store = ["\"Space?!\" he was astonished.", "\"Yes why not?\". They both stared at the " +
        "enchanting lights of the night sky, trying to absorb the idea.", "\"Everytime I look up, there is something magical " +
        "that awakes me,", "that pulls me away to the world beyond\",", "she said with that simple smile and calm voice,",
    "\"unimaginably far away, something so familiar yet unreal,", "something that gives all of this a meaning.\"",
];
var shadow = "visible";
function init() {
    document.addEventListener("keydown", function (e) { if (e.key == " ")
        if (!started) {
            started = true;
            gameLoop();
        }
        else
            pressSpace(); });
    var textcontainer = document.getElementById("part1");
    var animebox = document.getElementById("part2");
    animebox.addEventListener("click", pressSpace);
    var speed = 200; //ms
    var str = generateText();
    var waitDelay = 1000;
    var gameover = false;
    var save = 0;
    var started = false;
    var score = 0;
    var t;
    var address = document.getElementsByClassName("address")[0];
    address.innerHTML = "IveLostMy\"space\"CanyouHelpMeType?...PressSpaceToAccept.";
    var high = document.getElementsByClassName("address")[1];
    high.innerHTML = localStorage.typehigh ? ("allTimeHigh:" + localStorage.typehigh) : "";
    function gameLoop() {
        address.innerHTML = score;
        if (save) {
            clearTimeout(save);
            save = 0;
        }
        if (gameover)
            return;
        if (!typeText(str, textcontainer)) {
            str = " " + generateText();
            text[0] = "";
            if (str == " ")
                return;
            keystroke("type");
        }
        if (str)
            str = str.substring(1);
        console.log(text[1]);
        if (text[1] == " ") {
            t = performance.now();
            save = setTimeout(gameOver, speed + waitDelay);
            animate(animebox, waitDelay);
            setTimeout(cancelanimate, waitDelay);
        }
        else
            setTimeout(gameLoop, speed - (Math.random() - 1) * speed);
    }
    function pressSpace() {
        console.log("press");
        if (text[1] == " ") {
            score += 2 * (waitDelay - (performance.now() - t));
            score=parseInt(score);
            cancelanimate(animebox);
            gameLoop();
        }
        else {
            text[0] += " ";
            updateText(textcontainer);
            gameOver();
        }
    }
    function gameOver() {
        cancelanimate(animebox);
        if (score > localStorage.typehigh)
            localStorage.typehigh = score;
        animebox.style.backgroundColor = "rgb(200,150,150)";
        gameover = true;
        keystroke("error");
    }
}
function toggle() {
    if (shadow == "hidden")
        shadow = "visible";
    else
        shadow = "hidden";
    console.log(shadow);
    document.getElementById("div2").style.visibility = shadow;
}
function typeText(str, textcontainer, shadow) {
    if (shadow === void 0) { shadow = true; }
    if (isFull(textcontainer))
        resetText(textcontainer);
    console.log(str, text);
    if (shadow)
        text[2] = str ? str : "";
    if (text[1] == '' && !str)
        return false;
    text[0] = text[0] + (text[1] ? text[1] : "");
    text[1] = text[2] ? text[2][0] : "";
    updateText(textcontainer);
    return true;
}
function generateText() {
    var str = store.shift();
    return str ? str : "";
}
function animate(animebox, waitDelay) {
    var span = animebox.getElementsByTagName("span");
    var i = 0;
    while (i < 4) {
        span[i].style.transitionDuration = waitDelay + "ms";
        i++;
    }
    span[0].style.width = 0 + "%";
    span[1].style.height = 0 + "%";
    span[2].style.width = 0 + "%";
    span[3].style.height = 0 + "%";
}
function cancelanimate(animebox) {
    var span = animebox.getElementsByTagName("span");
    var i = 0;
    while (i < 4) {
        span[i].style.transitionDuration = 0 + "ms";
        i++;
    }
    span[0].style.width = 100 + "%";
    span[1].style.height = 100 + "%";
    span[2].style.width = 100 + "%";
    span[3].style.height = 100 + "%";
}
function updateText(textcontainer) {
    var divs = textcontainer.children;
    divs[0].innerHTML = text[0] + cursor; // + "<div id=\"div3\">" + text[2] + "</div>";
    var word = text[2];
    if (text[1] == " ")
        word = "<u>" + " " + "</u>" + word.substring(1);
    divs[1].innerHTML = word || word.substring(0, word.indexOf(" "));
    keystroke("type");
}
function keystroke(key) {
    var player = document.createElement("audio");
    player.src = key + ".mp3";
    // player.volume = 1;
    player.play();
}
init();
function resetText(textcontainer) {
    var divs = textcontainer.children;
    text[0] = text[0].substring(text[0].lastIndexOf(" ") + 1);
    text[1] = "";
    divs[0].innerHTML = text[0] + cursor;
    // divs[1].innerHTML = "";
    // keystroke("type");
    //enter here
}
function isFull(textcontainer) {
    // console.log(textcontainer.children[0].innerHTML.length, charlimit);
    return (textcontainer.children[0].innerHTML.length - 26 > charlimit);
}
