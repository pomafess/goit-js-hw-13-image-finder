import ApiService from './api-service.js'
import template from '../templates/photo-card.hbs'
const refs = {
    searchForm: document.querySelector('#search-form'),
    gallery: document.querySelector('.js-gallery'),
    loadMoreBtn: document.querySelector('.load-btn'),
}
const apiService = new ApiService();
// const input = document.querySelector('[name="query"]');

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadmore);

function onSearch(e) {
    e.preventDefault();

    apiService.query = e.currentTarget.elements.query.value;
    apiService.resetPage();

    apiService.fetchArticles().then(addMarkup);
    
}

function onLoadmore() {
    apiService.fetchArticles().then(addMarkup);
    
}
function addMarkup(hits) {
    refs.gallery.insertAdjacentHTML('beforeend', template(hits));

}