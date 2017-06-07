'use strict'

// the first element in txts is the top text, the last is the bottom text

var EDITOR_LINK = 'app.html';

var gState = {
    selectedImgId: `img-${getRandomIntInclusive(1, 9)}`,
    txts: [
        {
            content: '',
            fontFamily: 'sans-serif',
            fontSize: '30px',
            color: 'white',
            align: 'center'
        },
        {
            content: '',
            fontFamily: 'sans-serif',
            fontSize: '30px',
            color: 'white',
            align: 'center'
        }
    ]
};

function createTagCloud() {

}

// function filter(searchKeys) { // if search-icon is toggled and the input is not empty, click on the search icon activate the filter function
//     var searchBox = document.querySelector('#search-box');

//     var filtered = gImgs.filter(function (img) {
//         for (var i = 0; i < img.keywords.length; i++) {
//             for (var j = 0; j < searchKeys.length; j++) {
//                 if (img.keywords[i] === searchKeys[j]) {
//                     return true;
//                 }
//             }
//         }
//     });
//     console.log(filtered);
// }

// function showSearchBox() {
//     var box = document.querySelector('.search-container input');
//     if (box.classList.contains('hidden')) {
//         box.classList.remove('hidden');
//     }
// }

// function toggleHeaderElements() {
//     var elSearchBox = document.querySelector('.search-container');
//     var elNavBar = document.querySelector('.navigation');
//     var elTitle = document.querySelector('header .title');

//     if (elSearchBox.classList.contains('hidden')) {
//         elSearchBox.classList.remove('hidden');
//         elNavBar.classList.add('hidden');

//     } else {
//         elSearchBox.classList.add('hidden');
//         elNavBar.classList.remove('hidden');
//     }

// }

// update top text in model on any change
$('.top textarea').keyup(function () {
    var content = $(this).val();
    gState.txts[0].content = content;
    drawCanvas();
});

// update bottom text in model on any change
$('.bottom textarea').keyup(function () {
    var content = $(this).val();
    gState.txts[1].content = content;
    drawCanvas();
});

///////////////////////////////// update color ///////////////////////////////////////////

//top
$('.top .color').click(function () {
    var colorInput = $('.top [type = color]')[0];
    colorInput.click();
});

$('.top [type = color]').change(function () {
    gState.txts[0].color = $(this).val();
    drawCanvas();
});

//bottom
$('.bottom .color').click(function () {
    var colorInput = $('.bottom [type = color]')[0];
    colorInput.click();
});

$('.bottom [type = color]').change(function () {
    gState.txts[1].color = $(this).val();
    drawCanvas();
});

/////////////////////////////////////// update text-align /////////////////////////////////////////////
$('.top [data-align]').click(function () {
    gState.txts[0].align = $(this).attr('data-align');
    drawCanvas();
});

$('.bottom [data-align]').click(function () {
    gState.txts[1].align = $(this).attr('data-align');
    drawCanvas();
});

//////////////////////////////////// update font size /////////////////////////////////////////////////

// TODO: handle max & min

$('.top [data-increase]').click(function () {
    var currentSize = parseInt(gState.txts[0].fontSize);
    var updatedSize = currentSize + 2;
    gState.txts[0].fontSize = updatedSize + 'px';
    drawCanvas();
});

$('.top [data-decrease]').click(function () {
    var currentSize = parseInt(gState.txts[0].fontSize);
    var updatedSize = currentSize - 2;
    gState.txts[0].fontSize = updatedSize + 'px';
    drawCanvas();
});

$('.bottom [data-increase]').click(function () {
    var currentSize = parseInt(gState.txts[1].fontSize);
    var updatedSize = currentSize + 2;
    gState.txts[1].fontSize = updatedSize + 'px';
    drawCanvas();
});

$('.bottom [data-decrease]').click(function () {
    var currentSize = parseInt(gState.txts[1].fontSize);
    var updatedSize = currentSize - 2;
    gState.txts[1].fontSize = updatedSize + 'px';
    drawCanvas();
});

/////////////////////////////////////// clear textarea ///////////////////////////

$('.top [data-clear]').click(function () {
    $('.top textarea')[0].value = '';
    gState.txts[0].content = '';
    drawCanvas();
});

$('.bottom [data-clear]').click(function () {
    $('.bottom textarea')[0].value = '';
    gState.txts[1].content = '';
    drawCanvas();
});

$('.item-container').click(function () {
    var id = this.id;
    localStorage.setItem('id', id)
});

////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////
//                      render section
////////////////////////////////////////////////////////////////////

var MAX_WIDTH = 300;

// execute renderItems() only on homepage.
if (window.location.pathname === '/') $(document).ready(init);
if (window.location.pathname === '/app.html') $(document).ready(drawCanvas);

function init() {
    renderItems();
    $('.item-container').click(function () {
        var id = this.id;
        localStorage.setItem('id', id)
    });
}

function renderItems() {
    for (var i = 0; i < gImgs.length; i++) {
        var url = gImgs[i].url.sm;
        renderItem(url, i);
    }
    $('.item-container')[0].classList.add('hidden');
}

function renderItem(url, i) {
    var item = $('.item-container').clone()[0];
    $(item).find('.item-img img').attr('src', url);
    $(item).find('.editor-link').attr('href', EDITOR_LINK);
    item.id = `img-${i + 1}`;
    $('.items-wraper').append(item);
}

function renderImgs() {

}

function renderTagCloud() {

}

function drawCanvas() {
    var context = $('canvas')[0].getContext('2d');
    var img = new Image();
    var id = localStorage.getItem('id');
    var imgUrl = gImgsMap[id].url.lg;
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
            switch (objTxt.align) {
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
            var posY = (i === 0) ? fontSize * 0.8 : canvas.height - 5;

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

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
