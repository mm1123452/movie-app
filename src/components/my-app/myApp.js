import NavBar from '../nav-bar/navbar'
import HomeContainer from '../home-container/HomeContainer'

export default class MyApp extends HTMLElement {
	constructor() {
		super()

		this.shadowObj = this.attachShadow({mode: 'open'})

		this.shownSection = 1;

		this.registerOtherComponent()

		this.render()
	}

	registerOtherComponent() {
		if (typeof customElements.get('nav-bar') === 'undefined') {
	      customElements.define('nav-bar', NavBar);
	    }

	    if (typeof customElements.get('home-container') === 'undefined') {
	      customElements.define('home-container', HomeContainer);
	    }
	}

	getSection(section) {
      switch(section) {
        case 1:
          return `
            <home-container></home-container>
          `;
      }
    }

	render() {
		this.shadowObj.innerHTML = this.getTemplate()
	}

	getTemplate() {
		return `
			<nav-bar></nav-bar>
			<div class="app-section">
		        ${this.getSection(this.shownSection)}
		    </div>
			${this.getStyle()}
		`
	}

	getStyle() {
		return `
			<style>
				:host {

				}
				.app-section {
					height: 100vh;
				}
			
			</style>
		`
	}
}