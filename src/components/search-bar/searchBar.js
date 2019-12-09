import "regenerator-runtime/runtime";
import {movieSearchKey} from '../config/default.json'

export default class SearchBar extends HTMLElement {
  constructor() {

    super();

    this.key = movieSearchKey
 
    this.searchUrl = 'https://api.themoviedb.org/3/search/movie/';

    this.shadowObj = this.attachShadow({mode: 'open'});

    this.render();
    this.dispatchSearchSuccessEvent = this.dispatchSearchSuccessEvent.bind(this)
    this.dispatchSearchFailEvent = this.dispatchSearchFailEvent.bind(this)
  }

  render() {
	  this.shadowObj.innerHTML = this.getTemplate();
	}

	connectedCallback() {
	  this.shadowObj.querySelector('button')
	    .addEventListener('click', (e) => {
	      this.dispatchSearchEvent()
	      this.handleSearch();
	    });
	}

	dispatchSearchEvent() {
		this.dispatchEvent(new CustomEvent('search-started', {
		    bubbles: true,
		 }));
	}


	dispatchSearchSuccessEvent(data) {
		this.dispatchEvent(new CustomEvent('search-success', {
		    detail: {
		      data: data,
		    },
		    bubbles: true,
		 }));
	}

	dispatchSearchFailEvent(data) {
		this.dispatchEvent(new CustomEvent('search-fail', {
		    detail: {
		      data: data,
		    },
		    bubbles: true,
		 }));
	}

	async createRequest (url, succeed, fail) { 
		try {
			const response = await fetch(url)	
			const json = await response.json();
			succeed(json.results)
		} catch (error) {
			fail(error)
		}

	}

	handleSearch() {
		//TODO: INPUT VALIDATION
		let value = this.shadowObj.querySelector('input').value;

		const SEARCH_URL = `${this.searchUrl}?api_key=${this.key}&query=${value}&include_adult=false`
		const ERROR_URL = `https://api.themoviedb.org/?api_key=${this.key}&query=${value}&include_adult=false`
		
		this.createRequest(SEARCH_URL,this.dispatchSearchSuccessEvent, this.dispatchSearchFailEvent)

		this.shadowObj.querySelector('input').value = ''
	}

	getTemplate() {
	  return `
	    <div class="search-bar__container">
	      <input type="text"
	        class="search-bar__search-field"
	        placeholder="Enter Search Text Here">
	      <button class="search-bar__button">Search</button>
	    </div>
	    ${this.getStyle()}
	  `;
	}

	getStyle() {
	  return `
	    <style>
	      :host {
	        display: block;
	      }
	      .search-bar__container {
	        display: flex;
	        margin: 0 2em 0 2em;
	      }
	      .search-bar__search-field {
	        flex: 1;
	        margin: 10px;
	        height: 50px;
	        font-size: 18px;
	        padding: 10px;
	        border-radius: 5px;
	        border: none;
	        color: #8e8e8e;
	      }
	      .search-bar__button {
	        margin: 10px;
	        width: 200px;
	        border: none;
	        font-size: 18px;
	        color: white;
	        cursor: pointer;
	        background: #000080;

	      }
	      .search-bar__button:hover {
	        background: #ffff00;
	        color:#000080;
	      }
	    </style>
	  `;
	}

}