$(document).ready(function() {
    $('#ppi').change(function() {
        ppi = $(this).val();
        calculateSens();
    });

    $('#textInput').change(function() {
        winsens = $(this).val();
        calculateSens();
    });

    $('#winsens').change(function() {
        winsens = $(this).val();
        calculateSens();
    });

    $('#osusens').change(function() {
        osusens = $(this).val();
        calculateSens();
    });

    $('#width').change(function() {
        winWidth = $(this).val();
        calculateSens();
    });

    $('#height').change(function() {
        winHeight = $(this).val();
        calculateSens();
    });

    const getPlayArea = function() {
        if ((winWidth / winHeight) >= (4.0 / 3)) {
            playHeight = winHeight;
            playWidth = winHeight * (4.0 / 3);
        } else {
            playWidth = winWidth;
            playHeight = winWidth / (4 / 3);
        }
    };

    const getWinMulti = function(sens) {
        if (sens >= 1 && sens <= 20) {
            const list = [1 / 32, 1 / 16, 1 / 8, 2 / 8, 3 / 8, 4 / 8, 5 / 8, 6 / 8, 7 / 8, 1.0, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5];
            return list[sens - 1];
        } else {
            return 0;
        }
    };
    const calculateSens = function() {
        getPlayArea();
        effectivePPI = ppi * getWinMulti(winsens) * osusens;
        $('#result').text(effectivePPI);
        $('#playres').text(playWidth + 'x' + playHeight);
        effwidth = Math.round((playWidth / effectivePPI) * 100) / 100;
        effheight = Math.round((playHeight / effectivePPI) * 100) / 100;
        $('#playarea').text(effwidth + '" x ' + effheight + '"');
        $('#playareacm').text(effwidth * 2.54 + 'cm x ' + effheight * 2.54 + 'cm');
    };
    let effectivePPI;
    let effwidth;
    let effheight;
    let ppi = 800;
    let winsens = 6;
    let osusens = 1;
    let winWidth = 800;
    let winHeight = 600;
    let playWidth = 800;
    let playHeight = 600;
    calculateSens();
});
