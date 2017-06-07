'use strict'

// the first element in txts is the top text, the last is the bottom text

var EDITOR_LINK = 'app.html';

var gState = {
    selectedImgId: 0,
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

function filter(searchKeys) { // if search-icon is toggled and the input is not empty, click on the search icon activate the filter function
    var searchBox = document.querySelector('#search-box');

    var filtered = gImgs.filter(function (img) {
        for (var i = 0; i < img.keywords.length; i++) {
            for (var j = 0; j < searchKeys.length; j++) {
                if (img.keywords[i] === searchKeys[j]) {
                    return true;
                }
            }
        }
    });
    console.log(filtered);
}

function showSearchBox() {
    var box = document.querySelector('.search-container input');
    if (box.classList.contains('hidden')) {
        box.classList.remove('hidden');
    }
}

function toggleHeaderElements() {
    var elSearchBox = document.querySelector('.search-container');
    var elNavBar = document.querySelector('.navigation');
    var elTitle = document.querySelector('header .title');

    if (elSearchBox.classList.contains('hidden')) {
        elSearchBox.classList.remove('hidden');
        elNavBar.classList.add('hidden');

    } else {
        elSearchBox.classList.add('hidden');
        elNavBar.classList.remove('hidden');
    }

}

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

$('.item-container').click(function() {
    var id = $(this).attr('id');
    console.log(id);
    // gState.selectedImgId = 
});