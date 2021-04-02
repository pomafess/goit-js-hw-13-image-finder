export default class ApiService  {
    constructor(){
        this.searchQuery = '';
        this.page = 1;
    }
    fetchArticles() {
        console.log(this);
        const API_KEY = "20957538-039948fc53da0772e609db9c3";
        const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.incrementPage()
            return data.hits;
        });
    }
    incrementPage() {
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
