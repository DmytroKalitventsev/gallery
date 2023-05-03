'use strict'

class Gallery {
	#currentPic = 0;

	constructor(gallery) {
		this.gallery = document.querySelector(gallery);
	}

	get allPicture() {
		let temp = [];
		this.gallery.querySelectorAll('.gallery__pic').forEach(elem => {
			let obj = {};

			obj.url = elem.getAttribute('src');
			obj.title = elem.dataset.title;
			obj.descr = elem.dataset.description;

			temp.push(obj);
		});

		return temp;
	}

	get overlay() {
		return document.querySelector('.overlay');
	}

	get modalWindow() {
		return document.querySelector('.modal-gallery');
	}

	get modalToggleBtns() {
		return this.modalWindow.querySelector('.modal-gallery__toggle-btns');
	}

	get modalCloseBtn() {
		return this.modalWindow.querySelector('.modal-gallery__close');
	}

	get countPic() {
		return this.allPicture.length - 1;
	}

	generateModalWindow() {
		let str = `
				<div class="overlay" style="display: none;">
					<div class="modal-gallery">
						<div class="modal-gallery__pic-wrapper">
							<img class="modal-gallery__pic" src="" alt="picture">
						</div>
						<div class="modal-gallery__info">
							<div class="modal-gallery__close">
								<img class="modal-gallery__close-img" src="img/icon/close.svg" alt="close">
							</div>
							<div class="modal-gallery__text">
								<h2 class="modal-gallery__title"></h2>
								<div class="modal-gallery__decor">
									<span class="modal-gallery__elem-decor"></span>
									<span class="modal-gallery__elem-decor"></span>
									<span class="modal-gallery__elem-decor"></span>
								</div>
								<p class="modal-gallery__descr"></p>
							</div>
							<div class="modal-gallery__toggle-btns">
								<div class="modal-gallery__toggle-btn">
									<img class="modal-gallery__toggle-img modal-gallery__toggle-img_prev" src="img/icon/arrow.svg"
										alt="prev">
								</div>
								<div class="modal-gallery__toggle-btn">
									<img class="modal-gallery__toggle-img modal-gallery__toggle-img_next" src="img/icon/arrow.svg"
										alt="next">
								</div>
							</div>
						</div>
					</div>
				</div>`;

		document.body.insertAdjacentHTML('beforeend', str);
	}

	generateStyleModalWindow() {
		let str = `
				<style>
					.hidden {
						display: none;
					}
					.overlay {
						display: grid;
						justify-items: center;
						align-items: center;
						position: fixed;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						padding: 0 15px;
						background-color: rgba(0, 0, 0, 0.5);
					}
					.modal-gallery {
						display: grid;
						grid-template-columns: 2fr minmax(270px, 1fr);
						position: relative;
						max-width: 960px;
						overflow: hidden;
						background-color: #fff;
						box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
					
						@media (max-width: 600px) {
							grid-template: auto auto / auto;
						}
					}
					.modal-gallery__pic-wrapper {
						position: relative;
						padding: 0px 0px 67% 0px;
						overflow: hidden;
					
						@media (max-width: 600px) {
							order: 2;
						}
						@media (max-width: 430px) {
							padding: 0px 0px 100% 0px;
						}
					}
					.modal-gallery__pic {
						position: absolute;
						top: 0;
						left: 0;
						object-fit: cover;
					}
					.modal-gallery__info {
						display: grid;
						grid-template-rows: 1fr auto;
						padding: 45px;
					
						@media (max-width: 767.97px) {
							padding: 30px;
						}
						@media (max-width: 600px) {
							order: 1;
						}
					}
					.modal-gallery__close {
						position: absolute;
						top: 13px;
						right: 20px;
						height: 15px;
						cursor: pointer;
					}
					.modal-gallery__text {
						position: relative;
					}
					.modal-gallery__title {
						font-size: 1.3333rem;
						line-height: 1.16;
						text-transform: uppercase;
						max-height: 30px;
						overflow: hidden;
					
						@media (max-width: 767.97px) {
							font-size: 1.1111rem;
							max-height: 23px;
						}
					}
					.modal-gallery__decor {
						display: grid;
						align-items: center;
						grid-template-columns: minmax(100px, 1fr) 3fr auto;
						position: absolute;
						top: 45px;
						right: 0px;
						width: calc(145px + 100%);
					
						@media (max-width: 767.97px) {
							top: 35px;
							width: calc(130px + 100%);
						}
						@media (max-width: 600px) {
							top: 30px;
							right: 45px;
						}
					}
					.modal-gallery__elem-decor {
						background-color: #ffad00;
						height: 9px;
					}
					.modal-gallery__elem-decor:last-child {
						width: 8px;
						margin-left: 8px;
					}
					.color-elem .modal-gallery__elem-decor:first-child {
						background-color: #fff;
					}
					.modal-gallery__descr {
						margin-top: 70px;
						line-height: 1.23;
						max-height: 355px;
						overflow: hidden;
					
						@media (max-width: 767.97px) {
							font-size: 0.8889rem;
							max-height: 235px;
							margin-top: 50px;
						}
						@media (max-width: 600px) {
							max-height: 140px;
							margin-top: 40px;
						}
					}
					.modal-gallery__toggle-btns {
						display: grid;
						justify-content: end;
						justify-items: end;
						grid-template-columns: repeat(2, minmax(65px, auto));
						margin-top: 40px;
					
						@media (max-width: 767.97px) {
							margin-top: 30px;
						}
					}
					.modal-gallery__toggle-btn {
						height: 24px;
						cursor: pointer;
					}
					.modal-gallery__toggle-img_prev {
						transform: rotate(180deg);
					}

					${this.generateStyleAnimate()}
				</style>`;

		document.head.insertAdjacentHTML('beforeend', str)
	}

