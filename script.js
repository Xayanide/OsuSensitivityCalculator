$(document).ready(function(){

$('#ppi').change(function () {
    ppi = $(this).val();
    calculateSens();
});

$('#textInput').change(function () {
    winsens = $(this).val();
    calculateSens();
});

$('#winsens').change(function () {
    winsens = $(this).val();
    calculateSens();
});

$('#osusens').change(function () {
    osusens = $(this).val();
    calculateSens();
});

$('#width').change(function () {
    winWidth = $(this).val();
    calculateSens();
});

$('#height').change(function () {
    winHeight = $(this).val();
    calculateSens();
});

var getPlayArea = function () {
    if ((winWidth / winHeight) >= (4.0 / 3)) {
        playHeight = winHeight;
        playWidth = winHeight * (4.0/3);
    } else {
        playWidth = winWidth;
        playHeight = winWidth / (4 / 3);
    }
};

var getWinMulti = function (sens) {
    if (sens >= 1 && sens <= 11) {
        var list = [0.00625, 0.0125, 0.25, 0.5, 0.75, 1, 1.5, 2, 2.5, 3, 3.5];
        return list[sens - 1];
    } else {
        return 0;
    }
};
var calculateSens = function () {
    getPlayArea();
    effectivePPI = ppi * getWinMulti(winsens) * osusens;
    $('#result').text(effectivePPI);
    $('#playres').text(playWidth + 'x' + playHeight);
    effwidth = Math.round((playWidth / effectivePPI)*100)/100;
    effHeight = Math.round((playHeight / effectivePPI)*100)/100;
    $('#playarea').text(effwidth + '" x ' + effHeight + '"');
    $('#playareacm').text(effwidth * 2.54 + 'cm x ' + effHeight * 2.54 + 'cm');
};
var effwidth;
var effheight;
var ppi = 800;
var winsens = 6;
var osusens = 1;
var winWidth = 800;
var winHeight = 600;
var playWidth = 800;
var playHeight = 600;
calculateSens();
});
