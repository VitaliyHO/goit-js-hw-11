'use strict'

const axios = require('axios');

const refs = {
    form: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    body: document.querySelector('body'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
    event.preventDefault();
    const requestValue = event.target.searchQuery.value;
    console.log(requestValue);

    requestImages(requestValue)
};

async function requestImages(value) {
    try {
        const response = await axios.get(`https://pixabay.com/api/?key=30200952-259b66a9ca61fa361dd8a215b&type=photo&q=${value}&orientation=horizontal&safesearch=true`);
        // console.log(response.data.hits);
        const imageArr = response.data.hits

        galleryMarkup(imageArr);
    } catch (error) {
        console.log(error);
    }
};


function galleryMarkup(imageArr) {
    console.log(imageArr);

    const markup = imageArr.map((element) => {
        refs.gallery.insertAdjacentHTML('beforeend', 
        `<div class="photo-card">
          <img src="${element.webformatURL}" alt="${element.tags}" loading="lazy" />
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