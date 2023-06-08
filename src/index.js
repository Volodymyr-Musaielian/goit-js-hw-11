// import API from './api';
import LoadMoreBtn from './LoadMoreBtn';
import ImagesService from './ImagesService';

import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMore: document.querySelector('.load-more'),
};

const imageService = new ImagesService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  isHidden: true,
});

refs.form.addEventListener('submit', onSubmit);
loadMoreBtn.button.addEventListener('click', fetchImages);

function onSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const value = form.elements.searchQuery.value.trim();
  console.log(value);

  if (value === '') {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    imageService.searchQuery = value;
    imageService.resetPage();
    loadMoreBtn.show();
    clearMarkup();
    fetchImages().finally(() => form.reset());
  }
}

function fetchImages() {
  return getImagesMarkup();
}

function getImagesMarkup() {
  return imageService
    .getImages()
    .then(({ hits, totalHits }) => {
      console.log(hits);
      console.log(totalHits);
      if (hits.length === 0) {
        loadMoreBtn.hide();

        throw new Error(
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          )
        );
      } else if (totalHits <= 40) {
        loadMoreBtn.hide();
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
      return hits.reduce((markup, hit) => markup + createMarkup(hit), '');
    })
    .then(updateMarkup)
    .catch(onError);
}

function createMarkup({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
       ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
       ${downloads}
    </p>
  </div>
</div>`;
}

function updateMarkup(markup) {
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function clearMarkup() {
  refs.gallery.innerHTML = '';
}

function onError(err) {
  console.error(err);
}

// ============== Бесконечный скролл =============

// function handleScroll() {
//   const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
//   if (scrollTop + clientHeight >= scrollHeight - 5) {
//     fetchImages();
//   }
// }
// window.addEventListener('scroll', handleScroll);

// ================================================

// let gallery = new SimpleLightbox('.gallery');
// gallery.on('show.simplelightbox', function () {});