	generateStyleAnimate() {
		let str = `
				.animate {
					animation-duration: 0.6s;
					animation-fill-mode: forwards;
				}
				.time-switching {
					animation-duration: 0.7s;
				}
				.animate_fade-in {
					animation-name: fadeIn;
				}
				@keyframes fadeIn {
					from {
						background-color: rgba(0, 0, 0, 0);
					}
					to {
						background-color: rgba(0, 0, 0, 0.5);
					}
				}
				.animate_fade-out {
					animation-name: fadeOut;
				}
				@keyframes fadeOut {
					from {
						background-color: rgba(0, 0, 0, 0.5);
					}
					to {
						background-color: rgba(0, 0, 0, 0);
					}
				}
				.animate_in-up {
					animation-name: slideInUp;
				}
				@keyframes slideInUp {
					from {
						transform: translate3d(0, 200%, 0);
					}
					to {
						transform: translate3d(0, 0, 0);
					}
				}
				.animate_out-down {
					animation-name: slideOutDown;
				}
				@keyframes slideOutDown {
					from {
						transform: translate3d(0, 0, 0);
					}
					to {
						transform: translate3d(0, 200%, 0);
					}
				}
				.animate_in-left {
					animation-name: slideInLeft;
				}
				@keyframes slideInLeft {
					from {
						transform: translate3d(-200%, 0, 0);
					}
					to {
						transform: translate3d(0, 0, 0);
					}
				}
				.animate_in-right {
					animation-name: slideInRight;
				}
				@keyframes slideInRight {
					from {
						transform: translate3d(200%, 0, 0);
					}
					to {
						transform: translate3d(0, 0, 0);
					}
				}`;

		return str;
	}

	openModalWindow(event) {
		const targetPic = event.target.closest('img');

		if (targetPic) {
			this.#currentPic = this.allPicture.findIndex(picture => picture.url === targetPic.getAttribute('src'));

			this.fillContent(this.#currentPic);

			this.animateOpen();
		}
	}

	animateOpen() {
		this.overlay.style.display = null;
		this.overlay.classList.add('animate');
		this.overlay.classList.add('animate_fade-in');
		this.modalWindow.classList.add('animate');
		this.modalWindow.classList.add('animate_in-up');

		setTimeout(() => {
			this.overlay.classList.remove('animate_fade-in');
			this.modalWindow.classList.remove('animate_in-up');
		}, 600);
	}

	closeModalWindow(event) {
		if (event.target.matches('.overlay') || event.target.matches('.modal-gallery__close-img')) {
			event.stopPropagation();

			this.animateClose();
		}
	}

	animateClose() {
		this.overlay.classList.add('animate_fade-out');
		this.modalWindow.classList.add('animate_out-down');

		setTimeout(() => {
			this.overlay.style.display = 'none';
			this.overlay.classList.remove('animate');
			this.overlay.classList.remove('animate_fade-out');
			this.modalWindow.classList.remove('animate');
			this.modalWindow.classList.remove('animate_out-down');
		}, 600);
	}

	fillContent(indexPic) {
		indexPic = (indexPic < 0) ? indexPic = 0 : indexPic;
		indexPic = (indexPic > this.countPic) ? indexPic = this.countPic : indexPic;

		const url = this.allPicture[indexPic].url;
		const title = this.allPicture[indexPic].title;
		const descr = this.allPicture[indexPic].descr;

		this.modalWindow.querySelector('.modal-gallery__pic').setAttribute('src', url);
		this.modalWindow.querySelector('.modal-gallery__title').innerText = title;
		this.modalWindow.querySelector('.modal-gallery__descr').innerText = descr;
		(indexPic === 0) ? this.modalWindow.classList.add('color-elem') : this.modalWindow.classList.remove('color-elem');
		
		this.#currentPic = indexPic;

		this.showModalBtns(indexPic);
	}

	showModalBtns(indexPic) {
		const prevBtn = this.modalWindow.querySelector('.modal-gallery__toggle-img_prev');
		const nextBtn = this.modalWindow.querySelector('.modal-gallery__toggle-img_next');

		(indexPic === 0) ? prevBtn.classList.add('hidden') : prevBtn.classList.remove('hidden');
		(indexPic === this.countPic) ? nextBtn.classList.add('hidden') : nextBtn.classList.remove('hidden');
	}

	changeContent(event) {
		if (event.target.matches('.modal-gallery__toggle-img_prev')) {
			this.fillContent(this.#currentPic - 1);

			this.modalWindow.classList.add('time-switching');
			this.modalWindow.classList.add('animate_in-left');

			setTimeout(() => {
				this.modalWindow.classList.remove('time-switching');
				this.modalWindow.classList.remove('animate_in-left');
			}, 700);
		}

		if (event.target.matches('.modal-gallery__toggle-img_next')) {
			this.fillContent(this.#currentPic + 1);
			
			this.modalWindow.classList.add('time-switching');
			this.modalWindow.classList.add('animate_in-right');

			setTimeout(() => {
				this.modalWindow.classList.remove('time-switching');
				this.modalWindow.classList.remove('animate_in-right');
			}, 700);
		}
	}

	init() {
		this.generateModalWindow();
		this.generateStyleModalWindow();
		this.overlay;
		this.modalWindow;

		this.gallery.classList.add('hover-effect');
		this.gallery.addEventListener('click', this.openModalWindow.bind(this));
		this.overlay.addEventListener('click', this.closeModalWindow.bind(this));
		this.modalCloseBtn.addEventListener('click', this.closeModalWindow.bind(this));
		this.modalToggleBtns.addEventListener('click', this.changeContent.bind(this));
	}
}

const gallery = new Gallery('.gallery__items');

gallery.init();