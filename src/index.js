'use strict'

const axios = require('axios');

const refs = {
    form: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more-btn'),
    body: document.querySelector('body'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
    event.preventDefault();
    refs.gallery.innerHTML = '';
    const requestValue = event.target.searchQuery.value;
    console.log(requestValue);

    requestImages(requestValue)
};

async function requestImages(value) {
    try {
        const response = await axios.get(`https://pixabay.com/api/?key=30200952-259b66a9ca61fa361dd8a215b&type=photo&q=${value}&orientation=horizontal&safesearch=true&per_page=40`);
        // console.log(response.data.hits);
        const imageArr = response.data.hits

        galleryMarkup(imageArr);
        refs.loadMoreBtn.classList.remove
    } catch (error) {
        console.log(error);
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
    console.log(markup);

}


// {webformatURL, tags, likes, views, comments, downloads} = 