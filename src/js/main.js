'use strict'

// the first element in txts is the top text, the last is the bottom text
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

function filter() {

}

function toggleSearchBox() {
    var elSearchBox = document.querySelector('.search-container input');
    var elNavBar = document.querySelector('.navigation');
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

// update color

//top
$('.top .color').click(function() {
    var colorInput = $('.top [type = color]')[0];
    colorInput.click();
});

$('.top [type = color]').change(function() {
    gState.txts[0].color = $(this).val();
    drawCanvas();
});

//bottom
$('.bottom .color').click(function() {
    var colorInput = $('.bottom [type = color]')[0];
    colorInput.click();
});

$('.bottom [type = color]').change(function() {
    gState.txts[1].color = $(this).val();
    drawCanvas();
});

// update text-align
$('.top [data-align]').click(function() {
    gState.txts[0].align = $(this).attr('data-align');
    drawCanvas();
});

$('.bottom [data-align]').click(function() {
    gState.txts[1].align = $(this).attr('data-align');
    drawCanvas();
});
