import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const API_KEY = '37056032-0b2a95b93ecf27021c46d83a6';

const searchParams = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: '40',
});

export default class ImagesService {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
  }

  async getImages() {
    const response = await axios.get(
      `${URL}?key=${API_KEY}&q=${this.searchQuery}&${searchParams}&page=${this.page}`
    );
    const data = response.data;
    this.incrementPage();
    return data;
  }

  resetPage() {
    this.page = 1;
  }

  incrementPage() {
    this.page += 1;
  }
}
