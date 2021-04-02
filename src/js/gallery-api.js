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

    apiService.fetchArticles().then(hits => {
        clearGallery();
        addMarkup(hits)
    });
    
}

function onLoadmore() {
    apiService.fetchArticles().then(addMarkup);
    window.scrollTo(0, 1000);

    window.scrollTo({
      top: 3600,
      behavior: 'smooth',
    });
    
}
function addMarkup(hits) {
    refs.gallery.insertAdjacentHTML('beforeend', template(hits));

}

function clearGallery() {
    refs.gallery.innerHTML = '';
}