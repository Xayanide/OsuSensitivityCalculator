let windowsWidth = 800;
let gameWidth = 800;
let windowsHeight = 600;
let gameHeight = 600;

function getPlayArea() {
    if ((windowsWidth / windowsHeight) >= (4.0 / 3)) {
        gameHeight = windowsHeight;
        gameWidth = windowsHeight * (4.0 / 3);
    } else {
        gameWidth = windowsWidth;
        gameHeight = windowsWidth / (4 / 3);
    }
}

function getWindowsMultiplier(sensitivity) {
    if (sensitivity >= 1 && sensitivity <= 11) {
        const list = [0.00625, 0.0125, 0.25, 0.5, 0.75, 1, 1.5, 2, 2.5, 3, 3.5];
        return list[sensitivity - 1];
    } else {
        return 0;
    }
}

let ppi = 800;
let windowsSensitivity = 6;
let gameSensitivity = 1;
let effectivePPI;
let effectiveWidth;
let effectiveHeight;
function calculateSensitivity() {
    getPlayArea();
    effectivePPI = ppi * getWindowsMultiplier(windowsSensitivity) * gameSensitivity;
    document.getElementById('playPPI').innerHTML = effectivePPI;
    document.getElementById('playResolution').innerHTML = `${gameWidth}x${gameHeight}`;
    effectiveWidth = Math.round((gameWidth / effectivePPI) * 100) / 100;
    effectiveHeight = Math.round((gameHeight / effectivePPI) * 100) / 100;
    document.getElementById('playAreaIN').innerHTML = document.querySelector('#roundPlayAreas').checked ? `${Math.round(effectiveWidth)}" x ${Math.round(effectiveHeight)}"` : `${effectiveWidth}" x ${effectiveHeight}"`;
    document.getElementById('playAreaCM').innerHTML = document.querySelector('#roundPlayAreas').checked ? `${Math.round(effectiveWidth * 2.54)}cm x ${Math.round(effectiveHeight * 2.54)}cm` : `${effectiveWidth * 2.54}cm x ${effectiveHeight * 2.54}cm`;
    document.getElementById('playAreaMM').innerHTML = document.querySelector('#roundPlayAreas').checked ? `${Math.round(effectiveWidth * 25.4)}mm x ${Math.round(effectiveHeight * 25.4)}mm` : `${effectiveWidth * 25.4}mm x ${effectiveHeight * 25.4}mm`;
}

window.addEventListener('load', () => {

    document.getElementById('ppiInput').addEventListener('change', function() {
        ppi = document.getElementById('ppiInput').value;
        calculateSensitivity();
    });

    document.getElementById('windowsNumberInput').addEventListener('change', function() {
        windowsSensitivity = document.getElementById('windowsNumberInput').value;
        calculateSensitivity();
    });

    document.getElementById('windowsRangeInput').addEventListener('change', function() {
        windowsSensitivity = document.getElementById('windowsRangeInput').value;
        calculateSensitivity();
    });

    document.getElementById('gameNumberInput').addEventListener('change', function() {
        gameSensitivity = document.getElementById('gameNumberInput').value;
        calculateSensitivity();
    });

    document.getElementById('windowsWidthInput').addEventListener('change', function() {
        windowsWidth = document.getElementById('windowsWidthInput').value;
        calculateSensitivity();
    });

    document.getElementById('windowsHeightInput').addEventListener('change', function() {
        windowsHeight = document.getElementById('windowsHeightInput').value;
        calculateSensitivity();
    });

    document.getElementById('roundPlayAreas').addEventListener('change', function() {
        calculateSensitivity();
    });

    calculateSensitivity();
});
