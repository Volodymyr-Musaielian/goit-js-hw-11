//  'https:pixabay.com/api/?key=37056032-0b2a95b93ecf27021c46d83a6&q=cat&image_type=photo&orientation=horizontal&safesearch=true'

const URL = 'https://pixabay.com/api/';
const API_KEY = '37056032-0b2a95b93ecf27021c46d83a6';

const searchParams = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: '6',
});

function getImages(query, page = 1) {
  return fetch(
    `${URL}?key=${API_KEY}&q=${query}&${searchParams}&page=${page}`
  ).then(res => res.json());
}

export default { getImages };
