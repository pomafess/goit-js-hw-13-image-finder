import ApiService from './api-service.js'
import template from '../templates/photo-card.hbs'
import * as basicLightbox from 'basiclightbox'
import 'basicLightbox/dist/basicLightbox.min.css'
import '@pnotify/core/dist/BrightTheme.css';
const { error } = require('@pnotify/core');

const refs = {
    searchForm: document.querySelector('#search-form'),
    gallery: document.querySelector('.js-gallery'),
    loadMoreBtn: document.querySelector('.load-btn'),
}
const apiService = new ApiService();
// const input = document.querySelector('[name="query"]');

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadmore);
refs.gallery.addEventListener('click', function (e) {
if(e.target.dataset.source){   const instance = basicLightbox.create(`
    <img src="${e.target.dataset.source}" width="800" height="600">
`)

instance.show()}
 
})
function onSearch(e) {
    e.preventDefault();

    apiService.query = e.currentTarget.elements.query.value;
    apiService.resetPage();

    apiService.fetchArticles().then(hits => {
        if(!hits.length){error({
            text: "Не найдено!",
            delay: 600,
            hide: true,
        })}
        clearGallery();
        addMarkup(hits)
    });
    
}

function onLoadmore() {
    const lastChild = document.querySelector('.js-gallery .list-item:last-child')
    apiService.fetchArticles().then(result => {
        addMarkup(result);
         if (lastChild)
    {
        window.scrollTo({
            top: lastChild.offsetTop + 354,
            behavior: 'smooth',
        });
    }
    });
    
   
}
function addMarkup(hits) {
    refs.gallery.insertAdjacentHTML('beforeend', template(hits));

}

function clearGallery() {
    refs.gallery.innerHTML = '';
}