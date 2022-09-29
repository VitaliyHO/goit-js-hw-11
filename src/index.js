'use strict'

const axios = require('axios');

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
  body: document.querySelector('body'),
};

let pageNumber = 0;

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  refs.gallery.innerHTML = '';
  if (event.target.searchQuery.value === '') {
    loadMoreBtnHide();
    return console.log('empty input field');
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
      return console.log("FAIL!!!!");
    };

    galleryMarkup(imageArr);
    loadMoreBtnShow();

    if (imageArr.length < 40) {
      return loadMoreBtnHide();
    }
  } catch (error) {
    console.log(error);
    return loadMoreBtnHide();
  }
};


function galleryMarkup(imageArr) {
  console.log(imageArr);

  const markup = imageArr.map((element) => {
    refs.gallery.insertAdjacentHTML('beforeend',
      `<div class="photo-card">
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
        </div>`)
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
}

// {webformatURL, tags, likes, views, comments, downloads} = 