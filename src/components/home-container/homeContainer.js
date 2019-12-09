import SearchBar from '../search-bar/searchBar'
import MovieComponent from '../movie-component/MovieComponent'

export default class HomeContainer extends HTMLElement {
	constructor() {
		super()

		this.shadowObj = this.attachShadow({mode: 'open'})

		//this.shownSection = 1;
		this.registerOtherComponent()

		this.status = {
			loading: false,
			success: false,
			error: false
		};
		this.render();
	
	}

	registerOtherComponent() {
		if (typeof customElements.get('search-bar') === 'undefined') {
	      customElements.define('search-bar', SearchBar);
	    }
	    if (typeof customElements.get('movie-component') === 'undefined') {
	      customElements.define('movie-component', MovieComponent);
	    }
	}

	connectedCallback() {
	    this.shadowObj.querySelector('search-bar')
	    	.addEventListener('search-success', (e) => {
		      this.handleSuccess(e.detail.data);
		 })  

	     this.shadowObj.querySelector('search-bar')
	    	.addEventListener('search-started', (e) => {
		      this.handleSearchData('start');
		 })

	    this.shadowObj.querySelector('search-bar')
	    	.addEventListener('search-fail', (e) => {
		      this.handleError(e.detail.data);
		 })
	}

	handleSearchData(data){
		this.status.loading = true
		this.status = {...this.status, loading: true}
		this.reRenderContentSection()

	}

	handleSuccess(e){
		//only retrieve the top 2 results
		const results = e.length >= 2 ?e.slice(0,2) : e

		this.status = {...this.status, success: true, loading:false, data: results }
	
		this.reRenderContentSection()
	}

	renderMovies(moviesArray) {
		let movies;
		if (moviesArray.length > 0) {
			movies = moviesArray.map((value,index) => {
				return `
					<movie-component 
						 class="movie-component__container"
						 movieUrl=""
						 imageUrl="https://image.tmdb.org/t/p/w200${value.poster_path}">
					</movie-component>`
			})
		} else {
			return -1
		}

		return movies.join('')

	}

	handleError(e){
		console.log('search  error event',e)
		this.status = {...this.status, success: false, loading:false, error: true}
		this.reRenderContentSection(e)
	}

	render() {
	  this.shadowObj.innerHTML = this.getTemplate();
	}

	reRenderContentSection() {
		this.shadowObj.querySelector('.search-content').innerHTML = 
        this.getContent(this.status);
	}

	getContent(status) {
		//TODO HANDLE CASE: NO MOVIES FOUND
    	return status.loading ? `<div class="loader">...Loading</div>`:
    	status.error ? `<h1>Something went wrong....Try again </h1>`:
    	status.success ? `${this.renderMovies(status.data)}`:''
    }

	getTemplate() {
	  return `
	    <div class="search-container__container">
	    	<search-bar></search-bar>
	    	<div class="search-content">
	    		${this.getContent(this.status)}
	    	</div>	    	
	    </div>
	    ${this.getStyle()}
	  `;
	}

