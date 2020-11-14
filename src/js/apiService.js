import { error } from "@pnotify/core";
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const API_KEY = '18993455-a304b75c58fb6c345b4521260';
const BASE_URL = 'https://pixabay.com/api';

export default class ImagesApiService{
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async asyncFetchImages() {
        try {
        console.log('перед запросом', this);
        
        const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
        const response = await fetch(url);
        const newHits = await response.json();
            
        // throw new Error('qweqwe'); // для проверки ошибки

        this.incremenetPage();
        return newHits.hits;
        } catch (error) {
            this.showError();
        }
    }

    showError() {
        error({
            title: 'Oops...',
            text: 'Some error happened while fetch',
            delay: 5000,
            closerHover: true,
        })
    }


    incremenetPage() {
        this.page += 1;
    }
    resetPage() {
        this.page = 1;
    }
    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}