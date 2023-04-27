'use strict'

class Gallery {
	constructor(gallery) {
		this.gallery = gallery;
		this.currentPic = 0;
		this.prevPic = null;
		this.nextPic = null
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
						justify-content: space-between;
					}
					
					.none {
						display: none;
					}
				</style>`;

		document.head.insertAdjacentHTML('beforeend', str)
	}

	openModalWindow(even) {
		const targetPic = even.target.closest('img');

		if (targetPic) {
			this.currentPic = this.allPicture.findIndex(picture => picture.url === targetPic.getAttribute('src'));
			
			this.fillContent(this.currentPic);

			document.querySelector('.overlay').classList.remove('none');
		}
	}

	closeModalWindow(even) {
		if (even.target.matches('.overlay')) {
			even.target.classList.add('none');
		}
	}

	fillContent(indexPic) {
		let countPic = this.allPicture.length - 1;
		
		indexPic = (indexPic < 0) ? indexPic = 0 : indexPic;
		indexPic = (indexPic > countPic) ? indexPic = countPic : indexPic;

		const scr = this.allPicture[indexPic].url;
		const title = this.allPicture[indexPic].title;
		const descr = this.allPicture[indexPic].descr;

		this.modalWindow.querySelector('img').setAttribute('src', scr);
		this.modalWindow.querySelector('h2').innerText = title;
		this.modalWindow.querySelector('p').innerText = descr;

		this.currentPic = indexPic;
	}

	changeContent(even) {
		const prevBtn = even.target.closest('.btn__prev');
		const nextBtn = even.target.closest('.btn__next')

		if (prevBtn) {
			this.prevPic = this.currentPic - 1;
			this.fillContent(this.prevPic);
		}
		if (nextBtn) {
			this.nextPic = this.currentPic + 1;
			this.fillContent(this.nextPic);
		}
	}

	init() {
		console.dir(this);
		console.log(this.allPicture);

		this.generateModalWindow();
		this.generateStyle();
		this.gallery.classList.add('gallery');
		this.gallery.addEventListener('click', this.openModalWindow.bind(this));
		document.body.addEventListener('click', this.closeModalWindow.bind(this));
		this.modalWindow.querySelector('.btn').addEventListener('click', this.changeContent.bind(this));
	}
}

const g = document.querySelector('.gallery-items');

const gallery = new Gallery(g);

gallery.init();