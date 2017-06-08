'use strict'

var MAX_WIDTH = 1000;
var DEFAULT_FONT_SIZE = '60px';
var TOP_COLOR = 'yellow';
var BOTTOM_COLOR = "yellow";
var NONE = 'none';
var TOP = 'top';
var BOTTOM = 'botom';

var gState = {
    selectedImgId: `img-${getRandomIntInclusive(1, 9)}`,
    alignBarFor: 'none',
    txts: [
        {
            content: '',
            fontFamily: 'sans-serif',
            fontSize: DEFAULT_FONT_SIZE,
            color: TOP_COLOR,
            align: 'center'
        },
        {
            content: '',
            fontFamily: 'sans-serif',
            fontSize: DEFAULT_FONT_SIZE,
            color: BOTTOM_COLOR,
            align: 'center'
        }
    ]
};

///////////////////////////////////////////////////////////////////////////////////////
//                                  help function : in case of
///////////////////////////////////////////////////////////////////////////////////////
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

$(document).ready(init);

function init() {

    drawCanvas();

    function drawCanvas() {
        var context = $('canvas')[0].getContext('2d');
        var img = new Image();
        var id = localStorage.getItem('id');

        // handle loading the page directly without choosing image
        if (!id) id = gState.selectedImgId;

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

            // handle proper aspect ratio
            $(canvas).height($(canvas).width() / aspectRatio);

            $(window).resize(function () {
                $(canvas).height($(canvas).width() / aspectRatio);
            });

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
                var posY = (i === 0) ? fontSize * 0.8 : canvas.height - 10;

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

    /////////////////////////////////////// handle show-hide edit tools ///////////////////////////////////////////
    $(document).click(function () {
        $('.align').addClass('offset');
    });

    $('.btn-toolbar').click(function (e) {
        e.stopPropagation();
    });

    $('textarea').click(function (e) {
        e.stopPropagation();
    })

    // $('.top .tools').click(function (e) {
    //     e.stopPropagation();
    // });

    // $('.bottom textarea').focus(function (e) {
    //     // $('.bottom .main').removeClass('offset');
    //     var height = $(document).height();
    //     $('html, body').animate({ scrollTop: height }, 600);
    //     e.stopPropagation();
    // })

    // $('.bottom textarea').focusout(function(e) {
    //     $('.bottom .main').addClass('hidden');
    //     e.stopPropagation();
    // })

    /////////////////////////////////////// handle show-hide text align bar ///////////////////////////////////////////

    $('.top .more').click(function (e) {
        var $alignBar = $('.align');
        if (gState.alignBarFor === NONE) {
            gState.alignBarFor = TOP;
            $alignBar.removeClass('offset');
        } else if (gState.alignBarFor === TOP) {
            gState.alignBarFor = NONE;
            $alignBar.addClass('offset');
        } else if (gState.alignBarFor === BOTTOM) {
            gState.alignBarFor === TOP;
        }
        e.stopPropagation();
    });

    $('.bottom .more').click(function (e) {
        var $alignBar = $('.align');
        if (gState.alignBarFor === NONE) {
            gState.alignBarFor = BOTTOM;
            $alignBar.removeClass('offset');
        } else if (gState.alignBarFor === BOTTOM) {
            gState.alignBarFor = NONE;
            $alignBar.addClass('offset');
        } else if (gState.alignBarFor === TOP) {
            gState.alignBarFor === BOTTOM;
        }
        e.stopPropagation();
    });

    /////////////////////////////////////// update text-align /////////////////////////////////////////////
    $('[data-align]').click(function () {
        if (gState.alignBarFor === 'top') {
            gState.txts[0].align = $(this).attr('data-align');
        } else {
            gState.txts[1].align = $(this).attr('data-align');
        }
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

    ////////////////////////////////////////////////////////////////////////////////////////
    //                                  export image
    ////////////////////////////////////////////////////////////////////////////////////////
    $('.create-img').click(function () {
        var canvas = $('canvas')[0];
        window.location = canvas.toDataURL('image/jpg');
    });
}