'use strict'

var MAX_WIDTH = 300;

function renderImgs() {

}

function renderTagCloud() {

}

function drawCanvas() {
    var context = $('canvas')[0].getContext('2d');
    var img = new Image();
    $(img).attr('crossOrigin', 'anonymous');

    var imgUrl = gImgsMap[gState.selectedImgId].url.lg;
    img.src = imgUrl;

    $(img).on('load', function () {

// TODO: add only changed element

        // handle dimensions

        var width = Math.min(MAX_WIDTH, img.width);
        var aspectRatio = img.width / img.height;
        var height = width / aspectRatio;
        var canvas = $('canvas')[0];
//************************************************************************************
// there is a significant difference between <canvas.width> to <canvas.style.width>.
// the former defines the width in pixels of the canvas,
// while the latter stretchs the existing pixels to the specified width.
// I figured it out beacuse the img was drawn partialy on the canbas no matter how 
// the width style was.
//************************************************************************************
        canvas.width = width;
        canvas.height = height;
        context.drawImage(img, 0, 0, width, height);

// add all texts
        gState.txts.forEach(function (txt, i) {
            var objTxt = gState.txts[i];
            var fontSize = parseInt(objTxt.fontSize);

//##########################################################################
// canvas align text is relative to x position.
// .textAlign = 'center' stretches text to both sides of x respectively,
// .textAlign = 'left' attaches text on rihgt side of x.
// .textAlign = 'right' attaches text on left side of x.
// therefore the x must change according to current align.
//##########################################################################

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

// top text gets y=0, bottom text gets a little less than canvas height
            var posY = (i === 0) ? fontSize * 0.8 : canvas.height - 5 ;

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

$('.create-img').click(function () {
    var canvas = $('canvas')[0];
    window.location = canvas.toDataURL('image/jpg');
});