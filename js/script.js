'use strict'

class Gallery {
	#currentPic = 0;

	constructor(gallery) {
		this.gallery = document.querySelector(gallery);
	}

	get allPicture() {
		let temp = [];
		this.gallery.querySelectorAll('img').forEach(elem => {
			let obj = {};

			obj.url = elem.getAttribute('src');
			obj.title = elem.dataset.title;
			obj.descr = elem.dataset.description;

			temp.push(obj);
		});
		return temp;
	}

	get modalWindow() {
		return document.querySelector('.modal');
	}

	get overlay() {
		return document.querySelector('.overlay');
	}

	get modalBtns() {
		return this.modalWindow.querySelector('.btn');
	}

	get closeBtn() {
		return this.modalWindow.querySelector('.close');
	}

	get countPic() {
		return this.allPicture.length - 1;
	}
	
	generateModalWindow() {
		let str = `
				<div class="overlay none">
					<div class="modal">
						<img src="" alt="img">
						<div class="text">
							<h2></h2>
							<p></p>
							<div class="btn">
								<button class="btn__prev">&lt;</button>
								<button class="btn__next">&gt;</button>
							</div>
						</div>
						<div class="close">
							<span class="close__item"></span>
						</div>
					</div>
				</div>`;

		document.body.insertAdjacentHTML('beforeend', str)
	}

	generateStyle() {
		let str = `
				<style>
					.overlay {
						position: fixed;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						background-color: rgba(0, 0, 0, 0.8);
						display: flex;
						justify-content: center;
						align-items: center;
					}
					
					.modal {
						position: relative;
						width: 960px;
						height: 427px;
						overflow: hidden;
						background-color: #fff;
						box-shadow: 0 0 10px #000;
						display: flex;
					}
					
					.modal img {
						width: 630px;
						flex: 0 0 630px;
					}
					
					.text {
						padding: 44px;
						display: flex;
						flex-direction: column;
						justify-content: space-around;
					}

					.text h2 {
						font-size: 24px;
						text-transform: uppercase;
					}

					.text p {
						font-size: 18px;
						line-height: 1.23;
					}
					
					.none {
						display: none;
					}
					
					button {
						padding: 20px;
					}
					
					.btn {
						position: relative;
					}
					
					.btn__prev, .btn__next {
						position: absolute;
						top: -20px;
					}
					
					.btn__prev {
						right: 25%;
					}
					
					.btn__next {
						right: 0%;
					}

					.close {
						display: flex;
						justify-content: center;
						align-items: center;
						flex-direction: column;
						flex: 0 0 50px;
						position: absolute;
						top: 5px;
						right: 5px;
						width: 40px;
						height: 40px;
						border-radius: 15px;
						transition: background-color 0.3s ease 0s;
						cursor: pointer;
					}
					
					.close__item,
					.close::before {
						content: "";
						position: absolute;
						width: 60%;
						height: 2px;
						border-radius: 20px;
						background: #C4C4C4;
						transition: transform 0.3s ease 0s;
					}
					
					.close::before {
						transform: rotate(45deg);
					}
					
					.close__item {
						transform: rotate(-45deg);
					}
				</style>`;

		document.head.insertAdjacentHTML('beforeend', str)
	}

	openModalWindow(event) {
		const targetPic = event.target.closest('img');

		if (targetPic) {
			this.#currentPic = this.allPicture.findIndex(picture => picture.url === targetPic.getAttribute('src'));

			this.fillContent(this.#currentPic);

			this.overlay.classList.remove('none');
		}
	}

	closeModalWindow(event) {
		if (event.target.matches('.overlay') || event.target.matches('.close')) {
			event.stopPropagation();

			this.overlay.classList.add('none');
		}
	}

	fillContent(indexPic) {
		indexPic = (indexPic < 0) ? indexPic = 0 : indexPic;
		indexPic = (indexPic > this.countPic) ? indexPic = this.countPic : indexPic;

		const url = this.allPicture[indexPic].url;
		const title = this.allPicture[indexPic].title;
		const descr = this.allPicture[indexPic].descr;

		this.modalWindow.querySelector('img').setAttribute('src', url);
		this.modalWindow.querySelector('h2').innerText = title;
		this.modalWindow.querySelector('p').innerText = descr;

		this.#currentPic = indexPic;

		this.showModalBtns(indexPic);
	}

	showModalBtns(indexPic) {
		const prevBtn = this.modalWindow.querySelector('.btn__prev');
		const nextBtn = this.modalWindow.querySelector('.btn__next');

		(indexPic === 0) ? prevBtn.classList.add('none') : prevBtn.classList.remove('none');
		(indexPic === this.countPic) ? nextBtn.classList.add('none') : nextBtn.classList.remove('none');
	}

	changeContent(event) {
		if (event.target.matches('.btn__prev')) {
			this.fillContent(this.#currentPic - 1);
		}

		if (event.target.matches('.btn__next')) {
			this.fillContent(this.#currentPic + 1);
		}
	}

	init() {
		this.generateModalWindow();
		this.generateStyle();
		this.overlay;
		this.modalWindow;

		this.gallery.classList.add('hover-effect');
		this.gallery.addEventListener('click', this.openModalWindow.bind(this));
		this.closeBtn.addEventListener('click', this.closeModalWindow.bind(this));
		this.overlay.addEventListener('click', this.closeModalWindow.bind(this));
		this.modalBtns.addEventListener('click', this.changeContent.bind(this));
	}
}

const gallery = new Gallery('.gallery__items');

gallery.init();