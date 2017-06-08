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

function toggleHeaderElements() {
    var elSearchBox = document.querySelector('.search-box');
    // var elNavBar = document.querySelector('.navigation');
    // var elTitle = document.querySelector('header .title');

    if (elSearchBox.classList.contains('hidden')) {
        elSearchBox.classList.remove('hidden');

    } else {
        elSearchBox.classList.add('hidden');
       
    }
}


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


// ------------------ NAVIGATION FUNCTION ------------------------

(function() {
  var toggle = document.querySelector("#flexy-nav__toggle");
  var nav = document.querySelector("#flexy-nav__items");
  toggle.addEventListener("click", function(e) {
    e.preventDefault();
    nav.classList.contains("flexy-nav__items--visible") ? nav.classList.remove("flexy-nav__items--visible") : nav.classList.add("flexy-nav__items--visible");
  });
})();
