'use strict'

import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
const axios = require('axios');

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
  body: document.querySelector('body'),
};

let pageNumber = 0;

galleryViewer = new SimpleLightbox('.gallery a', { uniqueImages: false })

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  refs.gallery.innerHTML = '';
  loadMoreBtnHide();
  if (event.target.searchQuery.value === '') {
    return Notiflix.Notify.info("Please input what your search.");
  }
  const requestValue = event.target.searchQuery.value;
  pageNumber = 1;

  requestImages(requestValue)
};

async function requestImages(value) {
  try {
    const response = await axios.get(`https://pixabay.com/api/?key=30200952-259b66a9ca61fa361dd8a215b&type=photo&q=${value}&orientation=horizontal&safesearch=true&per_page=40&page=${pageNumber}`);
    // console.log(response.data.hits);
    const imageArr = response.data.hits
    if (imageArr.length === 0) {
      loadMoreBtnHide();
      return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    };

    galleryMarkup(imageArr);
    loadMoreBtnShow();

    if (imageArr.length < 40) {
      return loadMoreBtnHide();
    }
    Notiflix.Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
    new SimpleLightbox('.gallery a'); 
  } catch (error) {
    console.log(error);
    Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
    return loadMoreBtnHide();
  }
};


function galleryMarkup(imageArr) {
  const markup = imageArr.map((element) => {
    refs.gallery.insertAdjacentHTML('beforeend',
      `<a href="${element.largeImageURL}">
        <div class="photo-card">
          <img src="${element.webformatURL}" alt="${element.tags}" loading="lazy" width="250" height="150"/>
          <div class="info">
            <p class="info-item">
              <b>Likes</b>
              ${element.likes}
            </p>
            <p class="info-item">
              <b>Views</b>
              ${element.views}
            </p>
            <p class="info-item">
              <b>Comments</b>
              ${element.comments}
            </p>
            <p class="info-item">
              <b>Downloads</b>
              ${element.downloads}
            </p>
          </div>
        </div>
      </a>`)
  });
};

refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

function onLoadMoreBtnClick() {
  pageNumber += 1;
  const requestValue = refs.form.searchQuery.value;
  requestImages(requestValue);
};

function loadMoreBtnHide() {
  refs.loadMoreBtn.classList.add('hidden');
};

function loadMoreBtnShow() {
  refs.loadMoreBtn.classList.remove('hidden');
};