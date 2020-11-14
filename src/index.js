import "./css/common.css";
import 'core-js';
import ImageApiService from './js/apiService';
import imagesTpl from './templates/images.hbs';
import LoadMoreButton from './js/load-more-btn';
import { onOpenModal } from './js/modal';
import { info } from "@pnotify/core";
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const refs = {
    searchForm: document.querySelector('.js-search-form'),
    galleryContainer: document.querySelector('.js-gallery'),
}
const loadMoreButton = new LoadMoreButton({
    selector: '[data-action="load-more"]',
    hidden: true,
});
const imageApiService = new ImageApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreButton.refs.button.addEventListener('click', fetchImages);

refs.galleryContainer.addEventListener('click', onOpenModal);

function onSearch (e) {
    e.preventDefault();

    imageApiService.query = e.currentTarget.elements.query.value;
    
    // проверка на пустую строку
    if (imageApiService.query === '') {
        return emptyStringAlert();
    }

    loadMoreButton.show();
    imageApiService.resetPage();
    clearGalleryContainer();
    fetchImages();
}
    
function fetchImages() {
    loadMoreButton.disable();
    imageApiService.asyncFetchImages().then(hits => {
        appendImagesMarkup(hits);
        loadMoreButton.enable();
        window.scrollTo({
            top: refs.galleryContainer.offsetHeight,
            left: 0,
            behavior: 'smooth',
        })
    })
}

function appendImagesMarkup (hits) {
    refs.galleryContainer.insertAdjacentHTML('beforeend', imagesTpl(hits));
}

function clearGalleryContainer () {
    refs.galleryContainer.innerHTML = '';
}

function emptyStringAlert(){
    info({
        title: 'No tag!',
        text: 'Please, specify your request!',
        delay: 5000,
        closerHover: true,
    })
}