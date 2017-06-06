'use strict'

// the first element in txts is the top text, the last is the bottom text
var gState = {
    selectedImgId: 0,
    txts: [
        {
            content: '',
            posX: 40,
            posY: 40,
            fontFamily: 'sans-serif',
            fontSize: '30px',
            color: 'black'
        },
        {
            content: '',
            posX: 40,
            posY: 300,
            fontFamily: 'sans-serif',
            fontSize: '30px',
            color: 'red'
        }
    ]
};

function createTagCloud() {

}

function filter() {

}

// update top text in model on any change
$('.top > textarea').keyup(function () {
    var content = $(this).val();
    gState.txts[0].content = content;
    drawCanvas();
});

// update bottom text in model on any change
$('.bottom > textarea').keyup(function () {
    var content = $(this).val();
    gState.txts[1].content = content;
    drawCanvas();
});