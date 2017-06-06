'use strict'

var MAX_WIDTH = 300;


function renderImgs() {

}

function renderTagCloud() {

}

function drawCanvas() {

    var context = $('canvas')[0].getContext('2d');

    var img = new Image();

    var imgUrl = gImgsMap[gState.selectedImgId].url.lg;

    img.src = imgUrl;

    $(img).on('load', function () {

        // handle dimensions

        var width = Math.min(MAX_WIDTH, img.width);
        var height = img.height;

        $('canvas')[0].width = width;
        $('canvas')[0].height = height;

        context.drawImage(img, 0, 0, width, height);

        // set default position of bottom text according to image size!
        gState.txts[gState.txts.length - 1].posY = height - 10;

        gState.txts.forEach(function (txt, i) {
            var content = gState.txts[i].content;
            context.font = '700 ' + gState.txts[i].fontSize + ' ' + gState.txts[i].fontFamily;
            context.strokeStyle = gState.txts[i].color;
            context.strokeText(content, gState.txts[i].posX, gState.txts[i].posY);
        });
    });
}

function createMemeImg() {

}