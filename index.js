$(document).ready(function() {
    $('#ppi').change(function() {
        ppi = $(this).val();
        calculateSens();
    });

    $('#winsens').change(function() {
        winsens = $(this).val();
        calculateSens();
    });

    $('#winsensrange').change(function() {
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
        if (sens >= 1 && sens <= 11) {
            const list = [0.00625, 0.0125, 0.25, 0.5, 0.75, 1, 1.5, 2, 2.5, 3, 3.5];
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
