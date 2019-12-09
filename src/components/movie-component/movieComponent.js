export default class MovieComponent extends HTMLElement {
  constructor() {
    super();

    this.imageUrl = this.getAttribute('imageUrl');

    this.movieUrl = this.getAttribute('movieUrl');

    this.shadowObj = this.attachShadow({mode: 'open'});

    this.render();
  }

	render() {
  		this.shadowObj.innerHTML = this.getTemplate()
  	}

  	getTemplate() {
	  	return `
		    <a href="${this.movieUrl}">
		      <img class="movie-component__image"
		        src="${this.imageUrl}" />
		    </a>
		    ${this.getStyle()}
		  `;
	}

	getStyle() {
	  return `
	    <style>
	      :host {
	        display: block;
	      }
	      .movie-component__image {
	        height: 350px;
	      }
	    </style>
	  `;
	}

}