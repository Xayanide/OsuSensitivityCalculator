$(document).ready(function() {
    $('#ppi').change(function() {
        ppi = $(this).val();
        calculateSensitivity();
    });

    $('#winsens').change(function() {
        windowsSensitivity = $(this).val();
        $('#winsensrange').val(windowsSensitivity);
        calculateSensitivity();
    });

    $('#winsensrange').change(function() {
        windowsSensitivity = $(this).val();
        $('#winsens').val(windowsSensitivity);
        calculateSensitivity();
    });

    $('#osusens').change(function() {
        osuSensitivity = $(this).val();
        calculateSensitivity();
    });

    $('#width').change(function() {
        windowsWidth = $(this).val();
        calculateSensitivity();
    });

    $('#height').change(function() {
        windowsHeight = $(this).val();
        calculateSensitivity();
    });

    $('#playarea-round').change(function() {
        calculateSensitivity();
    });

    const getPlayArea = function() {
        if ((windowsWidth / windowsHeight) >= (4.0 / 3)) {
            playHeight = windowsHeight;
            playWidth = windowsHeight * (4.0 / 3);
        } else {
            playWidth = windowsWidth;
            playHeight = windowsWidth / (4 / 3);
        }
    };

    const getWindowsMultiplier = function(sensitivity) {
        if (sensitivity >= 1 && sensitivity <= 11) {
            const list = [0.00625, 0.0125, 0.25, 0.5, 0.75, 1, 1.5, 2, 2.5, 3, 3.5];
            return list[sensitivity - 1];
        } else {
            return 0;
        }
    };
    const calculateSensitivity = function() {
        getPlayArea();
        effectivePPI = ppi * getWindowsMultiplier(windowsSensitivity) * osuSensitivity;
        $('#playppi').text(effectivePPI);
        $('#playres').text(`${playWidth}x${playHeight}`);
        effectiveWidth = Math.round((playWidth / effectivePPI) * 100) / 100;
        effectiveHeight = Math.round((playHeight / effectivePPI) * 100) / 100;
        $('#playarea-in').text($('#playarea-round').is(':checked') ? `${Math.round(effectiveWidth)}" x ${Math.round(effectiveHeight)}"` : `${effectiveWidth}" x ${effectiveHeight}"`);
        $('#playarea-cm').text($('#playarea-round').is(':checked') ? `${Math.round(effectiveWidth * 2.54)}cm x ${Math.round(effectiveHeight * 2.54)}cm` : `${(effectiveWidth) * 2.54}cm x ${effectiveHeight * 2.54}cm`);
        $('#playarea-mm').text($('#playarea-round').is(':checked') ? `${Math.round(effectiveWidth * 25.4)}mm x ${Math.round(effectiveHeight * 25.4)}mm` : `${(effectiveWidth) * 25.4}mm x ${effectiveHeight * 25.4}mm`);
    };
    let effectivePPI;
    let effectiveWidth;
    let effectiveHeight;
    let ppi = 800;
    let windowsSensitivity = 6;
    let osuSensitivity = 1;
    let windowsWidth = 800;
    let windowsHeight = 600;
    let playWidth = 800;
    let playHeight = 600;

    calculateSensitivity();
});
