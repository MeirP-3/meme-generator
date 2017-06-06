'use strict'

function renderImgs() {

}

function renderTagCloud() {

}

function renderCanvas() {
    renderImg();
}

function renderImg() {

    var imgUrl = gSelectedImgUrl;
    var context = $('canvas')[0].getContext('2d');
    var img = new Image();

    img.src = imgUrl;

    $(img).on('load', function () {

        var width = $(img)[0].width;
        var height = $(img)[0].height;
        $('canvas').css('width', width);
        $('canvas').css('height', height);

        context.drawImage(img, 0, 0);
    });
}

function createMemeImg() {

}