	getStyle() {
	  return `
	    <style>
	    	:host {

	    	}
	    	.search-content {
	    		display:flex;
	    		flex-wrap:wrap;
	    		justify-content:space-evenly;
	    		margin-top:5em;
	    	}
	    	.loader {
			  margin: 100px auto;
			  font-size: 25px;
			  width: 1em;
			  height: 1em;
			  border-radius: 50%;
			  position: relative;
			  text-indent: -9999em;
			  -webkit-animation: load5 1.1s infinite ease;
			  animation: load5 1.1s infinite ease;
			  -webkit-transform: translateZ(0);
			  -ms-transform: translateZ(0);
			  transform: translateZ(0);
			}
			@-webkit-keyframes load5 {
			  0%,
			  100% {
			    box-shadow: 0em -2.6em 0em 0em #1a199a, 1.8em -1.8em 0 0em rgba(26,25,154, 0.2), 2.5em 0em 0 0em rgba(26,25,154, 0.2), 1.75em 1.75em 0 0em rgba(26,25,154, 0.2), 0em 2.5em 0 0em rgba(26,25,154, 0.2), -1.8em 1.8em 0 0em rgba(26,25,154, 0.2), -2.6em 0em 0 0em rgba(26,25,154, 0.5), -1.8em -1.8em 0 0em rgba(26,25,154, 0.7);
			  }
			  12.5% {
			    box-shadow: 0em -2.6em 0em 0em rgba(26,25,154, 0.7), 1.8em -1.8em 0 0em #1a199a, 2.5em 0em 0 0em rgba(26,25,154, 0.2), 1.75em 1.75em 0 0em rgba(26,25,154, 0.2), 0em 2.5em 0 0em rgba(26,25,154, 0.2), -1.8em 1.8em 0 0em rgba(26,25,154, 0.2), -2.6em 0em 0 0em rgba(26,25,154, 0.2), -1.8em -1.8em 0 0em rgba(26,25,154, 0.5);
			  }
			  25% {
			    box-shadow: 0em -2.6em 0em 0em rgba(26,25,154, 0.5), 1.8em -1.8em 0 0em rgba(26,25,154, 0.7), 2.5em 0em 0 0em #1a199a, 1.75em 1.75em 0 0em rgba(26,25,154, 0.2), 0em 2.5em 0 0em rgba(26,25,154, 0.2), -1.8em 1.8em 0 0em rgba(26,25,154, 0.2), -2.6em 0em 0 0em rgba(26,25,154, 0.2), -1.8em -1.8em 0 0em rgba(26,25,154, 0.2);
			  }
			  37.5% {
			    box-shadow: 0em -2.6em 0em 0em rgba(26,25,154, 0.2), 1.8em -1.8em 0 0em rgba(26,25,154, 0.5), 2.5em 0em 0 0em rgba(26,25,154, 0.7), 1.75em 1.75em 0 0em #1a199a, 0em 2.5em 0 0em rgba(26,25,154, 0.2), -1.8em 1.8em 0 0em rgba(26,25,154, 0.2), -2.6em 0em 0 0em rgba(26,25,154, 0.2), -1.8em -1.8em 0 0em rgba(26,25,154, 0.2);
			  }
			  50% {
			    box-shadow: 0em -2.6em 0em 0em rgba(26,25,154, 0.2), 1.8em -1.8em 0 0em rgba(26,25,154, 0.2), 2.5em 0em 0 0em rgba(26,25,154, 0.5), 1.75em 1.75em 0 0em rgba(26,25,154, 0.7), 0em 2.5em 0 0em #1a199a, -1.8em 1.8em 0 0em rgba(26,25,154, 0.2), -2.6em 0em 0 0em rgba(26,25,154, 0.2), -1.8em -1.8em 0 0em rgba(26,25,154, 0.2);
			  }
			  62.5% {
			    box-shadow: 0em -2.6em 0em 0em rgba(26,25,154, 0.2), 1.8em -1.8em 0 0em rgba(26,25,154, 0.2), 2.5em 0em 0 0em rgba(26,25,154, 0.2), 1.75em 1.75em 0 0em rgba(26,25,154, 0.5), 0em 2.5em 0 0em rgba(26,25,154, 0.7), -1.8em 1.8em 0 0em #1a199a, -2.6em 0em 0 0em rgba(26,25,154, 0.2), -1.8em -1.8em 0 0em rgba(26,25,154, 0.2);
			  }
			  75% {
			    box-shadow: 0em -2.6em 0em 0em rgba(26,25,154, 0.2), 1.8em -1.8em 0 0em rgba(26,25,154, 0.2), 2.5em 0em 0 0em rgba(26,25,154, 0.2), 1.75em 1.75em 0 0em rgba(26,25,154, 0.2), 0em 2.5em 0 0em rgba(26,25,154, 0.5), -1.8em 1.8em 0 0em rgba(26,25,154, 0.7), -2.6em 0em 0 0em #1a199a, -1.8em -1.8em 0 0em rgba(26,25,154, 0.2);
			  }
			  87.5% {
			    box-shadow: 0em -2.6em 0em 0em rgba(26,25,154, 0.2), 1.8em -1.8em 0 0em rgba(26,25,154, 0.2), 2.5em 0em 0 0em rgba(26,25,154, 0.2), 1.75em 1.75em 0 0em rgba(26,25,154, 0.2), 0em 2.5em 0 0em rgba(26,25,154, 0.2), -1.8em 1.8em 0 0em rgba(26,25,154, 0.5), -2.6em 0em 0 0em rgba(26,25,154, 0.7), -1.8em -1.8em 0 0em #1a199a;
			  }
			}
			@keyframes load5 {
			  0%,
			  100% {
			    box-shadow: 0em -2.6em 0em 0em #1a199a, 1.8em -1.8em 0 0em rgba(26,25,154, 0.2), 2.5em 0em 0 0em rgba(26,25,154, 0.2), 1.75em 1.75em 0 0em rgba(26,25,154, 0.2), 0em 2.5em 0 0em rgba(26,25,154, 0.2), -1.8em 1.8em 0 0em rgba(26,25,154, 0.2), -2.6em 0em 0 0em rgba(26,25,154, 0.5), -1.8em -1.8em 0 0em rgba(26,25,154, 0.7);
			  }
			  12.5% {
			    box-shadow: 0em -2.6em 0em 0em rgba(26,25,154, 0.7), 1.8em -1.8em 0 0em #1a199a, 2.5em 0em 0 0em rgba(26,25,154, 0.2), 1.75em 1.75em 0 0em rgba(26,25,154, 0.2), 0em 2.5em 0 0em rgba(26,25,154, 0.2), -1.8em 1.8em 0 0em rgba(26,25,154, 0.2), -2.6em 0em 0 0em rgba(26,25,154, 0.2), -1.8em -1.8em 0 0em rgba(26,25,154, 0.5);
			  }
			  25% {
			    box-shadow: 0em -2.6em 0em 0em rgba(26,25,154, 0.5), 1.8em -1.8em 0 0em rgba(26,25,154, 0.7), 2.5em 0em 0 0em #1a199a, 1.75em 1.75em 0 0em rgba(26,25,154, 0.2), 0em 2.5em 0 0em rgba(26,25,154, 0.2), -1.8em 1.8em 0 0em rgba(26,25,154, 0.2), -2.6em 0em 0 0em rgba(26,25,154, 0.2), -1.8em -1.8em 0 0em rgba(26,25,154, 0.2);
			  }
			  37.5% {
			    box-shadow: 0em -2.6em 0em 0em rgba(26,25,154, 0.2), 1.8em -1.8em 0 0em rgba(26,25,154, 0.5), 2.5em 0em 0 0em rgba(26,25,154, 0.7), 1.75em 1.75em 0 0em #1a199a, 0em 2.5em 0 0em rgba(26,25,154, 0.2), -1.8em 1.8em 0 0em rgba(26,25,154, 0.2), -2.6em 0em 0 0em rgba(26,25,154, 0.2), -1.8em -1.8em 0 0em rgba(26,25,154, 0.2);
			  }
			  50% {
			    box-shadow: 0em -2.6em 0em 0em rgba(26,25,154, 0.2), 1.8em -1.8em 0 0em rgba(26,25,154, 0.2), 2.5em 0em 0 0em rgba(26,25,154, 0.5), 1.75em 1.75em 0 0em rgba(26,25,154, 0.7), 0em 2.5em 0 0em #1a199a, -1.8em 1.8em 0 0em rgba(26,25,154, 0.2), -2.6em 0em 0 0em rgba(26,25,154, 0.2), -1.8em -1.8em 0 0em rgba(26,25,154, 0.2);
			  }
			  62.5% {
			    box-shadow: 0em -2.6em 0em 0em rgba(26,25,154, 0.2), 1.8em -1.8em 0 0em rgba(26,25,154, 0.2), 2.5em 0em 0 0em rgba(26,25,154, 0.2), 1.75em 1.75em 0 0em rgba(26,25,154, 0.5), 0em 2.5em 0 0em rgba(26,25,154, 0.7), -1.8em 1.8em 0 0em #1a199a, -2.6em 0em 0 0em rgba(26,25,154, 0.2), -1.8em -1.8em 0 0em rgba(26,25,154, 0.2);
			  }
			  75% {
			    box-shadow: 0em -2.6em 0em 0em rgba(26,25,154, 0.2), 1.8em -1.8em 0 0em rgba(26,25,154, 0.2), 2.5em 0em 0 0em rgba(26,25,154, 0.2), 1.75em 1.75em 0 0em rgba(26,25,154, 0.2), 0em 2.5em 0 0em rgba(26,25,154, 0.5), -1.8em 1.8em 0 0em rgba(26,25,154, 0.7), -2.6em 0em 0 0em #1a199a, -1.8em -1.8em 0 0em rgba(26,25,154, 0.2);
			  }
			  87.5% {
			    box-shadow: 0em -2.6em 0em 0em rgba(26,25,154, 0.2), 1.8em -1.8em 0 0em rgba(26,25,154, 0.2), 2.5em 0em 0 0em rgba(26,25,154, 0.2), 1.75em 1.75em 0 0em rgba(26,25,154, 0.2), 0em 2.5em 0 0em rgba(26,25,154, 0.2), -1.8em 1.8em 0 0em rgba(26,25,154, 0.5), -2.6em 0em 0 0em rgba(26,25,154, 0.7), -1.8em -1.8em 0 0em #1a199a;
			  }
			}
	    </style>
	  `;
	}

}