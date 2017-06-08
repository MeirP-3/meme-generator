'use strict'

var EDITOR_LINK = 'app.html';

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

$(document).ready(init);

function init() {
    renderItems();
    $('.item-container').click(function () {
        var id = this.id;
        localStorage.setItem('id', id)
        window.location = EDITOR_LINK;
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
    item.id = `img-${i + 1}`;
    $('.items-wraper').append(item);
}

function renderTagCloud() {

}

