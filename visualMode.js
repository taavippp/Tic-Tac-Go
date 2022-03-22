let isDarkMode;

function getRandomInteger(min, max) {
    return Math.floor(Math.random()*(max-min + 1)) + min;
}

function generateRGBColor(min) {
    const max = min + 75;
    const red = getRandomInteger(min,max);
    const blue = getRandomInteger(min,max);
    const green = getRandomInteger(min,max);
    const colorString = `rgb(${red}, ${blue}, ${green})`;
    return colorString;
}

function generateHSLColor(minLightness, hue) {
    const maxLightness = minLightness + 20;
    const saturation = getRandomInteger(0, 100);
    const lightness = getRandomInteger(minLightness, maxLightness);
    const colorString = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    return colorString;
}

function setBackgroundImage(isDarkMode) {
    const htmlElement = document.querySelector("html");
    const hue = getRandomInteger(10, 350);
    let backgroundString;
    if(isDarkMode) {
        backgroundString =
        `linear-gradient(
        ${getRandomInteger(0,360)}deg,
        ${generateHSLColor(5, hue + getRandomInteger(-10, 10))},
        ${generateHSLColor(5, hue + getRandomInteger(-10, 10))},
        ${generateHSLColor(5, hue + getRandomInteger(-10, 10))})`;
    } else {
        backgroundString =
        `linear-gradient(
        ${getRandomInteger(0,360)}deg,
        ${generateHSLColor(70, hue + getRandomInteger(-10, 10))},
        ${generateHSLColor(70, hue + getRandomInteger(-10, 10))},
        ${generateHSLColor(70, hue + getRandomInteger(-10, 10))})`;
    }
    htmlElement.style.backgroundImage = backgroundString;
}

function getVisualMode() {
    const visualMode = localStorage.getItem("visualMode");
    if(!visualMode) {
        return;
    }
    return visualMode;
}

function setVisualMode() {
    const visualMode = getVisualMode();
    if(!visualMode || visualMode=="d") {
        localStorage.setItem("visualMode","l");
        return;
    }
    localStorage.setItem("visualMode","d");
}

function applyVisualMode() {
    let visualMode = getVisualMode();
    if(visualMode==null) {
        visualMode = "l";
    }
    let prevClass;
    let currClass;
    if(visualMode=="l") {
        prevClass = "darkmode";
        currClass = "lightmode";
        setBackgroundImage(false);
        visualModeButton.textContent = "Use dark mode";
    } else {
        prevClass = "lightmode";
        currClass = "darkmode";
        setBackgroundImage(true);
        visualModeButton.textContent = "Use light mode";
    }
    const h1Element = document.querySelector("h1");
    const squareClass = document.querySelectorAll(".square");
    const buttonElement = document.querySelectorAll("button");
    h1Element.classList.remove(prevClass);
    h1Element.classList.add(currClass);
    squareClass.forEach(square => {
        square.classList.remove(prevClass);
        square.classList.add(currClass);
    });
    buttonElement.forEach(button => {
        button.classList.remove(prevClass);
        button.classList.add(currClass);
    })
}

const visualModeButton = document.querySelector("#visual-mode");
visualModeButton.addEventListener("click",()=>{
    setVisualMode();
    applyVisualMode();
});
applyVisualMode();