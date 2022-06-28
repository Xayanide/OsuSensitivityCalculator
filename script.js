let windowsWidth = 800;
let osuGameWidth = 800;
let windowsHeight = 600;
let osuGameHeight = 600;

function getPlayArea() {
    if ((windowsWidth / windowsHeight) >= (4.0 / 3)) {
        osuGameHeight = windowsHeight;
        osuGameWidth = windowsHeight * (4.0 / 3);
    } else {
        osuGameWidth = windowsWidth;
        osuGameHeight = windowsWidth / (4 / 3);
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
let osuGameSensitivity = 1;
let effectivePPI;
let effectiveWidth;
let effectiveHeight;

function calculateSensitivity() {
    getPlayArea();
    effectivePPI = ppi * getWindowsMultiplier(windowsSensitivity) * osuGameSensitivity;
    document.getElementById('play-ppi').innerHTML = effectivePPI;
    document.getElementById('play-resolution').innerHTML = `${osuGameWidth}x${osuGameHeight}`;
    effectiveWidth = Math.round((osuGameWidth / effectivePPI) * 100) / 100;
    effectiveHeight = Math.round((osuGameHeight / effectivePPI) * 100) / 100;
    document.getElementById('playarea-in').innerHTML = document.querySelector('#round-playarea').checked ? `${Math.round(effectiveWidth)}" x ${Math.round(effectiveHeight)}"` : `${effectiveWidth}" x ${effectiveHeight}"`;
    document.getElementById('playarea-cm').innerHTML = document.querySelector('#round-playarea').checked ? `${Math.round(effectiveWidth * 2.54)}cm x ${Math.round(effectiveHeight * 2.54)}cm` : `${effectiveWidth * 2.54}cm x ${effectiveHeight * 2.54}cm`;
    document.getElementById('playarea-mm').innerHTML = document.querySelector('#round-playarea').checked ? `${Math.round(effectiveWidth * 25.4)}mm x ${Math.round(effectiveHeight * 25.4)}mm` : `${effectiveWidth * 25.4}mm x ${effectiveHeight * 25.4}mm`;
}

window.addEventListener('load', () => {

    document.getElementById('ppi-input').addEventListener('change', function() {
        if (document.getElementById('ppi-input').value < 1) {
            document.getElementById('ppi-input').value = ppi;
        } else {
            ppi = document.getElementById('ppi-input').value;
        }
        calculateSensitivity();
    });

    document.getElementById('windows-sensitivity').addEventListener('change', function() {
        if (document.getElementById('windows-sensitivity').value < 1 || document.getElementById('windows-sensitivity').value > 11) {
            document.getElementById('windows-sensitivity').value = windowsSensitivity;
            document.getElementById('windows-sensitivity-range').value = windowsSensitivity;
        } else {
            windowsSensitivity = document.getElementById('windows-sensitivity').value;
            document.getElementById('windows-sensitivity-range').value = document.getElementById('windows-sensitivity').value;
        }
        calculateSensitivity();
    });

    document.getElementById('windows-sensitivity-range').addEventListener('input', function() {
        if (isNaN(document.getElementById('windows-sensitivity-range').value)) {
            document.getElementById('windows-sensitivity-range').value = windowsSensitivity;
            document.getElementById('windows-sensitivity').value = windowsSensitivity;
        } else {
            windowsSensitivity = document.getElementById('windows-sensitivity-range').value;
            document.getElementById('windows-sensitivity').value = document.getElementById('windows-sensitivity-range').value;
        }
        calculateSensitivity();
    });

    document.getElementById('osugame-sensitivity').addEventListener('change', function() {
        if (document.getElementById('osugame-sensitivity').value < 0.40 || document.getElementById('osugame-sensitivity').value > 6.00) {
            document.getElementById('osugame-sensitivity').value = osuGameSensitivity;
        } else {
            osuGameSensitivity = document.getElementById('osugame-sensitivity').value;
        }
        calculateSensitivity();
    });

    document.getElementById('windows-width').addEventListener('change', function() {
        if (document.getElementById('windows-width').value < 0) {
            document.getElementById('windows-width').value = windowsWidth;
        } else {
            windowsWidth = document.getElementById('windows-width').value;
        }
        calculateSensitivity();
    });

    document.getElementById('windows-height').addEventListener('change', function() {
        if (document.getElementById('windows-height').value < 0) {
            document.getElementById('windows-height').value = windowsHeight;
        } else {
            windowsHeight = document.getElementById('windows-height').value;
        }
        calculateSensitivity();
    });

    document.getElementById('round-playarea').addEventListener('change', function() {
        calculateSensitivity();
    });

    calculateSensitivity();
});
