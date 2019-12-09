export default class NavBar extends HTMLElement {
	constructor() {
		super()

		this.shadowObj = this.attachShadow({mode: 'open'})

		this.render()
	}



	render() {
		this.shadowObj.innerHTML = this.getTemplate();
	}

	getTemplate() {
		return `
		
				<ul class="nav-bar__ul">
					<li class="nav-bar__li">
						<a href="#home">Home</a>
					</li>
					<li class="nav-bar__li">
						<a href="#watchlist">WatchList</a>
					</li>
				</ul>
		
			${this.getStyle()}
		`
	}

	getStyle() {
		return `
			<style>
			  :host {
				display: block;
				top: 0;
				//background: #90bbe0;
				background:#96b9d6;
				position: sticky;
				height: 75px;
			 }
			.nav-bar__ul {
				display: flex;
				margin:0;
				justify-content: flex-end;
				height: 100%;
				
			}
			.nav-bar__li {
				list-style-type: none;
				align-self: center;
				margin-right: 25px;
				align-self: center;
			}

			.nav-bar__li a {
				color: #1F1F1F;
				text-decoration: none;
				font-size: 1.2rem;
			}
			</style>
		`
	}


}