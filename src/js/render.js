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

// TODO: add only changed element

        // handle dimensions

        var width = Math.min(MAX_WIDTH, img.width);
        var aspectRatio = img.width / img.height;
        var height = width / aspectRatio;
        var canvas = $('canvas')[0];

        canvas.width = width;
        canvas.height = height;
        context.drawImage(img, 0, 0, width, height);

// add all texts
        gState.txts.forEach(function (txt, i) {
            var objTxt = gState.txts[i];
            var fontSize = parseInt(objTxt.fontSize);

            var posX;
            switch(objTxt.align) {
                case 'left':
                posX = 0;
                break;
                case 'right':
                posX = canvas.width;
                break;
                case 'center':
                posX = canvas.width / 2;
            }

            var posY = (i === 0) ? fontSize : canvas.height - 5 ;

            context.font = '700 ' + objTxt.fontSize + ' ' + objTxt.fontFamily;
            context.textAlign = objTxt.align;

// TODO: add multyline support

            context.strokeStyle = '#000';
            context.fillStyle = objTxt.color;
            context.strokeText(objTxt.content, posX, posY);
            context.fillText(objTxt.content, posX, posY);
        });
    });
}

function createMemeImg() {

}