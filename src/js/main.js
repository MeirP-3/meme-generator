'use strict'

var gSelectedImgUrl;

function createTagCloud() {

}

function filter() {

}

function showSearchBox() {
    var box = document.querySelector('.search-container input');
    if (box.classList.contains('hidden')) {
        box.classList.remove('hidden'); 
    } else {
        box.classList.add('hidden');
    }
    
}   